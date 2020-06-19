import { CheckBox, Layout, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import ExplorerList from "../../components/explorer/ExplorerList";
import SearchInput from "../../components/explorer/SearchInput";
import { DummyData } from "../../data/dummyTransactionData";
import { Ionicons } from "@expo/vector-icons";

const ExplorerScreen = () => {
  const data = DummyData;
  const [checked, setChecked] = useState(false);
  return (
    <Layout style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchInput />
        <View style={styles.paginationRow}>
          <View style={styles.hideWaiting}>
            <CheckBox
              checked={checked}
              onChange={(nextChecked) => setChecked(nextChecked)}
            />
            <Text category="p2" style={styles.hideWaitingText}>
              Hide WAITING status
            </Text>
          </View>
          <View style={styles.pagination}>
            <Text category="p2">1 - 25 of ~29187</Text>
            <View style={styles.arrows}>
              <TouchableOpacity>
                <Ionicons name="ios-arrow-back" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="ios-arrow-forward" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ExplorerList data={data} />
      </ScrollView>
    </Layout>
  );
};

ExplorerScreen.navigationOptions = () => {
  return {
    headerTitle: "Explorer",
  };
};

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    height: "100%",
  },
  paginationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  pagination: {
    flexDirection: "column",
    alignContent: "center",
    alignSelf: "center",
  },
  arrows: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80,
    alignSelf: "center",
  },
  hideWaiting: {
    flexDirection: "row",
    alignSelf: "flex-start",
    // paddingLeft: 16,
  },
  hideWaitingText: {
    marginLeft: 8,
  },
});

export default ExplorerScreen;
