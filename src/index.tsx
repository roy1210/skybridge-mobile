import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { fetchFeesAsync, fetchPriceAsync } from "./state/swap/actions";
import { Navigation } from "./utils/router";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPriceAsync.request());
    dispatch(fetchFeesAsync.request());
  }, []);

  return (
    <View style={styles.screen}>
      <Navigation />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
  },
});

export { App };
