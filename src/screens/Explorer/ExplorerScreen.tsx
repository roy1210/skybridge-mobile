import { Layout } from "@ui-kitten/components";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ExplorerList from "../../components/explorer/ExplorerList";
import SearchInput from "../../components/explorer/SearchInput";
import SortCondition from "../../components/explorer/SortCondition";
import { PAGE_COUNT } from "../../data/constants";
import {
  fetchSwapHistoryAsync,
  fetchFloatsAsync,
} from "../../state/explorer/actions";
import FloatBalances from "../../components/explorer/FloatBalances";

const ExplorerScreen = () => {
  // const data = DummyData;
  const explorer = useSelector((state) => state.explorer);
  const {
    isHideWaiting,
    swapHistory,
    page,
    query,
    floats,
    isNoResults,
  } = explorer;
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  // Ref: https://www.youtube.com/watch?v=mAdyQLrcSK8
  const pullToRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(
        fetchSwapHistoryAsync.request({
          query: query,
          page: page,
        })
      );
      fetchFloatsAsync.request();
      setRefreshing(false);
    }, 500);
  }, [refreshing]);

  useEffect(() => {
    dispatch(
      fetchSwapHistoryAsync.request({
        query: query,
        page: page,
      })
    );
    dispatch(fetchFloatsAsync.request());
  }, [isHideWaiting, query]);

  const currentTxs = (swapHistory && swapHistory.data[page]) || [];
  const txsLength = currentTxs.length;
  const total = swapHistory.total ? swapHistory.total : 0;

  const prevItemsCount = PAGE_COUNT * page;
  const indexOfFirstTransactions = prevItemsCount + 1;
  const indexOfLastTransactions = prevItemsCount + txsLength;

  const isDisabledGoNext: boolean = indexOfLastTransactions === total;
  const isDisabledGoBack: boolean = indexOfFirstTransactions === 1;

  return (
    <Layout style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={pullToRefresh} />
        }
      >
        <SearchInput />
        <FloatBalances floats={floats} />
        <SortCondition
          query={query}
          total={total}
          isHideWaiting={isHideWaiting}
          indexOfFirstTransactions={indexOfFirstTransactions}
          indexOfLastTransactions={indexOfLastTransactions}
          isDisabledGoBack={isDisabledGoBack}
          isDisabledGoNext={isDisabledGoNext}
          page={page}
        />
        <ExplorerList isNoResults={isNoResults} transactions={currentTxs} />
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
});

export default ExplorerScreen;
