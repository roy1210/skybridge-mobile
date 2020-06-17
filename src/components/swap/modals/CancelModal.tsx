import { Text, Button, Card } from "@ui-kitten/components";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../../../data/colors";
import { useDispatch } from "react-redux";
import { goBackStep } from "../../../state/swap/actions";

interface Props {
  setIsModalWakeUp: (arg0: boolean) => void;
  setIsCancelModalWakeUp: (arg0: boolean) => void;
}

const CancelModal = (props: Props) => {
  const { setIsModalWakeUp, setIsCancelModalWakeUp } = props;
  const dispatch = useDispatch();
  return (
    <Card disabled={true} style={styles.screen}>
      <Text category="h6" style={styles.description}>
        Are you sure you want to cancel this transaction?
      </Text>
      <View style={styles.buttons}>
        <Button
          style={styles.cancelButton}
          onPress={() => {
            dispatch(goBackStep(1));
            setIsCancelModalWakeUp(false);
            setIsModalWakeUp(false);
          }}
        >
          Cancel and back to home
        </Button>
        <Button
          style={styles.button}
          onPress={() => {
            setIsCancelModalWakeUp(false);
          }}
        >
          Resume
        </Button>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.grey,
    width: 300,
    height: 250,
    borderRadius: 20,
    flexDirection: "column",
    justifyContent: "center",
  },
  description: {
    alignSelf: "center",
  },
  buttons: {
    // alignContent: "flex-end",
    // position: "absolute",
    // bottom: 0,
  },
  button: {
    marginTop: 20,
    width: 250,
    borderRadius: 20,
    backgroundColor: Colors.darkNavy,
  },
  cancelButton: {
    marginTop: 20,
    width: 250,
    borderRadius: 20,
    backgroundColor: Colors.darkRed,
    borderColor: Colors.slaty,
  },
});

export default CancelModal;
