import { createAction, createAsyncAction } from "typesafe-actions";
import * as SwapActionTypes from "./types";
import {
  ICreateSwapRequest,
  ICreateSwapResponse,
  ICalculateSwapResponse,
  IFetchInfoResponse,
  IFetchTxHashRequest,
  IFetchFees,
  IFetchIndexer,
  IDepositAddresses,
  IPlatformStatusResponse,
} from "./types";

export const GET_ALL_USER_INFO_REQUEST = "user/GET_ALL_USER_INFO_REQUEST";
export const GET_ALL_USER_INFO_REQUEST_SUCCESS =
  "user/GET_ALL_USER_INFO_REQUEST_SUCCESS";
export const GET_ALL_USER_INFO_REQUEST_FAILURE =
  "user/GET_ALL_USER_INFO_REQUEST_FAILURE";

export const ADD_NUM = "ADD_NUM";

export const GetAllUserInfoRequest = (id: number) => {
  return { type: GET_ALL_USER_INFO_REQUEST, payload: id };
};
export const AddNum = () => {
  return { type: ADD_NUM };
};

export const fetchPriceAsync = createAsyncAction(
  SwapActionTypes.FETCH_PRICE_REQUEST,
  SwapActionTypes.FETCH_PRICE_SUCCESS,
  SwapActionTypes.FETCH_PRICE_FAILURE
)<void, number, Error>();
