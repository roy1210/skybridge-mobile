import { Input, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

const AmountInput = (): JSX.Element => {
  const [value, setValue] = useState("");
  return (
    <View style={styles.input}>
      <Input
        placeholder="0"
        value={value}
        onChangeText={(nextValue) => setValue(nextValue)}
        autoCorrect={false}
        keyboardType="numeric"
        size="medium"
      />
      <Text style={styles.currency}>BTC</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 300,
  },
  currency: {
    position: "absolute",
    right: 20,
    top: 10,
  },
});

export default AmountInput;
