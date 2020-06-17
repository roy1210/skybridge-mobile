import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createBottomTabNavigator } from "react-navigation-tabs";
import SwapScreen from "../screens/SwapScreen";
import ExplorerScreen from "../screens/ExplorerScreen";
import { Platform } from "react-native";
import { Colors } from "../data/colors";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import React from "react";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Colors.headerBlack,
    shadowColor: "transparent",
  },
  headerTintColor: "white",
};

const SwapStack = createStackNavigator(
  {
    Swap: {
      screen: SwapScreen,
    },
  },
  {
    initialRouteName: "Swap",
    defaultNavigationOptions: defaultStackNavOptions,
  }
);
const ExplorerStack = createStackNavigator(
  {
    Explorer: {
      screen: ExplorerScreen,
    },
  },
  {
    initialRouteName: "Explorer",
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const tabScreenConfig = {
  Swap: {
    screen: SwapStack,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-swap" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.headerBlack,
    },
  },
  Explorer: {
    screen: ExplorerStack,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <FontAwesome5 name="wpexplorer" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.darkGrey,
    },
  },
};

const MainStack =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        // @ts-ignore
        activeTintColor: "white",
        shifting: true,
        barStyle: {
          backgroundColor: Colors.headerBlack,
        },
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: "white",
          inactiveTintColor: "grey",
          style: {
            backgroundColor: Colors.headerBlack,
            borderTopWidth: 0,
            paddingTop: 6,
          },
        },
      });

export const Navigation = createAppContainer(MainStack);
