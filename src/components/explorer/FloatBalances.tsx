import { Text } from "@ui-kitten/components";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { IFetchFloatsResponse } from "../../state/explorer/types";

interface Props {
  floats: IFetchFloatsResponse;
}

const FloatBalances = (props: Props) => {
  const { btc, btcb, bnb } = props.floats;

  return (
    <View style={styles.screen}>
      <Text style={styles.titleText}>Float balances</Text>
      <View style={styles.row}>
        <View style={styles.coinView}>
          <Image
            source={require("../../../assets/btc.png")}
            style={styles.coinImage}
          />
          <Text category="p2">{btc}</Text>
        </View>

        <View style={styles.coinView}>
          <Image
            source={require("../../../assets/btcb.png")}
            style={styles.coinImage}
          />
          <Text category="p2">{btcb}</Text>
        </View>

        <View style={styles.coinView}>
          <View style={styles.bnbImageView}>
            <Image
              source={require("../../../assets/bnb.png")}
              style={styles.bnbImage}
            />
          </View>
          <Text category="p2">{bnb}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    marginBottom: 14,
  },
  titleText: {
    marginBottom: 10,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 50,
  },
  coinImage: {
    height: 21,
    width: 21,
    marginRight: 6,
  },
  bnbImageView: {
    height: 21,
    width: 21,
    marginRight: 6,
  },
  bnbImage: {
    position: "absolute",
    height: 24,
    width: 24,
    top: 1.4,
    left: -1,
  },
  coinView: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default FloatBalances;
