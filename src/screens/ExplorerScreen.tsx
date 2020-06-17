import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ExplorerScreen = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Coming soon...</Text>
    </View>
  );
};

ExplorerScreen.navigationOptions = () => {
  return {
    headerTitle: "Explorer",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  text: {},
});

export default ExplorerScreen;
