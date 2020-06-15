import { Input, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { inputSendingAmount } from "../../state/swap/actions";
import { WToast } from "react-native-smart-tip";
import { Colors } from "../../data/colors";

interface Props {
  fromCurrency: string;
  validationMessage: string;
}

const FormInput = (props: Props): JSX.Element => {
  const { validationMessage, fromCurrency } = props;
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const show = () => {
    WToast.show({ data: validationMessage });
  };

  return (
    <View style={styles.input}>
      <Input
        placeholder="0"
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
      <Text style={styles.currency}>{fromCurrency}</Text>
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

export default FormInput;
