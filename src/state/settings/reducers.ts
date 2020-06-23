import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import {
  ISettingsState,
  SET_USER_ADDRESSES,
  UserAddressesInitialState,
} from "./types";

export const initialState: ISettingsState = {
  userAddresses: UserAddressesInitialState,
  // btcUserAddresses: "",
  // btcbUserAddresses: "",
  error: null,
};

export type SettingsAction = ActionType<typeof actions>;

export const reducer = (
  state: ISettingsState = initialState,
  action: SettingsAction
): ISettingsState => {
  switch (action.type) {
    case SET_USER_ADDRESSES: {
      // @ts-ignore
      return { ...state, userAddresses: action.payload };
    }
    // case SET_USER_BTC_ADDRESSES: {
    //   return { ...state, btcUserAddresses: action.payload };
    // }
    // case SET_USER_BTCB_ADDRESSES: {
    //   return { ...state, btcbUserAddresses: action.payload };
    // }
    // case getType(actions.fetchUserAddressesAsync.request): {
    //   return state;
    // }
    // case getType(actions.fetchUserAddressesAsync.success): {
    //   return { ...state, userAddresses: action.payload };
    // }
    // case getType(actions.fetchUserAddressesAsync.failure): {
    //   return { ...state, userAddresses: action.payload.message };
    // }
    default:
      return state;
  }
};
