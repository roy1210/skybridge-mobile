import { Button, Icon, Input } from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleSheet, View, Keyboard } from "react-native";
import { Colors } from "../../data/colors";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";

const SearchInput = (): JSX.Element => {
  const [value, setValue] = useState("");
  // const dispatch = useDispatch();

  const SearchIcon = (props) => <Icon {...props} name="search-outline" />;

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      style={styles.disablePress}
      accessible={false}
    >
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
          <Button size="small" style={styles.button}>
            Search
          </Button>
          <Button size="small" style={styles.button} status="danger">
            Clear
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "90%",
    marginTop: 20,
    marginBottom: 30,
    flexDirection: "column",
    alignSelf: "center",
  },
  disablePress: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
    width: 80,
  },
});

export default SearchInput;
