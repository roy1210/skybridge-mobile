import React from "react";
import { View, StyleSheet } from "react-native";
import { Navigation } from "./utils/router";

const App = () => (
  <View style={styles.screen}>
    <Navigation />
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
  },
});

export { App };
