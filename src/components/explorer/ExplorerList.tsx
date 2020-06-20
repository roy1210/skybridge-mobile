import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text } from "@ui-kitten/components";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import React from "react";
import { Image, Platform, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Colors } from "../../data/colors";
import { SwapRawObject } from "../../types/swapApp";
import { coinId } from "../../utils/coinId";
import { renderDateYearTime } from "../../utils/renderDateYearTime";
import { statusText } from "../../utils/status";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  transactions: SwapRawObject[];
  isNoResults: boolean;
}

const ExplorerList = (props: Props) => {
  const navigation = useNavigation();
  return (
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
        <View style={styles.push} />
      </View>
      {props.isNoResults ? (
        <View style={styles.noResultsViews}>
          <MaterialCommunityIcons name="cloud-search" size={80} color="white" />
          <Text category="h6">No results fond :-(</Text>
          <Text category="h6">Try a different transaction or address</Text>
        </View>
      ) : (
        <FlatList
          data={props.transactions}
          keyExtractor={() => String(Math.random() * 100)}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              key={String(item.timestamp)}
              onPress={() =>
                navigation.navigate("TRANSACTION", {
                  itemId: String(item.timestamp),
                  tx: item,
                })
              }
            >
              <View key={item.timestamp} style={styles.record}>
                <Text category="p2" style={styles.date}>
                  {renderDateYearTime(item.timestamp)}
                </Text>
                <Text category="p2" style={styles.status}>
                  {statusText(item.status, "p2")}
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
            </TouchableWithoutFeedback>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "96%",
    marginTop: 4,
    alignSelf: "center",
    backgroundColor: Colors.black,
    borderRadius: 10,
    height: 410,
    paddingBottom: 2,
    ...Platform.select({
      android: {
        marginBottom: 20,
      },
    }),
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 0,
    paddingVertical: 10,
  },
  description: {
    color: Colors.mayaBlue,
  },
  dataDescription: {
    marginLeft: 10,
    color: Colors.mayaBlue,
  },
  statusDescription: {
    marginRight: 8,
    color: Colors.mayaBlue,
  },
  toDescription: {
    paddingRight: 5,
    color: Colors.mayaBlue,
  },
  record: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopColor: Colors.periwinkle,
    borderTopWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 6,
  },
  push: {
    width: 10,
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
  noResultsViews: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100,
  },
});

export default ExplorerList;
