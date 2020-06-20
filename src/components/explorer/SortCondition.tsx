import { Ionicons } from "@expo/vector-icons";
import { CheckBox, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { Colors } from "../../data/colors";
import {
  fetchSwapHistoryAsync,
  goToBackPage,
  goToNextPage,
  toggleHideWaiting,
} from "../../state/explorer/actions";

interface Props {
  total: number;
  page: number;
  indexOfFirstTransactions: number;
  indexOfLastTransactions: number;
  isDisabledGoBack: boolean;
  isDisabledGoNext: boolean;
  isHideWaiting: boolean;
  query: string;
}

const SortCondition = (props: Props): JSX.Element => {
  const {
    total,
    isHideWaiting,
    indexOfFirstTransactions,
    indexOfLastTransactions,
    isDisabledGoBack,
    isDisabledGoNext,
    page,
    query,
  } = props;
  const dispatch = useDispatch();

  return (
    <View style={styles.paginationRow}>
      <View style={styles.hideWaiting}>
        <CheckBox
          checked={isHideWaiting}
          onChange={() => dispatch(toggleHideWaiting())}
        />
        <Text category="p2" style={styles.hideWaitingText}>
          Hide WAITING status
        </Text>
      </View>
      <View style={styles.pagination}>
        <Text category="p2" style={styles.paginationText}>
          {indexOfFirstTransactions} - {indexOfLastTransactions} of ~{total}
        </Text>
        <View style={styles.arrows}>
          <TouchableOpacity>
            <View style={styles.arrowIconView}>
              <Ionicons
                name="ios-arrow-back"
                size={25}
                color={isDisabledGoBack ? Colors.disabledWhite : Colors.white}
                onPress={() => {
                  if (!isDisabledGoBack) {
                    dispatch(goToBackPage(page - 1));
                  }
                }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.arrowIconView}>
              <Ionicons
                name="ios-arrow-forward"
                size={25}
                color={isDisabledGoNext ? Colors.disabledWhite : Colors.white}
                style={styles.rightArrow}
                onPress={() => {
                  if (!isDisabledGoNext) {
                    dispatch(
                      fetchSwapHistoryAsync.request({
                        query: query,
                        page: page + 1,
                      })
                    );
                    dispatch(goToNextPage(page + 1));
                  }
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  pagination: {
    flexDirection: "column",
    alignContent: "center",
    alignSelf: "center",
    width: "43%",
  },
  paginationText: {
    paddingTop: 2,
    alignSelf: "flex-end",
  },
  arrowIconView: {
    width: 30,
    height: 38,
    justifyContent: "center",
  },
  rightArrow: {
    alignSelf: "flex-end",
  },
  arrows: {
    marginTop: 6,
    marginRight: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80,
    alignSelf: "flex-end",
  },
  hideWaiting: {
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  hideWaitingText: {
    marginLeft: 8,
    paddingTop: 2,
  },
});

export default SortCondition;
