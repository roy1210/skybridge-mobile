import { createAction, createAsyncAction } from "typesafe-actions";
import * as SwapActionTypes from "../swap/types";
import * as ExplorerActionTypes from "./types";
import {
  IFetchFees,
  IFetchInfoResponse,
  IPlatformStatusResponse,
} from "./../swap/types";
import {
  IFetchFloatsResponse,
  IFetchSwapHistoryRequest,
  ITransactions,
} from "./types";

export const toggleHideWaiting = () => {
  return {
    type: ExplorerActionTypes.TOGGLE_HIDE_WAITING,
  };
};
export const goToNextPage = (page: number) => {
  return {
    type: ExplorerActionTypes.GO_TO_NEXT_PAGE,
    payload: page,
  };
};
export const goToBackPage = (page: number) => {
  return {
    type: ExplorerActionTypes.GO_TO_BACK_PAGE,
    payload: page,
  };
};
export const setQuery = (query: string) => {
  return {
    type: ExplorerActionTypes.SET_QUERY,
    payload: query,
  };
};

export const checkTransactionLength = (result: boolean) => {
  return {
    type: ExplorerActionTypes.CHECK_TRANSACTION_LENGTH,
    payload: result,
  };
};

export const fetchSwapHistoryAsync = createAsyncAction(
  ExplorerActionTypes.FETCH_SWAP_HISTORY_REQUEST,
  ExplorerActionTypes.FETCH_SWAP_HISTORY_SUCCESS,
  ExplorerActionTypes.FETCH_SWAP_HISTORY_FAILURE
)<IFetchSwapHistoryRequest, ITransactions, Error>();

export const fetchFloatsAsync = createAsyncAction(
  ExplorerActionTypes.FETCH_FLOATS_REQUEST,
  ExplorerActionTypes.FETCH_FLOATS_SUCCESS,
  ExplorerActionTypes.FETCH_FLOATS_FAILURE
)<void, IFetchFloatsResponse, Error>();

export const fetchFeesAsync = createAsyncAction(
  SwapActionTypes.FETCH_FEES_REQUEST,
  SwapActionTypes.FETCH_FEES_SUCCESS,
  SwapActionTypes.FETCH_FEES_FAILURE
)<void, IFetchFees, Error>();

export const fetchInfoAsync = createAsyncAction(
  SwapActionTypes.FETCH_INFO_REQUEST,
  SwapActionTypes.FETCH_INFO_SUCCESS,
  SwapActionTypes.FETCH_INFO_FAILURE
)<void, IFetchInfoResponse, Error>();

export const fetchPlatformStatusAsync = createAsyncAction(
  SwapActionTypes.FETCH_PLATFORM_STATUS_REQUEST,
  SwapActionTypes.FETCH_PLATFORM_STATUS_SUCCESS,
  SwapActionTypes.FETCH_PLATFORM_STATUS_FAILURE
)<void, IPlatformStatusResponse, Error>();
