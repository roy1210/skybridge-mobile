import { Input, Text } from "@ui-kitten/components";
import React, { useState, useRef } from "react";
import { StyleSheet, View, Modal, Platform } from "react-native";
import { MINIMUM_SWAP_AMOUNT } from "../../data/constants";
import { IFetchFees } from "../../state/swap/types";
import { calculateReceivingAmount } from "../../utils/calculateReceivingAmount";
import { Colors } from "../../data/colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import ToCoinSelectModal from "./modals/ToCoinSelectModal";
import { Entypo } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";

interface Props {
  toCurrency: string;
  receivingBalance: number;
  fees: IFetchFees;
  step: number;
}

const FormGet = (props: Props): JSX.Element => {
  const { toCurrency, receivingBalance, fees, step } = props;
  const estimatedReceivingAmount =
    receivingBalance < MINIMUM_SWAP_AMOUNT
      ? 0
      : calculateReceivingAmount(receivingBalance, toCurrency, fees);
  const formValue = isNaN(estimatedReceivingAmount)
    ? "Please input number"
    : estimatedReceivingAmount;

  const refSelectCoinSheet = useRef();

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
            // setIsCoinModalWakeUp(true);
            refSelectCoinSheet.current.open();
          }}
        >
          <View style={styles.currencyView}>
            <Entypo
              style={styles.triangle}
              name="triangle-down"
              size={14}
              color="white"
            />
            <Text style={styles.currencyText}>{toCurrency}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {/* <Modal visible={isCoinModalWakeUp} transparent={true}>
        <ToCoinSelectModal
          toCurrency={toCurrency}
          setIsCoinModalWakeUp={setIsCoinModalWakeUp}
        />
      </Modal> */}
      <RBSheet
        ref={refSelectCoinSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: Colors.transparent,
          },
          draggableIcon: {
            backgroundColor: Colors.grey,
          },
        }}
      >
        <ToCoinSelectModal toCurrency={toCurrency} />
      </RBSheet>
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
    right: 20,
    top: 10,
    height: 100,
    color: "white",
    position: "absolute",
  },
  currencyView: {
    width: 60,
    height: 30,
    flexDirection: "row",
  },
  triangle: {
    top: 2,
    marginRight: 3,
    ...Platform.select({
      android: {
        top: 4,
        marginRight: 6,
      },
    }),
  },
  currencyText: {},
});

export default FormGet;
