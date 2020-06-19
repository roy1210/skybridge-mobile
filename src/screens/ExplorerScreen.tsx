import { Ionicons } from "@expo/vector-icons";
import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { FlatList, Image, Keyboard, StyleSheet, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import SearchInput from "../components/explorer/SearchInput";
import { Colors } from "../data/colors";
import { DummyData } from "../data/dummyTransactionData";
import { coinId } from "../utils/coinId";
import { renderDateYearTime } from "../utils/renderDateYearTime";
import { statusText } from "../utils/status";

const ExplorerScreen = () => {
  const data = DummyData;

  return (
    <Layout style={styles.screen}>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        accessible={false}
      >
        <SearchInput />
        <View style={styles.container}>
          <View style={styles.title}>
            <Text category="p2" style={styles.dataDescription}>
              DATE
            </Text>
            <Text category="p2" style={styles.statusDescription}>
              STATUS
            </Text>
            <Text category="p2" style={styles.description}>
              FROM
            </Text>
            <View />
            <Text category="p2" style={styles.toDescription}>
              TO
            </Text>
            <View style={{ width: 10 }} />
          </View>
          <FlatList
            data={data.items}
            keyExtractor={(item) => String(item.timestamp)}
            renderItem={({ item }) => (
              <View style={styles.record}>
                <Text category="p2" style={styles.date}>
                  {renderDateYearTime(item.timestamp)}
                </Text>
                <Text category="p2" style={styles.status}>
                  {statusText(item.status)}
                </Text>
                <View style={styles.amount}>
                  <Image source={coinId(item.currencyIn)} style={styles.coin} />
                  <Text category="p2" style={styles.amountText}>
                    {item.amountIn}
                  </Text>
                </View>
                <Ionicons
                  name="ios-arrow-round-forward"
                  size={24}
                  color="white"
                  style={styles.link}
                />
                <View style={styles.amount}>
                  <Image
                    source={coinId(item.currencyOut)}
                    style={styles.coin}
                  />
                  <Text category="p2" style={styles.amountText}>
                    {item.amountOut}
                  </Text>
                </View>
                <Ionicons
                  name="ios-arrow-forward"
                  size={18}
                  color="white"
                  style={styles.link}
                />
              </View>
            )}
          />
        </View>
      </TouchableWithoutFeedback>
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
    flex: 1,
  },
  container: {
    width: "96%",
    marginTop: 4,
    alignSelf: "center",
    backgroundColor: Colors.black,
    borderRadius: 4,
    paddingBottom: 2,
    height: 420,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 0,
    // padding: 10,
    paddingVertical: 10,
  },
  description: {
    color: Colors.gold,
  },
  dataDescription: {
    marginLeft: 10,
    color: Colors.gold,
  },
  statusDescription: {
    marginRight: 8,
    color: Colors.gold,
  },
  toDescription: {
    paddingRight: 5,
    color: Colors.gold,
  },
  record: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomColor: Colors.periwinkle,
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingHorizontal: 6,
  },
  date: {
    width: 60,
    alignSelf: "center",
    alignContent: "center",
  },
  status: {
    width: 80,
    alignSelf: "center",
    alignContent: "center",
  },
  amount: {
    paddingTop: 20,
    width: 80,
    alignSelf: "center",
    alignContent: "center",
  },
  amountText: {
    alignSelf: "center",
    alignContent: "center",
  },
  coin: {
    alignSelf: "center",
    width: 26,
    height: 26,
    marginBottom: 4,
  },
  link: {
    alignSelf: "center",
    alignContent: "center",
  },
});

export default ExplorerScreen;
