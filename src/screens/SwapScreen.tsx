import React, { useEffect } from "react";
import { Text, View, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUserInfoRequest } from "../state/swap/actions";

const SwapScreen = (props): JSX.Element => {
  const user = useSelector((state) => state.user);
  const { id, name, email } = user;
  const dispatch = useDispatch();

  // const getAllUserInfo = useCallback(() => {
  //   dispatch(GetAllUserInfoRequest(4));
  // }, [dispatch]);

  useEffect(() => {
    dispatch(GetAllUserInfoRequest(4));
    // getAllUserInfo();
  }, []);

  return (
    <View>
      <Button
        title="Go to about"
        onPress={() => props.navigation.navigate("Explorer")}
      />
      <Text>{id}</Text>
      <Text>{name}</Text>
      <Text>{email}</Text>
    </View>
  );
};

SwapScreen.navigationOptions = () => {
  return {
    headerTitle: "Swap",
  };
};

export default SwapScreen;
