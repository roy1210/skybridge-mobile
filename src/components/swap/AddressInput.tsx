import { Entypo, Feather, Fontisto } from "@expo/vector-icons";
import { Input, Text } from "@ui-kitten/components";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import RBSheet from "react-native-raw-bottom-sheet";
import { WToast } from "react-native-smart-tip";
import { useDispatch } from "react-redux";
import { Colors } from "../../data/colors";
import { CoinSymbol } from "../../data/constants";
import { inputReceivingAddress } from "../../state/swap/actions";
import { isBinanceAddress, isBitcoinAddress } from "../../utils/validator";
import AddressFavorite from "./modals/AddressFavorite";
import { IUserAddresses } from "../../state/settings/types";
interface Props {
  setIsValidAddress: (arg0: boolean) => void;
  setAddressValidationMessage: (string) => void;
  toCurrency: string;
  addressValidationMessage: string | undefined;
  isValidAddress: boolean;
  step: number;
  userAddresses: IUserAddresses;
}

const AddressInput = (props: Props): JSX.Element => {
  const {
    toCurrency,
    setIsValidAddress,
    addressValidationMessage,
    setAddressValidationMessage,
    isValidAddress,
    step,
    userAddresses,
  } = props;
  const refAddressFavoriteSheet = useRef();
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    step !== 1 ? setValue("") : undefined;
  }, [step]);

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
  }, [value, toCurrency]);
  return (
    <View>
      <Input
        placeholder="Your receiving address"
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
      <View style={styles.favorite}>
        <TouchableWithoutFeedback
          onPress={() => {
            refAddressFavoriteSheet.current.open();
          }}
        >
          <Fontisto name="favorite" size={23} color="white" />
        </TouchableWithoutFeedback>
      </View>
      <Text style={styles.validation}>{validationMark()}</Text>
      <RBSheet
        ref={refAddressFavoriteSheet}
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
        <AddressFavorite setValue={setValue} userAddresses={userAddresses} />
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 300,
    marginTop: 40,
  },
  inputText: {
    marginRight: 38,
  },
  validation: {
    position: "absolute",
    right: 22,
    top: 48,
  },
  favorite: {
    position: "absolute",
    top: 50,
    right: 6,
  },
});

export default AddressInput;
