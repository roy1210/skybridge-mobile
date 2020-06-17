import { Input, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { WToast } from "react-native-smart-tip";
import { useDispatch } from "react-redux";
import { Colors } from "../../data/colors";
import { inputSendingAmount } from "../../state/swap/actions";
import FromCoinSelectModal from "./modals/FromCoinSelectModal";
interface Props {
  fromCurrency: string;
  validationMessage: string;
  step: number;
}

const FormInput = (props: Props): JSX.Element => {
  const { validationMessage, fromCurrency, step } = props;
  const [value, setValue] = useState("");
  const [isCoinModalWakeUp, setIsCoinModalWakeUp] = useState(false);
  const dispatch = useDispatch();
  const show = () => {
    WToast.show({ data: validationMessage });
  };

  useEffect(() => {
    step !== 1 ? setValue("") : undefined;
  }, [step]);

  return (
    <View style={styles.input}>
      <Input
        placeholder="0"
        placeholderTextColor={Colors.white}
        textStyle={styles.inputText}
        value={value}
        onChangeText={(nextValue) => {
          setValue(nextValue);
          dispatch(inputSendingAmount(nextValue));
        }}
        autoCorrect={false}
        keyboardType="numeric"
        size="medium"
        onBlur={() => {
          if (validationMessage !== "") {
            show();
          }
        }}
        status={validationMessage !== "" ? "danger" : undefined}
      />
      <View style={styles.currency}>
        <TouchableWithoutFeedback
          onPress={() => {
            setIsCoinModalWakeUp(true);
          }}
        >
          <Text>{fromCurrency}</Text>
        </TouchableWithoutFeedback>
      </View>
      <Modal visible={isCoinModalWakeUp} transparent={true}>
        <FromCoinSelectModal
          fromCurrency={fromCurrency}
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
    height: 100,
    color: "white",
  },
});

export default FormInput;
