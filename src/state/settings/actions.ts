import { createAction, createAsyncAction } from "typesafe-actions";
import * as SettingsActionTypes from "./types";
import { IUserAddresses } from "./types";

export const setUserAddress = (addresses: IUserAddresses) => {
  return {
    type: SettingsActionTypes.SET_USER_ADDRESSES,
    payload: addresses,
  };
};

export const setUserBtcAddress = (address: string) => {
  return {
    type: SettingsActionTypes.SET_USER_BTC_ADDRESSES,
    payload: address,
  };
};
export const setUserBtcbAddress = (address: string) => {
  return {
    type: SettingsActionTypes.SET_USER_BTCB_ADDRESSES,
    payload: address,
  };
};

export const fetchUserAddressesAsync = createAsyncAction(
  SettingsActionTypes.FETCH_USER_ADDRESSES_REQUEST,
  SettingsActionTypes.FETCH_USER_ADDRESSES_SUCCESS,
  SettingsActionTypes.FETCH_USER_ADDRESSES_FAILURE
)<void, IUserAddresses, Error>();
