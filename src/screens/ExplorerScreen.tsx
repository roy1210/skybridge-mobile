import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ExplorerScreen = () => {
  return (
    <View>
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
  text: {
    fontFamily: "open-sans-bold",
  },
});

export default ExplorerScreen;
