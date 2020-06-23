export interface ISettingsState {
  readonly userAddresses: IUserAddresses;
  // readonly btcUserAddresses: string;
  // readonly btcbUserAddresses: string;
  readonly error: Error | null;
}

export const UserAddressesInitialState: IUserAddresses = {
  btc: "",
  btcb: "",
};

export interface IUserAddresses {
  btc: string;
  btcb: string;
}

export const SET_USER_ADDRESSES = "@@settings/SET_USER_ADDRESSES";
export const SET_USER_BTC_ADDRESSES = "@@settings/SET_USER_BTC_ADDRESSES";
export const SET_USER_BTCB_ADDRESSES = "@@settings/SET_USER_BTCB_ADDRESSES";

export const FETCH_USER_ADDRESSES_REQUEST =
  "@@settings/FETCH_USER_ADDRESSES_REQUEST";
export const FETCH_USER_ADDRESSES_SUCCESS =
  "@@settings/FETCH_USER_ADDRESSES_SUCCESS";
export const FETCH_USER_ADDRESSES_FAILURE =
  "@@settings/FETCH_USER_ADDRESSES_FAILURE";
