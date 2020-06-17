import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Clipboard,
  Dimensions,
  ScrollView,
} from "react-native";
import { Text, Button } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { WToast } from "react-native-smart-tip";
import { useDispatch } from "react-redux";
import { fetchIndexerAsync, goBackStep } from "../../../state/swap/actions";
import { Colors } from "../../../data/colors";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { Screen } from "../../../data/screen";

interface Props {
  txHash: string;
  navigation: StackNavigationProp;
  setIsModalWakeUp: (arg0: boolean) => void;
}

const RequestedTransactionModal = (props: Props) => {
  const { txHash, navigation, setIsModalWakeUp } = props;
  const dispatch = useDispatch();

  // Memo: Monitor indexer pool.
  let fetchIndexerTimer: any;
  useEffect(() => {
    dispatch(fetchIndexerAsync.request());
    fetchIndexerTimer = setInterval(() => {
      dispatch(fetchIndexerAsync.request());
    }, 5000);
    return () => {
      clearInterval(fetchIndexerTimer);
    };
  }, []);
  if (txHash) {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.screen}>
          <Text category="h3" style={styles.title}>
            Confirmation
          </Text>
          <View>
            <Text category="h6" style={styles.description}>
              The network has been seen your transaction and is waiting for
              confirmation on blockchain
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setString(txHash);
                WToast.show({
                  data: `Copied ${txHash}`,
                });
              }}
            >
              <Text category="p2" style={styles.section}>
                Transaction Hash
              </Text>
              <MaterialIcons
                name="content-copy"
                size={20}
                color="white"
                style={styles.copy}
              />
              <Text>{txHash}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttons}>
            <Button
              style={styles.button}
              onPress={() => {
                setIsModalWakeUp(false);
                dispatch(goBackStep(1));
                navigation.navigate("Explorer");
              }}
            >
              View Explorer
            </Button>
            <Button
              style={styles.cancelButton}
              onPress={() => {
                dispatch(goBackStep(1));
                setIsModalWakeUp(false);
              }}
            >
              New Swap
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
};

const screenHeight = Math.round(Dimensions.get("window").height);

const styles = StyleSheet.create({
  screen: {
    flexDirection: "column",
    height: screenHeight > Screen.Nexus_4.height ? 540 : "100%",
  },
  title: {
    alignSelf: "center",
  },
  description: {
    marginVertical: 30,
  },
  section: {
    marginVertical: 20,
  },
  copy: {
    position: "absolute",
    top: 22,
    right: 0,
  },
  buttons: {
    position: screenHeight > Screen.Nexus_4.height ? "absolute" : "relative",
    marginTop: screenHeight > Screen.Nexus_4.height ? 0 : 20,
    bottom: 0,
  },
  button: {
    marginTop: 20,
    width: 300,
    borderRadius: 20,
    backgroundColor: Colors.darkNavy,
  },
  cancelButton: {
    marginTop: 20,
    width: 300,
    borderRadius: 20,
    backgroundColor: Colors.darkRed,
    borderColor: Colors.slaty,
  },
});

export default RequestedTransactionModal;
