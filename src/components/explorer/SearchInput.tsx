import { Button, Icon, Input } from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../data/colors";

const SearchInput = (): JSX.Element => {
  const [value, setValue] = useState("");
  // const dispatch = useDispatch();

  const SearchIcon = (props) => <Icon {...props} name="search-outline" />;

  return (
    <View style={styles.wrapper}>
      <Input
        placeholder="Search for Transaction tx or Address"
        size="large"
        textStyle={styles.inputText}
        value={value}
        accessoryLeft={SearchIcon}
        onChangeText={(nextValue) => {
          setValue(nextValue);
          // dispatch(inputSendingAmount(nextValue));
        }}
        autoCorrect={false}
      />
      <View style={styles.buttons}>
        <Button style={styles.button}>Search</Button>
        <Button style={styles.button}>Clear</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "90%",
    marginVertical: 30,
    flexDirection: "column",
    alignSelf: "center",
  },
  // disablePress: {
  //   flex: 1,
  //   // justifyContent: "center",
  //   // alignItems: "center",
  //   marginTop: 20,
  //   marginBottom: 24,
  // },
  inputText: {
    color: Colors.white,
    width: 250,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    marginTop: 16,
    width: 94,
  },
});

export default SearchInput;
