import React, { useState } from "react";
import { StyleSheet, View, Picker } from "react-native";
import { IUserAddresses } from "../../../state/settings/types";
interface Props {
  setValue: (arg0: string) => void;
  userAddresses: IUserAddresses;
}

const AddressFavorite = (props: Props) => {
  const { userAddresses } = props;
  const title = "Choose your address";
  const address = userAddresses.btc;
  const address2 = userAddresses.btcb;
  const [favoriteAddress, setFavoriteAddress] = useState(title);

  return (
    <View style={styles.screen}>
      <Picker
        selectedValue={favoriteAddress}
        onValueChange={(itemValue) => {
          props.setValue(itemValue);
          setFavoriteAddress(itemValue);
        }}
      >
        <Picker.Item label={title} />
        <Picker.Item label={address} value={address} />
        <Picker.Item label={address2} value={address2} />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: "10%",
  },
});

export default AddressFavorite;
