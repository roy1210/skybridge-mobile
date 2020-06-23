import React from "react";
import { Picker, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { Colors } from "../../../data/colors";
import { CoinSymbol } from "../../../data/constants";
import { setFromCurrency } from "../../../state/swap/actions";

interface Props {
  fromCurrency?: string;
}

const FromCoinSelectModal = (props: Props) => {
  const { fromCurrency } = props;
  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <Picker
        selectedValue={fromCurrency}
        onValueChange={(itemValue) => {
          dispatch(setFromCurrency(String(itemValue)));
        }}
      >
        <Picker.Item label={CoinSymbol.BTC} value={CoinSymbol.BTC} />
        <Picker.Item label={CoinSymbol.BTC_B} value={CoinSymbol.BTC_B} />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  // disablePress: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  screen: {
    // position: "absolute",
    flex: 1,
    width: "100%",
    paddingBottom: 70,
    // height: 120,
    backgroundColor: Colors.white,
    // bottom: 88,
    justifyContent: "center",
  },
});

export default FromCoinSelectModal;
