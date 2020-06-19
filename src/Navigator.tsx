import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Colors } from "./data/colors";
import ExplorerScreen from "./screens/Explorer/ExplorerScreen";
import TransactionDetailScreen from "./screens/Explorer/TransactionDetailScreen";
import SwapScreen from "./screens/Swap/SwapScreen";

const Tab = createBottomTabNavigator();
const SwapStack = createStackNavigator();
const ExplorerStack = createStackNavigator();

const Navigator = (): JSX.Element => {
  const defaultStackNavOptions = {
    headerStyle: {
      backgroundColor: Colors.headerBlack,
      shadowColor: "transparent",
    },
    headerTintColor: "white",
  };
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            if (route.name === "SWAP") {
              return <Ionicons name="ios-swap" size={25} color={color} />;
            } else if (route.name === "EXPLORER") {
              return <FontAwesome5 name="wpexplorer" size={25} color={color} />;
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: "white",
          inactiveTintColor: "gray",
          style: {
            backgroundColor: Colors.headerBlack,
            borderTopWidth: 0,
            paddingTop: 6,
          },
        }}
      >
        <Tab.Screen name="SWAP">
          {() => (
            <SwapStack.Navigator>
              <SwapStack.Screen
                name="SWAP"
                component={SwapScreen}
                options={defaultStackNavOptions}
              />
            </SwapStack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen name="EXPLORER">
          {() => (
            <ExplorerStack.Navigator>
              <ExplorerStack.Screen
                name="EXPLORER"
                component={ExplorerScreen}
                options={defaultStackNavOptions}
              />
              <ExplorerStack.Screen
                name="TRANSACTION"
                component={TransactionDetailScreen}
                options={defaultStackNavOptions}
              />
            </ExplorerStack.Navigator>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
