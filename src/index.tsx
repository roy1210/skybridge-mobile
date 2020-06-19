import React from "react";
import { StyleSheet, View } from "react-native";
import { Navigation } from "./utils/router";
import SearchInput from "./components/explorer/SearchInput";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import SwapScreen from "./screens/SwapScreen";
import ExplorerScreen from "./screens/ExplorerScreen";
import { Colors } from "./data/colors";

// const Tabs = createBottomTabNavigator();
const Tab = createBottomTabNavigator();
const SwapStack = createStackNavigator();
const ExplorerStack = createStackNavigator();

const App = () => {
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
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "SWAP") {
              // iconName = "home";
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
            </ExplorerStack.Navigator>
          )}
        </Tab.Screen>
      </Tab.Navigator>
      {/* <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "SWAP") {
              iconName = "home";
              return <AntDesign name={"home"} size={size} color={color} />;
            } else if (route.name === "EXPLORER") {
              return <EvilIcons name={"search"} size={size} color={color} />;
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tabs.Screen name="SWAP" component={SwapScreen} />
        <Tabs.Screen name="EXPLORER" component={ExplorerScreen} />
      </Tabs.Navigator> */}
    </NavigationContainer>
  );
};

/* <Stack.Navigator>
        <Stack.Screen
          name="Swap"
          component={SwapScreen}
          options={{
            title: "SWAP",
            headerStyle: {
              backgroundColor: "#000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator> */

// const styles = StyleSheet.create({
//   screen: {
//     // flexGrow: 1,
//     // flexDirection: "column",
//   },
// });

export { App };
