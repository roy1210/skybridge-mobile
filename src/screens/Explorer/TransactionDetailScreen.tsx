import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { renderDateYearTime } from "../../utils/renderDateYearTime";
import { coinId } from "../../utils/coinId";
import { CoinSymbol } from "../../data/constants";
import { calculateFixedFee } from "../../utils/calculateFixedFee";
import { useSelector } from "react-redux";
import { Reward } from "../../types/swapApp";
import { Colors } from "../../data/colors";
import { AntDesign } from "@expo/vector-icons";
import { statusText } from "../../utils/status";

const TransactionDetailScreen = ({ route }) => {
  const { tx } = route.params;
  const swap = useSelector((state) => state.swap);
  const { info, fees } = swap;
  const transactionFeePercent = info && info.swapInfo.feePercent;
  console.log(tx.rewards);

  const coinName = (coin: string) => {
    switch (coin) {
      case CoinSymbol.BTC:
        return "BTC";
        break;

      case CoinSymbol.BTC_B:
        return "BTC.B";
        break;

      case CoinSymbol.BTC_B_888:
        return "BTC.B";
        break;

      case CoinSymbol.BTC_B_918:
        return "BTC.B";
        break;
      case CoinSymbol.BTC_S:
        return "BTC.B";
        break;

      default:
        return "";
        break;
    }
  };
  return (
    <Layout style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.titleText}>Time Stamp</Text>
            <Text style={styles.descriptionText}>
              {renderDateYearTime(tx.timestamp)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.titleText}>Status</Text>
            <Text style={styles.descriptionText}>
              {statusText(tx.status, "p1")}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.titleText}>Inbound Transaction Hash</Text>
            <Text style={styles.descriptionText}>{tx.txIdIn}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.titleText}>Outbound Transaction Hash</Text>
            <Text style={styles.descriptionText}>{tx.txIdOut}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.titleText}>From</Text>
            <View style={styles.amountDescriptionView}>
              <View style={styles.amountView}>
                <Image source={coinId(tx.currencyIn)} style={styles.coinImg} />
                <Text style={styles.amountText}>
                  {tx.amountIn} {coinName(tx.currencyIn)}
                </Text>
              </View>
              <Text style={styles.addressText}>{tx.addressIn}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.titleText}>To</Text>
            <View style={styles.amountDescriptionView}>
              <View style={styles.amountView}>
                <Image source={coinId(tx.currencyOut)} style={styles.coinImg} />
                <Text style={styles.amountText}>
                  {tx.amountOut} {coinName(tx.currencyOut)}
                </Text>
              </View>
              <Text style={styles.addressText}>{tx.addressOut}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.titleText}>Transaction Fee</Text>
            <View style={styles.descriptionView}>
              <Text style={styles.transactionText}>
                {tx.fee} {coinName(tx.currencyOut)}
              </Text>
              <Text style={styles.transactionText}>
                ({transactionFeePercent}% +{" "}
                {tx && calculateFixedFee(tx.currencyOut, fees)}{" "}
                {coinName(tx.currencyOut)})
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.titleText}>Rewards Payout</Text>
            <View style={styles.rewardsView}>
              {tx.rewards.map((reward: Reward, i: number) => {
                return (
                  <View key={i}>
                    <View style={styles.rewardAmountView}>
                      <Image
                        style={styles.coinImg}
                        source={coinId(tx.feeCurrency)}
                      />
                      <Text style={styles.amountText}>{reward.amount}</Text>
                    </View>
                    <AntDesign
                      name="arrowdown"
                      size={20}
                      color="white"
                      style={styles.arrow}
                    />

                    {/* href={transactionDetailByAddress(
                      feeCurrency,
                      reward.address
                    )} */}
                    <Text style={styles.rewardAddressText}>
                      {reward.address}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: "100%",
    padding: 20,
  },
  table: {
    flexDirection: "column",
    alignContent: "center",
  },
  row: {
    flexDirection: "row",
    alignContent: "center",
    marginVertical: 15,
  },
  titleText: {
    width: "35%",
    color: Colors.mayaBlue,
  },
  descriptionText: {
    width: "60%",
    paddingLeft: 10,
  },
  addressText: {
    width: "56%",
  },
  descriptionView: {
    paddingLeft: 10,
  },
  amountDescriptionView: {
    paddingLeft: 9,
  },
  rewardsView: {
    marginLeft: 10,
    width: "60%",
    paddingHorizontal: 18,
    paddingBottom: 18,
  },
  amountView: {
    flexDirection: "row",
    alignContent: "center",
    marginBottom: 4,
  },
  coinImg: {
    width: 24,
    height: 24,
  },
  amountText: {
    alignSelf: "center",
    marginLeft: 10,
  },
  arrow: {
    alignSelf: "center",
    marginVertical: 4,
  },
  rewardAmountView: {
    flexDirection: "row",
    alignSelf: "center",
  },
  rewardAddressText: {
    width: "100%",
  },
});

export default TransactionDetailScreen;
