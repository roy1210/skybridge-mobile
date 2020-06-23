import { Layout, Text } from "@ui-kitten/components";
import {
  Body,
  Button,
  Content,
  Icon,
  Left,
  ListItem,
  Right,
  Switch,
  View,
} from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { Colors } from "../../data/colors";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Navigation } from "../../data/constants";

const SettingsScreen = () => {
  const navigation = useNavigation();
  return (
    <Layout style={styles.screen}>
      <Content>
        <View style={styles.category}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Navigation.Settings.MyAddresses);
            }}
          >
            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: "tomato" }}>
                  <Icon active name="star" />
                </Button>
              </Left>
              <Body>
                <Text>My Addresses</Text>
              </Body>
              <Right>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
          </TouchableOpacity>
        </View>
        <Text category="h5">Coming soon...</Text>
        <View style={styles.category}>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: Colors.lightOrange }}>
                <Icon active name="ios-moon" />
              </Button>
            </Left>
            <Body>
              <Text>Dark Mode</Text>
            </Body>
            <Right>
              <Switch value={true} />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: Colors.white }}>
                <FontAwesome name="chain" size={24} color="black" />
              </Button>
            </Left>
            <Body>
              <Text>Select Node</Text>
            </Body>
            <Right>
              <Text>Node 1</Text>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
        </View>
      </Content>
    </Layout>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // height: "100%",
  },
  category: {
    marginTop: 10,
    marginBottom: 30,
    paddingBottom: 10,
    backgroundColor: Colors.black,
  },
  categoryTitle: {
    alignContent: "center",
    alignSelf: "center",
  },
});

export default SettingsScreen;
