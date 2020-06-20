import { AntDesign } from "@expo/vector-icons";
import { Divider, Layout, Text } from "@ui-kitten/components";
import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { Colors } from "../../data/colors";
import { CoinSymbol } from "../../data/constants";
import { Reward } from "../../types/swapApp";
import { calculateFixedFee } from "../../utils/calculateFixedFee";
import { coinId } from "../../utils/coinId";
import { renderDateYearTime } from "../../utils/renderDateYearTime";
import { statusText } from "../../utils/status";

const TransactionDetailScreen = ({ route }) => {
  const { tx, itemId } = route.params;
  const swap = useSelector((state) => state.swap);
  const { info, fees } = swap;
  const transactionFeePercent = info && info.swapInfo.feePercent;

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
            <Text style={styles.titleText}>Timestamp</Text>
            <Text style={styles.descriptionText}>
              {renderDateYearTime(tx.timestamp)}
            </Text>
          </View>
          <Divider />
          <View style={styles.row}>
            <Text style={styles.titleText}>Status</Text>
            <Text style={styles.descriptionText}>
              {statusText(tx.status, "p1")}
            </Text>
          </View>
          <Divider />
          <View style={styles.row}>
            <Text style={styles.titleText}>Inbound Transaction Hash</Text>
            <Text style={styles.descriptionText}>{tx.txIdIn}</Text>
          </View>
          <Divider />
          <View style={styles.row}>
            <Text style={styles.titleText}>Outbound Transaction Hash</Text>
            <Text style={styles.descriptionText}>{tx.txIdOut}</Text>
          </View>
          <Divider />
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
          <Divider />
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
          <Divider />
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
          <Divider />
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
