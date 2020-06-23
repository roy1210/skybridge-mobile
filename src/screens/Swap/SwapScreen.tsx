import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { Button, Layout, Modal, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { Image, Keyboard, Platform, StyleSheet, View } from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { WToast } from "react-native-smart-tip";
import { useDispatch, useSelector } from "react-redux";
import AddressInput from "../../components/swap/AddressInput";
import FormGet from "../../components/swap/FormGet";
import FormInput from "../../components/swap/FormInput";
import ModalTransaction from "../../components/swap/modals/ModalTransaction";
import { Colors } from "../../data/colors";
import {
  CoinSymbol,
  MAXIMUM_SWAP_AMOUNT,
  MINIMUM_SWAP_AMOUNT,
} from "../../data/constants";
import { fetchSwapHistoryAsync } from "../../state/explorer/actions";
import {
  fetchUserAddressesAsync,
  setUserBtcAddress,
  setUserBtcbAddress,
  setUserAddress,
} from "../../state/settings/actions";
import {
  fetchDepositAddressAsync,
  fetchFeesAsync,
  fetchInfoAsync,
  fetchPriceAsync,
  goNextStep,
  goToBTCBTransferStep,
} from "../../state/swap/actions";
import { addComma } from "../../utils/addComma";

const SwapScreen = ({ navigation }): JSX.Element => {
  const swap = useSelector((state) => state.swap);
  const {
    btcPrice,
    fromCurrency,
    toCurrency,
    receivingBalance,
    fees,
    rate,
    sendingBalance,
    validationMessage,
    isValid,
    error,
    step,
  } = swap;

  const settings = useSelector((state) => state.settings);
  const { userAddresses } = settings;

  const dispatch = useDispatch();
  // const getUserAddresses = async () => {
  //   let addresses = {
  //     btc: "",
  //     btcb: "",
  //   };
  //   try {
  //     const jsonValue = await AsyncStorage.getItem("userAddresses");
  //     const parsedUserAddresses = JSON.parse(String(jsonValue));
  //     addresses = {
  //       btc: parsedUserAddresses.btc !== null ? parsedUserAddresses.btc : "",
  //       btcb:
  //         parsedUserAddresses.btcb !== null
  //           ? parsedUserAddresses.btcb
  //           : "Has not found",
  //     };
  //     return addresses;
  //   } catch (e) {
  //     console.error("error");
  //   }
  // };
  async function fetchUserData() {
    let addresses = {
      btc: "",
      btcb: "",
    };
    // try {
    // const btcAddress = await AsyncStorage.getItem("userBtcAddress");
    // const btcbAddress = await AsyncStorage.getItem("userBtcbAddress");
    // const addresses = {
    //   btc: btcAddress ? btcAddress : "",
    //   btcb: btcbAddress ? btcbAddress : "",
    // };
    // return addresses;

    try {
      const jsonValue = await AsyncStorage.getItem("userAddresses");
      const parsedUserAddresses = JSON.parse(String(jsonValue));
      addresses = {
        btc: parsedUserAddresses.btc !== null ? parsedUserAddresses.btc : "",
        btcb:
          parsedUserAddresses.btcb !== null
            ? parsedUserAddresses.btcb
            : "Has not found",
      };
      return addresses;
    } catch (e) {
      console.error("error");
    }
  }

  useEffect(() => {
    dispatch(fetchPriceAsync.request());
    fetchUserData().then((address) => {
      dispatch(setUserAddress(address));
      // @ts-ignore
      // dispatch(setUserBtcAddress(String(address.btc)));
      // @ts-ignore
      // dispatch(setUserBtcbAddress(String(address.btcb)));
    });
    dispatch(fetchFeesAsync.request());
    dispatch(fetchInfoAsync.request());
    dispatch(fetchDepositAddressAsync.request());
    dispatch(fetchSwapHistoryAsync.request({ query: "", page: 0 }));
    // dispatch(fetchFloatsAsync.request());
  }, []);

  useEffect(() => {
    WToast.show({ data: error });
  }, [error]);

  const calcAmount = () => {
    if (receivingBalance === 0) {
      return `1 ${fromCurrency} = ${rate} ${toCurrency} = ${btcPrice} USD`;
    } else {
      return `${receivingBalance} ${fromCurrency} = ${
        rate * Number(sendingBalance)
      } ${toCurrency} = ${(btcPrice * receivingBalance).toFixed(3)} USD`;
    }
  };

  const [addressValidationMessage, setAddressValidationMessage] = useState<
    string | undefined
  >("");
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [isModalWakeUp, setIsModalWakeUp] = useState(false);

  return (
    <Layout style={styles.screen}>
      <ScrollView>
        <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss()}
          accessible={false}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/skybridge-logo.png")}
              style={styles.logo}
            />
          </View>
          <View style={styles.input}>
            <FormInput
              fromCurrency={fromCurrency}
              validationMessage={validationMessage}
              step={step}
            />
            {validationMessage !== "" ? (
              <Text category="p2" style={styles.amountError}>
                {validationMessage}
              </Text>
            ) : null}
            <MaterialCommunityIcons
              name="swap-vertical"
              size={40}
              color="white"
              style={styles.swap}
            />
            <FormGet
              step={step}
              receivingBalance={receivingBalance}
              toCurrency={toCurrency}
              fees={fees}
            />
            <Text category="p2" style={styles.usd}>
              {calcAmount()}
            </Text>
            <AddressInput
              step={step}
              toCurrency={toCurrency}
              setIsValidAddress={setIsValidAddress}
              addressValidationMessage={addressValidationMessage}
              setAddressValidationMessage={setAddressValidationMessage}
              isValidAddress={isValidAddress}
              userAddresses={userAddresses}
            />
            <View style={styles.addressAttention}>
              <FontAwesome5
                name="exclamation-triangle"
                size={14}
                color="orange"
              />
              <Text category="p2" style={styles.addressAttentionText}>
                Do not use an Exchange Wallet address
              </Text>
            </View>
            {addressValidationMessage !== "" ? (
              <Text category="p2" style={styles.addressError}>
                {addressValidationMessage}
              </Text>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.buttonView}>
          <Button
            style={styles.button}
            disabled={
              isValidAddress && isValid && fromCurrency !== toCurrency
                ? false
                : true
            }
            onPress={(): void => {
              if (toCurrency === CoinSymbol.BTC_B) {
                dispatch(goNextStep());
              } else if (toCurrency === CoinSymbol.BTC) {
                dispatch(goToBTCBTransferStep());
              }
              setIsModalWakeUp(true);
            }}
          >
            SWAP
          </Button>

          <Modal visible={isModalWakeUp} backdropStyle={styles.backdrop}>
            <ModalTransaction
              navigation={navigation}
              setIsModalWakeUp={setIsModalWakeUp}
            />
          </Modal>
        </View>
        <View style={styles.attention}>
          <Text category="p2" style={styles.attentionText}>
            Maximum swap (BTC to BTC.B) {addComma(MAXIMUM_SWAP_AMOUNT.BTC, 0)}
            BTC. Maximum swap (BTC.B to BTC){" "}
            {addComma(MAXIMUM_SWAP_AMOUNT.BTC_B, 0)}
            BTC.B
          </Text>
          <Text category="p2" style={styles.attentionText}>
            Minimum swap {MINIMUM_SWAP_AMOUNT}BTC/BTC.B.
          </Text>
          <Text category="p2" style={styles.attentionText}>
            If you input less than this amount, the swap will fail and the funds
            will be lost permanently.
          </Text>
        </View>
      </ScrollView>
    </Layout>
  );
};

SwapScreen.navigationOptions = () => {
  return {
    headerTitle: "Swap",
  };
};

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // height: "100%",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  logo: {},
  input: {
    height: 360,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "relative",
  },
  swap: {
    marginVertical: 15,
  },
  usd: {
    marginTop: 4,
  },
  buttonView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    width: 300,
    margin: 2,
    borderRadius: 20,
    backgroundColor: Colors.darkNavy,
  },
  attention: {
    paddingTop: 70,
    paddingHorizontal: 20,
    ...Platform.select({
      android: {
        paddingBottom: 10,
      },
    }),
  },
  attentionText: {
    marginTop: 4,
  },
  addressAttention: {
    flexDirection: "row",
    marginTop: 6,
    marginBottom: 34,
  },
  addressAttentionText: {
    marginLeft: 4,
  },
  amountError: {
    position: "absolute",
    top: 86,
    color: Colors.red,
  },
  addressError: {
    position: "absolute",
    top: 360,
    color: Colors.red,
  },
  backdrop: {
    backgroundColor: Colors.backdropTransparent,
  },
});

export default SwapScreen;
