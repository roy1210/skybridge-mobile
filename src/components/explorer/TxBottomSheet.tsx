import { Button } from "@ui-kitten/components";
import React from "react";
import { Clipboard, Linking, StyleSheet, View } from "react-native";
import { WToast } from "react-native-smart-tip";
import { Colors } from "../../data/colors";
import { transactionDetail } from "../../utils/transactionDetail";

interface Props {
  txHash: string;
  currency: string;
  txId: string;
  status;
}

const TxBottomSheet = (props: Props) => {
  const { txHash, currency, txId, status } = props;
  const toastOpts = {
    data: `Copied ${txHash}`,
    textColor: Colors.white,
    backgroundColor: Colors.darkTransparent,
    duration: WToast.duration.LONG,
    position: WToast.position.TOP,
  };
  return (
    <View style={styles.screen}>
      <Button
        style={styles.button}
        appearance="outline"
        onPress={() =>
          Linking.openURL(
            transactionDetail(currency, currency, txId as string, status)
          )
        }
      >
        GO TO TRANSACTION DETAIL
      </Button>
      <Button
        status="success"
        style={styles.button}
        appearance="outline"
        onPress={() => {
          Clipboard.setString(txHash);
          WToast.show(toastOpts);
        }}
      >
        COPY TRANSACTION HASH
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 30,
  },
  button: {
    width: "90%",
    marginVertical: 10,
  },
});

export default TxBottomSheet;
