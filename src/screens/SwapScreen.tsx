import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Layout, Text } from "@ui-kitten/components";
import React, { useEffect } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AmountInput from "../components/swap/AmountInput";
import AddressInput from "../components/swap/AddressInput";
import { fetchPriceAsync } from "../state/swap/actions";
import { useDispatch, useSelector } from "react-redux";

const SwapScreen = (): JSX.Element => {
  const swap = useSelector((state) => state.swap);
  const { btcPrice } = swap;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPriceAsync.request());
  }, []);
  return (
    <Layout style={styles.screen}>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        accessible={false}
      >
        <View style={styles.input}>
          <AmountInput />
          <MaterialCommunityIcons
            name="swap-vertical"
            size={40}
            color="black"
            style={{ marginVertical: 15 }}
          />
          <AmountInput />
          <Text category="p2" style={styles.usd}>
            1 BTC = 1 BTC.B = {btcPrice} USD
          </Text>
          <AddressInput />
        </View>
      </TouchableWithoutFeedback>
    </Layout>
  );
};

SwapScreen.navigationOptions = () => {
  return {
    headerTitle: "Swap",
  };
};

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 600,
    justifyContent: "center",
    alignItems: "center",
  },
  usd: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    marginTop: 4,
    marginRight: 10,
  },
});

export default SwapScreen;

// const SwapScreen = (props): JSX.Element => {
//   const user = useSelector((state) => state.user);
//   const { id, name, email } = user;
//   const dispatch = useDispatch();

//   // const getAllUserInfo = useCallback(() => {
//   //   dispatch(GetAllUserInfoRequest(4));
//   // }, [dispatch]);

//   useEffect(() => {
//     dispatch(GetAllUserInfoRequest(4));
//     // getAllUserInfo();
//   }, []);

//   return (
//     <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Button onPress={() => props.navigation.navigate("Explorer")}>
//         About
//       </Button>
// {/* <Button onPress={() => dispatch(AddNum())}>
//   Add
// </Button>; */}
//       <Text category="h1">{id}</Text>
//       <Text>{name}</Text>
//       <Text>{email}</Text>
//     </Layout>
//   );
// };
