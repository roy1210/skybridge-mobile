import { MaterialIcons } from "@expo/vector-icons";
import { Button, Text, Modal } from "@ui-kitten/components";
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
import { useDispatch } from "react-redux";
import { Colors } from "../../../data/colors";
import { Screen } from "../../../data/screen";
import { goNextStep } from "../../../state/swap/actions";
import { ICreateSwapResponse } from "../../../state/swap/types";
import CancelModal from "./CancelModal";

interface Props {
  createSwapRes: ICreateSwapResponse | null;
  fromCurrency: string;
  setIsModalWakeUp: (arg0: boolean) => void;
}

const PaymentModal = (props: Props): JSX.Element => {
  const { createSwapRes, fromCurrency, setIsModalWakeUp } = props;
  const dispatch = useDispatch();
  const addressIn = String(createSwapRes && createSwapRes.addressIn);
  const amountIn = String(createSwapRes && createSwapRes.amountIn);
  const [isCancelModalWakeUp, setIsCancelModalWakeUp] = useState(false);

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
            Clipboard.setString(addressIn);
            WToast.show({ data: `Copied ${addressIn}` });
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
          <Text category="p1">{addressIn}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.section}
          onPress={() => {
            Clipboard.setString(amountIn);
            WToast.show({ data: `Copied ${amountIn}` });
          }}
        >
          <MaterialIcons
            name="content-copy"
            size={20}
            color="white"
            style={styles.copy}
          />
          <Text category="p1" style={styles.label}>
            Amount:
          </Text>
          <Text category="p1">
            {amountIn} {fromCurrency}
          </Text>
        </TouchableOpacity>
        <View style={styles.buttons}>
          <Button style={styles.button} onPress={() => dispatch(goNextStep())}>
            Payment done
          </Button>
          <Button
            style={styles.cancelButton}
            onPress={() => setIsCancelModalWakeUp(true)}
          >
            Cancel
          </Button>
          <Modal visible={isCancelModalWakeUp} backdropStyle={styles.backdrop}>
            <CancelModal
              setIsModalWakeUp={setIsModalWakeUp}
              setIsCancelModalWakeUp={setIsCancelModalWakeUp}
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
  cancelButton: {
    marginTop: 20,
    width: 300,
    borderRadius: 20,
    backgroundColor: Colors.darkRed,
    borderColor: Colors.slaty,
  },
  backdrop: {
    backgroundColor: Colors.backdropTransparent,
  },
});

export default PaymentModal;
