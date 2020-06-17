import { Button, CheckBox, Text, Tooltip, Modal } from "@ui-kitten/components";
import * as Linking from "expo-linking";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { Colors } from "../../../data/colors";
import { URL } from "../../../data/links";
import {
  createSwapAsync,
  goNextStep,
  goBackStep,
} from "../../../state/swap/actions";
import {
  ICalculateSwapResponse,
  ICreateSwapResponse,
  IFetchFees,
  IFetchInfoResponse,
} from "../../../state/swap/types";
import { calculateFixedFee } from "../../../utils/calculateFixedFee";
import CancelModal from "./CancelModal";

interface Props {
  fromCurrency: string;
  toCurrency: string;
  toWalletAddress: string;
  sendingBalance: number;
  setIsModalWakeUp: (arg0: boolean) => void;
  createSwapRes: ICreateSwapResponse | null;
  calculateSwapRes: ICalculateSwapResponse | null;
  info: IFetchInfoResponse | null;
  fees: IFetchFees;
  error: string | null;
}

const ConfirmationModal = (props: Props) => {
  const {
    toWalletAddress,
    fromCurrency,
    toCurrency,
    createSwapRes,
    calculateSwapRes,
    info,
    fees,
    sendingBalance,
    setIsModalWakeUp,
    error,
  } = props;
  const [isConfirmedAddress, setIsConfirmedAddress] = useState(false);
  const [isAgreeTermsOfUse, setIsAgreeTermsOfUse] = useState(false);

  const [lessExplain, setLessExplain] = useState(false);
  const [isCancelModalWakeUp, setIsCancelModalWakeUp] = useState(false);

  const sentAmountLessExplain = () => (
    <Text
      onPress={() => setLessExplain(true)}
      category="p2"
      style={styles.amountLess}
    >
      Why is the sent amount less?
    </Text>
  );

  const sendTo = toWalletAddress;
  const youSendAmount = String(calculateSwapRes && calculateSwapRes.sendAmount);
  const youGotAmount = String(
    calculateSwapRes && calculateSwapRes.receiveAmount
  );
  const youSendCurrency = String(
    calculateSwapRes && calculateSwapRes.currencyFrom
  );
  const youGotCurrency = String(
    calculateSwapRes && calculateSwapRes.currencyTo
  );
  const transactionFeeAmount = String(calculateSwapRes && calculateSwapRes.fee);
  const transactionFeePercent = String(info && info.swapInfo.feePercent);
  // Ref: https://skybridge-docs.swingby.network/fees
  const fixedFee = calculateFixedFee(fromCurrency, fees);
  const dispatch = useDispatch();

  useEffect((): void => {
    dispatch(
      createSwapAsync.request({
        amount: String(sendingBalance),
        fromCurrency: fromCurrency,
        toCurrency: toCurrency,
        receivingAddress: toWalletAddress,
      })
    );
    if (createSwapRes === null) {
      dispatch(
        createSwapAsync.request({
          amount: String(sendingBalance),
          fromCurrency: fromCurrency,
          toCurrency: toCurrency,
          receivingAddress: toWalletAddress,
        })
      );
    }
  }, [error]);

  if (createSwapRes) {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.screen}>
          <Text category="h3">Confirmation</Text>
          <View style={styles.section}>
            <Text category="h6" style={styles.label}>
              Send To
            </Text>
            <Text category="p2" style={styles.address}>
              {sendTo}
            </Text>
            <View style={styles.addressConfirmation}>
              <CheckBox
                checked={isConfirmedAddress}
                onChange={(nextChecked) => setIsConfirmedAddress(nextChecked)}
                style={styles.checkbox}
                status={isConfirmedAddress ? "success" : undefined}
              />

              <Text category="p1" style={styles.addressConfirmationText}>
                The destination address is correct
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text category="h6" style={styles.label}>
              You Send
            </Text>
            <View style={styles.borderBottom}>
              <Text category="h5" style={styles.amount}>
                {youSendAmount} {youSendCurrency}
              </Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text category="h6" style={styles.label}>
              You Get
            </Text>
            <View style={styles.borderBottom}>
              <Text category="h5" style={styles.amount}>
                {youGotAmount} {youGotCurrency}
              </Text>
            </View>
            <Tooltip
              anchor={sentAmountLessExplain}
              visible={lessExplain}
              onBackdropPress={() => setLessExplain(false)}
              style={{ width: 300 }}
            >
              The sent amount is randomised to within 0.001% of the chosen
              amount to match the input and output destinations, due to the lack
              of memo function on the BTC chain
            </Tooltip>
          </View>
          <View style={styles.section}>
            <Text category="h6" style={styles.label}>
              Transaction Fee
            </Text>
            <Text category="p1" style={styles.label}>
              {transactionFeeAmount} {youGotCurrency} ({transactionFeePercent}%
              + {fixedFee} {youGotCurrency})
            </Text>
          </View>
          <View style={styles.section}>
            <View style={styles.addressConfirmation}>
              <CheckBox
                checked={isAgreeTermsOfUse}
                onChange={(nextChecked) => setIsAgreeTermsOfUse(nextChecked)}
                style={styles.checkbox}
                status={isAgreeTermsOfUse ? "success" : undefined}
              />

              <Text category="p1" style={styles.addressConfirmationText}>
                Agree to the{" "}
                <Text
                  style={styles.link}
                  onPress={() => Linking.openURL(URL.TermsOfUse)}
                >
                  Terms of Use
                </Text>
              </Text>
            </View>
            <View style={styles.section}>
              <Text category="p1" style={styles.addressConfirmationText}>
                Are you sure you want to swap?
              </Text>
              <Button
                disabled={
                  isAgreeTermsOfUse && isConfirmedAddress ? false : true
                }
                style={styles.button}
                onPress={() => dispatch(goNextStep())}
              >
                Confirm
              </Button>
              <Button
                style={styles.cancelButton}
                onPress={() => {
                  setIsCancelModalWakeUp(true);
                }}
              >
                Cancel
              </Button>
              <Modal
                visible={isCancelModalWakeUp}
                backdropStyle={styles.backdrop}
              >
                <CancelModal
                  setIsModalWakeUp={setIsModalWakeUp}
                  setIsCancelModalWakeUp={setIsCancelModalWakeUp}
                />
              </Modal>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    flexDirection: "column",
  },
  section: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 6,
  },

  label: {
    color: Colors.periwinkle,
    marginBottom: 10,
  },
  addressConfirmation: {
    flexDirection: "row",
    // alignSelf: "flex-start",
    // width: 330,
    marginTop: 14,
  },
  address: {
    color: Colors.periwinkle,
  },
  addressConfirmationText: {
    color: Colors.periwinkle,
    marginLeft: 8,
    marginTop: 1.6,
  },
  checkbox: {
    // width: 10,
    // height: 1,
  },
  amountLess: {
    color: Colors.white,
    marginTop: 10,
  },
  amount: {
    alignSelf: "center",
    marginBottom: 6,
  },
  borderBottom: {
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    width: 300,
    alignSelf: "center",
  },

  button: {
    marginTop: 20,
    width: 300,
    borderRadius: 20,
    backgroundColor: Colors.darkNavy,
  },
  cancelButton: {
    marginTop: 20,
    width: 300,
    borderRadius: 20,
    backgroundColor: Colors.darkRed,
    borderColor: Colors.slaty,
  },
  link: {
    color: Colors.green,
  },
  backdrop: {
    backgroundColor: Colors.backdropTransparent,
  },
});

export default ConfirmationModal;
