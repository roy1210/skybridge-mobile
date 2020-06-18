import { MaterialIcons } from "@expo/vector-icons";
import { Button, Modal, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import {
  Clipboard,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { WToast } from "react-native-smart-tip";
import { Colors } from "../../../data/colors";
import { Screen } from "../../../data/screen";
import { IDepositAddresses } from "../../../state/swap/types";
import { searchTssAddress } from "../../../utils/searchTssAddress";
import DoneModal from "./DoneModal";

interface Props {
  setIsModalWakeUp: (arg0: boolean) => void;
  toWalletAddress: string;
  fromCurrency: string;
  depositAddresses: IDepositAddresses;
}

const BTCBPaymentModal = (props: Props): JSX.Element => {
  const {
    setIsModalWakeUp,
    toWalletAddress,
    fromCurrency,
    depositAddresses,
  } = props;
  const [isDoneModalWakeUp, setIsDoneModalWakeUp] = useState(false);
  const tssDepositAddress = searchTssAddress(depositAddresses, fromCurrency);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.screen}>
        <Text category="h3" style={styles.title}>
          Payment
        </Text>
        <Text category="h6" style={styles.description}>
          Please send following amount to Swingby TSS address
        </Text>
        <TouchableOpacity
          style={styles.section}
          onPress={() => {
            Clipboard.setString(tssDepositAddress);
            WToast.show({ data: `Copied ${tssDepositAddress}` });
          }}
        >
          <MaterialIcons
            name="content-copy"
            size={20}
            color="white"
            style={styles.copy}
          />
          <Text category="p1" style={styles.label}>
            TSS address:
          </Text>
          <Text category="p1">{tssDepositAddress}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.section}
          onPress={() => {
            Clipboard.setString(toWalletAddress);
            WToast.show({ data: `Copied ${toWalletAddress}` });
          }}
        >
          <MaterialIcons
            name="content-copy"
            size={20}
            color="white"
            style={styles.copy}
          />
          <Text category="p1" style={styles.label}>
            Memo:
          </Text>
          <Text category="p1">{toWalletAddress}</Text>
        </TouchableOpacity>
        <View style={styles.buttons}>
          <Button
            style={styles.button}
            onPress={() => setIsDoneModalWakeUp(true)}
          >
            Done
          </Button>
          <Modal visible={isDoneModalWakeUp} backdropStyle={styles.backdrop}>
            <DoneModal
              setIsModalWakeUp={setIsModalWakeUp}
              setIsDoneModalWakeUp={setIsDoneModalWakeUp}
            />
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
};

const screenHeight = Math.round(Dimensions.get("window").height);

const styles = StyleSheet.create({
  screen: {
    // flexGrow: 1,
    flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
    height: screenHeight > Screen.Nexus_4.height ? 540 : "100%",
  },
  title: {
    // alignContent: "center",
    alignSelf: "center",
  },
  description: {
    marginVertical: 30,
  },
  section: {
    marginVertical: 20,
  },
  label: {
    marginBottom: 12,
  },
  copy: {
    position: "absolute",
    top: 2,
    right: 0,
  },
  buttons: {
    position: screenHeight > Screen.Nexus_4.height ? "absolute" : "relative",
    // position: "absolute",
    bottom: 0,
  },
  button: {
    marginTop: 20,
    width: 300,
    borderRadius: 20,
    backgroundColor: Colors.darkNavy,
  },
  backdrop: {
    backgroundColor: Colors.backdropTransparent,
  },
});

export default BTCBPaymentModal;
