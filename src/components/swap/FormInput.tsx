import { Entypo } from "@expo/vector-icons";
import { Input, Text } from "@ui-kitten/components";
import React, { useEffect, useRef, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import RBSheet from "react-native-raw-bottom-sheet";
import { WToast } from "react-native-smart-tip";
import { useDispatch } from "react-redux";
import { Colors } from "../../data/colors";
import { inputSendingAmount } from "../../state/swap/actions";
import FromCoinSelectModal from "./modals/FromCoinSelectModal";
interface Props {
  fromCurrency: string;
  validationMessage: string;
  step: number;
}

const FormInput = (props: Props): JSX.Element => {
  const { validationMessage, fromCurrency, step } = props;
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const show = () => {
    WToast.show({ data: validationMessage });
  };
  const refSelectCoinSheet = useRef();

  useEffect(() => {
    step !== 1 ? setValue("") : undefined;
  }, [step]);

  return (
    <View style={styles.input}>
      <Input
        placeholder="0"
        placeholderTextColor={Colors.white}
        textStyle={styles.inputText}
        value={value}
        onChangeText={(nextValue) => {
          setValue(nextValue);
          dispatch(inputSendingAmount(nextValue));
        }}
        autoCorrect={false}
        keyboardType="numeric"
        size="medium"
        onBlur={() => {
          if (validationMessage !== "") {
            show();
          }
        }}
        status={validationMessage !== "" ? "danger" : undefined}
      />
      <View style={styles.currency}>
        <TouchableWithoutFeedback
          onPress={() => {
            refSelectCoinSheet.current.open();
          }}
        >
          <View style={styles.currencyView}>
            <Entypo
              style={styles.triangle}
              name="triangle-down"
              size={14}
              color="white"
            />
            <Text style={styles.currencyText}>{fromCurrency}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <RBSheet
        ref={refSelectCoinSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: Colors.transparent,
          },
          draggableIcon: {
            backgroundColor: Colors.grey,
          },
        }}
      >
        <FromCoinSelectModal fromCurrency={fromCurrency} />
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 300,
  },
  inputText: {
    color: Colors.white,
  },
  currency: {
    right: 20,
    top: 10,
    height: 100,
    color: "white",
    position: "absolute",
  },
  currencyView: {
    width: 60,
    height: 30,
    flexDirection: "row",
  },
  triangle: {
    top: 2,
    marginRight: 3,
    ...Platform.select({
      android: {
        top: 4,
        marginRight: 6,
      },
    }),
  },
  currencyText: {},
});

export default FormInput;
