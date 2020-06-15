import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Layout, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import {
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import AddressInput from "../components/swap/AddressInput";
import FormGet from "../components/swap/FormGet";
import FormInput from "../components/swap/FormInput";
import { Colors } from "../data/colors";
import { MAXIMUM_SWAP_AMOUNT, MINIMUM_SWAP_AMOUNT } from "../data/constants";
import { addComma } from "../utils/addComma";

const SwapScreen = (): JSX.Element => {
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
  } = swap;

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

  return (
    <Layout style={styles.screen}>
      <ScrollView>
        <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss()}
          accessible={false}
        >
          <View style={styles.input}>
            {/* <> */}
            <FormInput
              fromCurrency={fromCurrency}
              validationMessage={validationMessage}
            />
            {validationMessage !== "" ? (
              <Text category="p2" style={styles.errorMessage}>
                {validationMessage}
              </Text>
            ) : null}
            <MaterialCommunityIcons
              name="swap-vertical"
              size={40}
              color="black"
              style={styles.swap}
            />
            <FormGet
              receivingBalance={receivingBalance}
              toCurrency={toCurrency}
              fees={fees}
            />
            <Text category="p2" style={styles.usd}>
              {calcAmount()}
            </Text>
            <AddressInput
              toCurrency={toCurrency}
              setIsValidAddress={setIsValidAddress}
              addressValidationMessage={addressValidationMessage}
              setAddressValidationMessage={setAddressValidationMessage}
              isValidAddress={isValidAddress}
            />
            {addressValidationMessage !== "" ? (
              <Text category="p2" style={styles.addressError}>
                {addressValidationMessage}
              </Text>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.butonView}>
          <Button
            style={styles.button}
            disabled={isValidAddress && isValid ? false : true}
            onPress={() => console.log("hello")}
          >
            SWAP
          </Button>
        </View>
        {/* </> */}
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
  input: {
    height: 390,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "relative",
    // borderColor: "red",
    // borderWidth: 10,
  },
  swap: {
    marginVertical: 15,
  },
  usd: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    marginTop: 4,
    marginRight: 40,
  },
  butonView: {
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
    // position: "absolute",
    // bottom: 10,
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  attentionText: {
    marginTop: 4,
  },
  errorMessage: {
    position: "absolute",
    top: 130,
    color: Colors.red,
  },
  addressError: {
    position: "absolute",
    top: 352,
    color: Colors.red,
  },
});

export default SwapScreen;
