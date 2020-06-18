import { Card } from "@ui-kitten/components";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { useSelector } from "react-redux";
import { Screen } from "../../../data/screen";
import ConfirmationModal from "./ConfirmationModal";
import PaymentModal from "./PaymentModal";
import RequestedTransactionModal from "./RequestedTransactionModal";
import BTCBPaymentModal from "./BTCBPaymentModal";

interface Props {
  setIsModalWakeUp: (arg0: boolean) => void;
  navigation: StackNavigationProp;
}

const ModalTransaction = (props: Props) => {
  const { setIsModalWakeUp, navigation } = props;
  const swap = useSelector((state) => state.swap);
  const {
    step,
    toWalletAddress,
    fromCurrency,
    toCurrency,
    createSwapRes,
    calculateSwapRes,
    info,
    fees,
    sendingBalance,
    error,
    txHash,
    depositAddresses,
  } = swap;

  return (
    <ScrollView>
      <Card disabled={true} style={styles.card}>
        {step === 2 && (
          <ConfirmationModal
            toWalletAddress={toWalletAddress}
            toCurrency={toCurrency}
            fromCurrency={fromCurrency}
            createSwapRes={createSwapRes}
            calculateSwapRes={calculateSwapRes}
            info={info}
            fees={fees}
            sendingBalance={sendingBalance}
            setIsModalWakeUp={setIsModalWakeUp}
            error={error}
          />
        )}
        {step === 3 && (
          <PaymentModal
            createSwapRes={createSwapRes}
            fromCurrency={fromCurrency}
            setIsModalWakeUp={setIsModalWakeUp}
          />
        )}
        {step === 4 && (
          <RequestedTransactionModal
            navigation={navigation}
            txHash={txHash}
            setIsModalWakeUp={setIsModalWakeUp}
          />
        )}
        {step === 5 && (
          <BTCBPaymentModal
            setIsModalWakeUp={setIsModalWakeUp}
            toWalletAddress={toWalletAddress}
            fromCurrency={fromCurrency}
            depositAddresses={depositAddresses}
          />
        )}
      </Card>
    </ScrollView>
  );
};

const screenHeight = Math.round(Dimensions.get("window").height);

const styles = StyleSheet.create({
  card: {
    width: 350,
    height: screenHeight > Screen.Nexus_4.height ? 580 : 450,
    marginTop: screenHeight > Screen.Nexus_4.height ? 0 : 26,
  },
});

export default ModalTransaction;
