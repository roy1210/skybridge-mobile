import { Ionicons } from "@expo/vector-icons";
import { Text } from "@ui-kitten/components";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../data/colors";
import { coinId } from "../../utils/coinId";
import { renderDateYearTime } from "../../utils/renderDateYearTime";
import { statusText } from "../../utils/status";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import { useNavigation } from "@react-navigation/native";

interface Props {
  data: any;
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
        <View style={{ width: 10 }} />
      </View>
      <ScrollView>
        {props.data.items.map((item) => (
          <TouchableWithoutFeedback
            key={item.timestamp}
            onPress={() =>
              navigation.navigate("TRANSACTION", {
                itemId: item.timestamp,
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
                <Image source={coinId(item.currencyOut)} style={styles.coin} />
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
        ))}
      </ScrollView>
      {/* <FlatList
        data={props.data.items}
        keyExtractor={(item) => String(item.timestamp)}
        renderItem={({ item }) => ( */}
      {/* <View style={styles.record}>
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
              <Image source={coinId(item.currencyOut)} style={styles.coin} />
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
          </View> */}
      {/* )} */}
      {/* /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "96%",
    marginTop: 14,
    alignSelf: "center",
    backgroundColor: Colors.black,
    borderRadius: 10,
    paddingBottom: 2,
    height: 410,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 0,
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
    borderTopColor: Colors.periwinkle,
    borderTopWidth: 1,
    paddingVertical: 14,
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

export default ExplorerList;
