import { Input, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleSheet, View, Modal } from "react-native";
import { MINIMUM_SWAP_AMOUNT } from "../../data/constants";
import { IFetchFees } from "../../state/swap/types";
import { calculateReceivingAmount } from "../../utils/calculateReceivingAmount";
import { Colors } from "../../data/colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import ToCoinSelectModal from "./modals/ToCoinSelectModal";

interface Props {
  toCurrency: string;
  receivingBalance: number;
  fees: IFetchFees;
  step: number;
}

const FormGet = (props: Props): JSX.Element => {
  const { toCurrency, receivingBalance, fees, step } = props;
  const [isCoinModalWakeUp, setIsCoinModalWakeUp] = useState(false);
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
        value={fees !== [] ? (step === 1 ? String(formValue) : "0") : "0"}
        size="medium"
        textStyle={styles.inputText}
        disabled
      />
      <View style={styles.currency}>
        <TouchableWithoutFeedback
          onPress={() => {
            setIsCoinModalWakeUp(true);
          }}
        >
          <Text>{toCurrency}</Text>
        </TouchableWithoutFeedback>
      </View>
      <Modal visible={isCoinModalWakeUp} transparent={true}>
        <ToCoinSelectModal
          toCurrency={toCurrency}
          setIsCoinModalWakeUp={setIsCoinModalWakeUp}
        />
      </Modal>
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
