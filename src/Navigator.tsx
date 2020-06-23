import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Colors } from "./data/colors";
import { Navigation } from "./data/constants";
import ExplorerScreen from "./screens/Explorer/ExplorerScreen";
import TransactionDetailScreen from "./screens/Explorer/TransactionDetailScreen";
import SettingsScreen from "./screens/Settings/SettingsScreen";
import SwapScreen from "./screens/Swap/SwapScreen";
import MyAddressesScreen from "./screens/Settings/MyAddressesScreen";

const Tab = createBottomTabNavigator();
const SwapStack = createStackNavigator();
const ExplorerStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const Navigator = (): JSX.Element => {
  const defaultStackNavOptions = {
    headerStyle: {
      backgroundColor: Colors.headerBlack,
      shadowColor: "transparent",
    },
    headerTintColor: "white",
    headerBackTitleVisible: false,
  };
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            if (route.name === Navigation.Swap) {
              return <Ionicons name="ios-swap" size={25} color={color} />;
            } else if (route.name === "EXPLORER") {
              return <FontAwesome5 name="wpexplorer" size={25} color={color} />;
            } else if (route.name === "SETTINGS") {
              return <Feather name="settings" size={25} color={color} />;
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
        <Tab.Screen name={Navigation.Swap}>
          {() => (
            <SwapStack.Navigator>
              <SwapStack.Screen
                name={Navigation.Swap}
                component={SwapScreen}
                options={defaultStackNavOptions}
              />
            </SwapStack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen name={Navigation.Explorer.Explorer}>
          {() => (
            <ExplorerStack.Navigator>
              <ExplorerStack.Screen
                name={Navigation.Explorer.Explorer}
                component={ExplorerScreen}
                options={defaultStackNavOptions}
              />
              <ExplorerStack.Screen
                name={Navigation.Explorer.Transaction}
                component={TransactionDetailScreen}
                options={defaultStackNavOptions}
              />
            </ExplorerStack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen name={Navigation.Settings.Settings}>
          {() => (
            <SettingsStack.Navigator>
              <SettingsStack.Screen
                name={Navigation.Settings.Settings}
                component={SettingsScreen}
                options={defaultStackNavOptions}
              />
              <SettingsStack.Screen
                name={Navigation.Settings.MyAddresses}
                component={MyAddressesScreen}
                options={defaultStackNavOptions}
              />
            </SettingsStack.Navigator>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
