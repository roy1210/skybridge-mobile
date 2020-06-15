import { Entypo, Feather } from "@expo/vector-icons";
import { Input, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { WToast } from "react-native-smart-tip";
import { useDispatch } from "react-redux";
import { CoinSymbol } from "../../data/constants";
import { inputReceivingAddress } from "../../state/swap/actions";
import { isBinanceAddress, isBitcoinAddress } from "../../utils/validator";
interface Props {
  setIsValidAddress: (arg0: boolean) => void;
  setAddressValidationMessage: (string) => void;
  toCurrency: string;
  addressValidationMessage: string | undefined;
  isValidAddress: boolean;
}

const AddressInput = (props: Props): JSX.Element => {
  const {
    toCurrency,
    setIsValidAddress,
    addressValidationMessage,
    setAddressValidationMessage,
    isValidAddress,
  } = props;
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const checkAddressHandler = (newValue): void => {
    if (value !== "") {
      if (toCurrency === CoinSymbol.BTC) {
        const result = isBitcoinAddress(newValue);
        if (!result.isValid) {
          setIsValidAddress(false);
          setAddressValidationMessage(result.message);
        } else {
          setIsValidAddress(true);
          setAddressValidationMessage("");
          dispatch(inputReceivingAddress(newValue));
        }
      } else if (toCurrency === CoinSymbol.BTC_B) {
        const result = isBinanceAddress(newValue);
        if (!result.isValid) {
          setIsValidAddress(false);
          setAddressValidationMessage(result.message);
          // setAddressValidationMessage("Wrong format");
        } else {
          setIsValidAddress(true);
          setAddressValidationMessage("");
          dispatch(inputReceivingAddress(newValue));
        }
      }
    }
  };
  const show = () => {
    WToast.show({ data: addressValidationMessage });
  };

  const validationMark = () => {
    if (value !== "") {
      if (isValidAddress) {
        return <Entypo name="check" size={24} color="teal" />;
      } else {
        return <Feather name="x" size={24} color="red" />;
      }
    }
  };

  useEffect(() => {
    checkAddressHandler(value);
  }, [value]);
  return (
    <View>
      <Input
        placeholder="Your address"
        value={value}
        onChangeText={(nextValue) => {
          setValue(nextValue);
        }}
        autoCorrect={false}
        size="medium"
        style={styles.input}
        textStyle={styles.inputText}
        onBlur={() => {
          if (addressValidationMessage !== "") {
            show();
          }
        }}
        status={addressValidationMessage !== "" ? "danger" : undefined}
      />
      <Text style={styles.validation}>{validationMark()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 300,
    marginVertical: 40,
  },
  inputText: {
    marginRight: 24,
  },
  validation: {
    position: "absolute",
    right: 6,
    top: 48,
  },
});

export default AddressInput;
