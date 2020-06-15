import { Input, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";
import { MINIMUM_SWAP_AMOUNT } from "../../data/constants";
import { IFetchFees } from "../../state/swap/types";
import { calculateReceivingAmount } from "../../utils/calculateReceivingAmount";
import { Colors } from "../../data/colors";

interface Props {
  toCurrency: string;
  receivingBalance: number;
  fees: IFetchFees;
}

const FormGet = (props: Props): JSX.Element => {
  // const [value, setValue] = useState("");
  const { toCurrency, receivingBalance, fees } = props;

  const estimatedReceivingAmount =
    receivingBalance < MINIMUM_SWAP_AMOUNT
      ? 0
      : calculateReceivingAmount(receivingBalance, toCurrency, fees);
  const formValue = isNaN(estimatedReceivingAmount)
    ? "Please input number"
    : estimatedReceivingAmount;

  return (
    <View style={styles.input}>
      <Input
        placeholder="0"
        value={String(formValue)}
        size="medium"
        textStyle={styles.inputText}
        disabled
      />
      <Text style={styles.currency}>{toCurrency}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    width: 300,
  },
  inputText: {
    color: Colors.white,
  },
  currency: {
    position: "absolute",
    right: 20,
    top: 10,
  },
});

export default FormGet;
