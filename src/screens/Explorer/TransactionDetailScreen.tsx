import { AntDesign, Entypo } from "@expo/vector-icons";
import { Divider, Layout, Text } from "@ui-kitten/components";
import React, { useRef } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { useSelector } from "react-redux";
import TxBottomSheet from "../../components/explorer/TxBottomSheet";
import { Colors } from "../../data/colors";
import { CoinSymbol } from "../../data/constants";
import { Reward } from "../../types/swapApp";
import { calculateFixedFee } from "../../utils/calculateFixedFee";
import { coinId } from "../../utils/coinId";
import { renderDateYearTime } from "../../utils/renderDateYearTime";
import { statusText } from "../../utils/status";
import RewardsBottomSheet from "../../components/explorer/RewardsBottomSheet";

const TransactionDetailScreen = ({ route }) => {
  const { tx, itemId } = route.params;
  const swap = useSelector((state) => state.swap);
  const { info, fees } = swap;
  const transactionFeePercent = info && info.swapInfo.feePercent;
  const refTxInSheet = useRef();
  const refTxOutSheet = useRef();
  const refRewardsPayoutSheet = useRef();

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
            <View style={styles.txHashView}>
              <Text style={styles.txHashText}>{tx.txIdIn}</Text>
              <Entypo
                name="dots-three-vertical"
                size={24}
                color="white"
                style={styles.dot}
                onPress={() => {
                  refTxInSheet.current.open();
                }}
              />
            </View>
          </View>
          <Divider />
          <View style={styles.row}>
            <Text style={styles.titleText}>Outbound Transaction Hash</Text>
            <View style={styles.txHashView}>
              <Text style={styles.txHashText}>{tx.txIdOut}</Text>
              <Entypo
                name="dots-three-vertical"
                size={24}
                color="white"
                style={styles.dot}
                onPress={() => refTxOutSheet.current.open()}
              />
            </View>
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
                    <View style={styles.txHashView}>
                      <Text style={styles.rewardAddressText}>
                        {reward.address}
                      </Text>
                      <Entypo
                        name="dots-three-vertical"
                        size={24}
                        color="white"
                        style={styles.rewardsDot}
                        onPress={() => refRewardsPayoutSheet.current.open()}
                      />
                    </View>
                    <RBSheet
                      ref={refRewardsPayoutSheet}
                      closeOnDragDown={true}
                      closeOnPressMask={true}
                      customStyles={{
                        wrapper: {
                          backgroundColor: Colors.transparent,
                        },
                        draggableIcon: {
                          backgroundColor: Colors.grey,
                        },
                      }}
                    >
                      <RewardsBottomSheet
                        currency={tx.feeCurrency}
                        address={reward.address}
                      />
                    </RBSheet>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
      <RBSheet
        ref={refTxInSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: Colors.backdropTransparent,
          },
          draggableIcon: {
            backgroundColor: Colors.grey,
          },
        }}
      >
        <TxBottomSheet
          txHash={tx.txIdIn}
          currency={tx.currencyIn}
          txId={tx.txIdIn}
          status={tx.status}
        />
      </RBSheet>
      <RBSheet
        ref={refTxOutSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: Colors.transparent,
          },
          draggableIcon: {
            backgroundColor: Colors.grey,
          },
        }}
      >
        <TxBottomSheet
          txHash={tx.txIdOut}
          currency={tx.currencyOut}
          txId={tx.txIdOut}
          status={tx.status}
        />
      </RBSheet>
    </Layout>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: "100%",
    paddingVertical: 20,
    paddingHorizontal: 10,
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
  txHashView: {
    width: "100%",
    flexDirection: "row",
  },
  txHashText: {
    width: "56%",
    paddingLeft: 10,
  },
  dot: {
    width: "9%",
  },
  rewardsDot: {
    width: "8%",
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
    width: "64%",
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
    width: "88%",
  },
});

export default TransactionDetailScreen;
