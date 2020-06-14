import { Input } from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

const AddressInput = (): JSX.Element => {
  const [value, setValue] = useState("");
  return (
    <>
      <Input
        placeholder="Your address"
        value={value}
        onChangeText={(nextValue) => setValue(nextValue)}
        autoCorrect={false}
        size="medium"
        style={styles.input}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 300,
    marginVertical: 40,
  },
});

export default AddressInput;
