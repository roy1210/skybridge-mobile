import { Button } from "@ui-kitten/components";
import React from "react";
import { Clipboard, Linking, StyleSheet, View } from "react-native";
import { WToast } from "react-native-smart-tip";
import { Colors } from "../../data/colors";
import { transactionDetailByAddress } from "../../utils/transactionDetailByAddress";

interface Props {
  address: string;
  currency: string;
}

const RewardsBottomSheet = (props: Props) => {
  const { currency, address } = props;
  const toastOpts = {
    data: `Copied ${address}`,
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
          Linking.openURL(transactionDetailByAddress(currency, address))
        }
      >
        GO TO TRANSACTION DETAIL
      </Button>
      <Button
        status="success"
        style={styles.button}
        appearance="outline"
        onPress={() => {
          Clipboard.setString(address);
          WToast.show(toastOpts);
        }}
      >
        COPY ADDRESS
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

export default RewardsBottomSheet;
