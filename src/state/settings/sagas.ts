import AsyncStorage from "@react-native-community/async-storage";
import { all, put, takeLatest } from "redux-saga/effects";
import { fetchUserAddressesAsync } from "./actions";
// import { FETCH_USER_ADDRESSES_REQUEST } from "./types";
import * as SettingsActionTypes from "./types";

/**
 * Calls Floats API.
 * @param action
 */
function* handleFetchUserAddresses(): Generator {
  // action: ReturnType<typeof fetchUserAddressesAsync.request>
  let addresses = {
    btc: "",
    btcb: "",
  };
  try {
    const jsonValue = AsyncStorage.getItem("userAddresses");
    console.log("jsonValue", jsonValue);
    const parsedUserAddresses =
      jsonValue !== null ? JSON.parse(String(jsonValue)) : null;
    // const parsedUserAddresses = JSON.parse(String(jsonValue));
    addresses = {
      btc: parsedUserAddresses.btc !== null ? parsedUserAddresses.btc : "",
      btcb:
        parsedUserAddresses.btcb !== null
          ? parsedUserAddresses.btcb
          : "Has not found",
    };
    console.log("parsedUserAddresses", parsedUserAddresses);
    console.log("addresses", addresses);
    yield put(fetchUserAddressesAsync.success(addresses));
  } catch (e) {
    fetchUserAddressesAsync.failure(e);
  }
}

export default function* settingsSaga() {
  yield all([
    takeLatest(
      SettingsActionTypes.FETCH_USER_ADDRESSES_REQUEST,
      handleFetchUserAddresses
    ),
  ]);
}
