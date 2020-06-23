import AsyncStorage from "@react-native-community/async-storage";
import { Button, Layout } from "@ui-kitten/components";
import { Content, Icon, Input, Item, Label, View } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { WToast } from "react-native-smart-tip";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../data/colors";
import { CoinSymbol } from "../../data/constants";
import { setUserAddress } from "../../state/settings/actions";
import { IUserAddresses } from "../../state/settings/types";
import { isBinanceAddress, isBitcoinAddress } from "../../utils/validator";
// import { setUserAddress } from "../../state/settings/actions";

interface Props {}

const FavoriteAddressesScreen = (props: Props) => {
  const settings = useSelector((state) => state.settings);
  const { userAddresses } = settings;
  const { btc, btcb } = userAddresses;

  const [toastMessage, setToastMessage] = useState("");

  const initialAddressStatus = {
    success: false,
    error: false,
  };

  const [btcAddressStatus, setBtcAddressStatus] = useState(
    initialAddressStatus
  );
  const [btcbAddressStatus, setBtcbAddressStatus] = useState(
    initialAddressStatus
  );

  const toastOpts = {
    data: toastMessage,
    textColor: Colors.white,
    backgroundColor: Colors.darkTransparent,
    duration: WToast.duration.LONG,
    position: WToast.position.CENTER,
  };

  const checkAddressHandler = (
    coinAddress: string,
    walletAddress: string
  ): void => {
    if (walletAddress !== "") {
      if (coinAddress === CoinSymbol.BTC) {
        setToastMessage("");
        const result = isBitcoinAddress(walletAddress);
        if (!result.isValid) {
          // setIsBtcValidAddress(false);
          //@ts-ignore
          setToastMessage(result.message);
          storeUserAddresses({ btc: walletAddress, btcb: btcb });
          dispatch(setUserAddress({ btc: walletAddress, btcb: btcb }));
          // dispatch(setUserBtcAddress(walletAddress));
          // storeUserBtcAddresses(walletAddress);
          setBtcAddressStatus({ success: false, error: true });
        } else {
          // setIsBtcValidAddress(true);
          setToastMessage("Saved your address!");
          dispatch(setUserAddress({ btc: walletAddress, btcb: btcb }));
          // dispatch(setUserBtcAddress(walletAddress));
          storeUserAddresses({ btc: walletAddress, btcb: btcb });
          // storeUserBtcAddresses(walletAddress);
          setBtcAddressStatus({ success: true, error: false });
        }
      } else if (coinAddress === CoinSymbol.BTC_B) {
        setToastMessage("");
        const result = isBinanceAddress(walletAddress);
        if (!result.isValid) {
          // setIsBtcbValidAddress(false);
          //@ts-ignore
          setToastMessage(result.message);
          dispatch(setUserAddress({ btc: btc, btcb: walletAddress }));
          // dispatch(setUserBtcbAddress(walletAddress));
          storeUserAddresses({ btc: btc, btcb: walletAddress });
          // storeUserBtcbAddresses(walletAddress);
          setBtcbAddressStatus({ success: false, error: true });
        } else {
          // setIsBtcbValidAddress(true);
          setToastMessage("Saved your address!");
          dispatch(setUserAddress({ btc: btc, btcb: walletAddress }));
          // dispatch(setUserBtcbAddress(walletAddress));
          storeUserAddresses({ btc: btc, btcb: walletAddress });
          // storeUserBtcbAddresses(walletAddress);
          setBtcbAddressStatus({ success: true, error: false });
        }
      }
      // Memo: walletAddress ===""
    } else {
      if (coinAddress === CoinSymbol.BTC) {
        dispatch(setUserAddress({ btc: "", btcb: btcb }));
        // dispatch(setUserBtcAddress(""));
        storeUserAddresses({ btc: "", btcb: btcb });
        // storeUserBtcAddresses("");
      } else if (coinAddress === CoinSymbol.BTC_B) {
        dispatch(setUserAddress({ btc: btc, btcb: "" }));
        // dispatch(setUserBtcbAddress(""));
        storeUserAddresses({ btc: btc, btcb: "" });
        // storeUserBtcbAddresses("");
      }
    }
  };

  const checkStatusHandler = (
    coinAddress: string,
    walletAddress: string
  ): void => {
    if (walletAddress !== "") {
      if (coinAddress === CoinSymbol.BTC) {
        const result = isBitcoinAddress(walletAddress);
        if (!result.isValid) {
          setBtcAddressStatus({ success: false, error: true });
        } else {
          setBtcAddressStatus({ success: true, error: false });
        }
      } else if (coinAddress === CoinSymbol.BTC_B) {
        const result = isBinanceAddress(walletAddress);
        if (!result.isValid) {
          setBtcbAddressStatus({ success: false, error: true });
        } else {
          setBtcbAddressStatus({ success: true, error: false });
        }
      }
    }
  };

  // const storeUserBtcAddresses = async (value: string) => {
  //   try {
  //     await AsyncStorage.setItem("userBtcAddress", value);
  //     dispatch(setUserBtcAddress(value));
  //   } catch (e) {
  //     setToastMessage(e);
  //   }
  // };

  // const storeUserBtcbAddresses = async (value: string) => {
  //   try {
  //     await AsyncStorage.setItem("userBtcbAddress", value);
  //     dispatch(setUserBtcbAddress(value));
  //   } catch (e) {
  //     setToastMessage(e);
  //   }
  // };
  const removeUserAddresses = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      setToastMessage(e);
    }
  };
  const storeUserAddresses = async (value: IUserAddresses) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("userAddresses", jsonValue);
    } catch (e) {
      setToastMessage(e);
    }
  };

  useEffect(() => {
    if (btc !== undefined || btc !== "") {
      console.log(btc);
      checkStatusHandler(CoinSymbol.BTC, btc);
    }
    if (btcb !== undefined || btcb !== "") {
      checkStatusHandler(CoinSymbol.BTC_B, btcb);
    }
    WToast.show(toastOpts);
  }, [toastMessage]);

  const dispatch = useDispatch();
  return (
    <Layout style={styles.screen}>
      <Content>
        <View style={styles.row}>
          <View style={styles.inputView}>
            <Item
              floatingLabel
              success={btcAddressStatus.success}
              error={btcAddressStatus.error}
            >
              <Label>BTC Address</Label>
              <Input
                // value={btcUserAddresses}
                value={btc}
                autoCorrect={false}
                style={styles.input}
                onChangeText={(nextValue) => {
                  checkAddressHandler(CoinSymbol.BTC, nextValue);
                }}
                onBlur={() => {
                  setToastMessage("");
                }}
              />
              <Icon
                name="checkmark-circle"
                style={{
                  color: btcAddressStatus.success === true ? "green" : "black",
                }}
              />
            </Item>
          </View>
          <Button
            status="danger"
            size="tiny"
            style={styles.clearButton}
            // onPress={() => dispatch(setUserAddress({ btc: "", btcb: btcb }))}
            onPress={() => {
              removeUserAddresses("userBtcAddress");
              dispatch(dispatch(setUserAddress({ btc: "", btcb: btcb })));
              setBtcAddressStatus({ success: false, error: false });
            }}
          >
            Clear
          </Button>
        </View>
        <View style={styles.row}>
          <View style={styles.inputView}>
            <Item
              floatingLabel
              success={btcbAddressStatus.success}
              error={btcbAddressStatus.error}
            >
              <Label>BTCB Address</Label>
              <Input
                // value={btcbUserAddresses}
                value={btcb}
                autoCorrect={false}
                style={styles.input}
                onBlur={() => {
                  setToastMessage("");
                }}
                onChangeText={(nextValue) => {
                  checkAddressHandler(CoinSymbol.BTC_B, nextValue);
                }}
              />
              <Icon
                name="checkmark-circle"
                style={{
                  color: btcbAddressStatus.success === true ? "green" : "black",
                }}
              />
            </Item>
          </View>
          <Button
            status="danger"
            size="tiny"
            style={styles.clearButton}
            // onPress={() => dispatch(setUserAddress({ btc: btc, btcb: "" }))}
            onPress={() => {
              removeUserAddresses("userBtcbAddress");
              // dispatch(setUserBtcbAddress(""));
              dispatch(dispatch(setUserAddress({ btc: btc, btcb: "" })));
              setBtcbAddressStatus({ success: false, error: false });
            }}
          >
            Clear
          </Button>
        </View>
      </Content>
    </Layout>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 20,
    padding: 4,
  },
  row: {
    height: 100,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  inputView: {
    width: "74%",
    marginRight: 10,
  },
  input: {
    color: Colors.white,
  },
  clearButton: {
    width: 60,
    height: 30,
    alignSelf: "center",
    marginBottom: 30,
  },
});

export default FavoriteAddressesScreen;
