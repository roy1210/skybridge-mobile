import { Card } from "@ui-kitten/components";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import React from "react";
import { Picker, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { Colors } from "../../../data/colors";
import { CoinSymbol } from "../../../data/constants";
import { setFromCurrency } from "../../../state/swap/actions";

interface Props {
  setIsCoinModalWakeUp: (arg0: boolean) => void;
  fromCurrency?: string;
}

const FromCoinSelectModal = (props: Props) => {
  const { setIsCoinModalWakeUp, fromCurrency } = props;
  const dispatch = useDispatch();
  return (
    <TouchableWithoutFeedback
      onPress={() => setIsCoinModalWakeUp(false)}
      style={styles.disablePress}
    >
      <Card disabled={true} style={styles.screen}>
        <Picker
          selectedValue={fromCurrency}
          onValueChange={(itemValue) => {
            dispatch(setFromCurrency(itemValue));
          }}
        >
          <Picker.Item label={CoinSymbol.BTC} value={CoinSymbol.BTC} />
          <Picker.Item label={CoinSymbol.BTC_B} value={CoinSymbol.BTC_B} />
        </Picker>
      </Card>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  disablePress: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screen: {
    position: "absolute",
    width: "100%",
    height: 120,
    backgroundColor: Colors.white,
    bottom: 88,
    justifyContent: "center",
  },
});

export default FromCoinSelectModal;