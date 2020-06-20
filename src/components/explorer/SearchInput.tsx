import { Button, Icon, Input } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../data/colors";
import { setQuery } from "../../state/explorer/actions";

const SearchInput = (): JSX.Element => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const explorer = useSelector((state) => state.explorer);
  const { query } = explorer;

  const SearchIcon = (props) => <Icon {...props} name="search-outline" />;

  useEffect(() => {
    dispatch(setQuery(value));
  }, [value]);

  return (
    // <TouchableWithoutFeedback
    //   onPress={() => Keyboard.dismiss()}
    //   style={styles.disablePress}
    //   accessible={false}
    // >
    <View style={styles.wrapper}>
      <Input
        placeholder="Search for Transaction tx or Address"
        size="large"
        textStyle={styles.inputText}
        value={value}
        accessoryLeft={SearchIcon}
        onChangeText={(nextValue) => {
          setValue(nextValue);
          // dispatch(setQuery(value));
        }}
        autoCorrect={false}
      />
      {/* <View style={styles.buttons}> */}
      {/* <Button
          size="small"
          style={styles.button}
          onPress={() => {
            dispatch(setQuery(value));
            dispatch(
              fetchSwapHistoryAsync.request({
                query: value,
                page: 0,
              })
            );
          }}
        >
          Search
        </Button> */}
      <Button
        // size="small"
        style={styles.button}
        status="danger"
        disabled={query === "" || query === undefined ? true : false}
        onPress={() => {
          setValue("");
          dispatch(setQuery(""));
        }}
      >
        Clear
      </Button>
    </View>
    // </View>
    // </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginBottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 80,
  },
  // disablePress: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  inputText: {
    color: Colors.white,
    width: 170,
  },
  button: {
    width: 80,
    height: 45,
    marginBottom: 4,
  },
});

export default SearchInput;
