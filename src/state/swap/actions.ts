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

export const setFromCurrency = createAction(
  SwapActionTypes.SET_FROM_CURRENCY,
  (action) => {
    return (symbol: string) => action({ symbol });
  }
);

export const setToCurrency = createAction(
  SwapActionTypes.SET_TO_CURRENCY,
  (action) => {
    return (symbol: string) => action({ symbol });
  }
);

export const inputSendingAmount = (amount: string) => {
  return { type: SwapActionTypes.INPUT_SENDING_BALANCE, payload: amount };
};

export const inputReceivingAmount = (amount: string) => {
  return {
    type: SwapActionTypes.INPUT_RECEIVING_BALANCE,
    payload: amount,
  };
};

export const goNextStep = createAction(
  SwapActionTypes.GO_NEXT_STEP,
  (action) => {
    return () => action();
  }
);

export const goToBTCBTransferStep = createAction(
  SwapActionTypes.GO_TO_BTCB_TRANSFER_STEP,
  (action) => {
    return () => action();
  }
);

export const goBackStep = createAction(
  SwapActionTypes.GO_BACK_STEP,
  (action) => {
    return () => action();
  }
);

export const inputReceivingAddress = (address: string) => {
  return {
    type: SwapActionTypes.INPUT_RECEIVING_ADDRESS,
    payload: address,
  };
};

export const validateInput = (result: boolean, message: string) => {
  return {
    type: SwapActionTypes.VALIDATE_INPUT,
    result: result,
    message: message,
  };
};

export const toggleConfirmedAddress = createAction(
  SwapActionTypes.TOGGLE_CONFIRMED_ADDRESS,
  (action) => {
    return () => action();
  }
);

export const setRate = createAction(SwapActionTypes.SET_RATE, (action) => {
  return (rate: number) => action({ rate });
});

export const setTxHash = createAction(SwapActionTypes.SET_TX_HASH, (action) => {
  return (txHash: string) => action({ txHash });
});

export const fetchPriceAsync = createAsyncAction(
  SwapActionTypes.FETCH_PRICE_REQUEST,
  SwapActionTypes.FETCH_PRICE_SUCCESS,
  SwapActionTypes.FETCH_PRICE_FAILURE
)<void, number, Error>();

export const calculateSwapAsync = createAsyncAction(
  SwapActionTypes.CALCULATE_SWAP_REQUEST,
  SwapActionTypes.CALCULATE_SWAP_SUCCESS,
  SwapActionTypes.CALCULATE_SWAP_FAILURE
)<ICalculateSwapResponse, ICalculateSwapResponse, Error>();

export const createSwapAsync = createAsyncAction(
  SwapActionTypes.CREATE_SWAP_REQUEST,
  SwapActionTypes.CREATE_SWAP_SUCCESS,
  SwapActionTypes.CREATE_SWAP_FAILURE
)<ICreateSwapRequest, ICreateSwapResponse, Error>();

export const fetchTxHashAsync = createAsyncAction(
  SwapActionTypes.FETCH_TX_HASH_REQUEST,
  SwapActionTypes.FETCH_TX_HASH_SUCCESS,
  SwapActionTypes.FETCH_TX_HASH_FAILURE
)<IFetchTxHashRequest, string, Error>();

export const fetchInfoAsync = createAsyncAction(
  SwapActionTypes.FETCH_INFO_REQUEST,
  SwapActionTypes.FETCH_INFO_SUCCESS,
  SwapActionTypes.FETCH_INFO_FAILURE
)<void, IFetchInfoResponse, Error>();

export const fetchIndexerAsync = createAsyncAction(
  SwapActionTypes.FETCH_INDEXER_REQUEST,
  SwapActionTypes.FETCH_INDEXER_SUCCESS,
  SwapActionTypes.FETCH_INDEXER_FAILURE
)<void, IFetchIndexer, Error>();

export const fetchDepositAddressAsync = createAsyncAction(
  SwapActionTypes.FETCH_DEPOSIT_ADDRESS_REQUEST,
  SwapActionTypes.FETCH_DEPOSIT_ADDRESS_SUCCESS,
  SwapActionTypes.FETCH_DEPOSIT_ADDRESS_FAILURE
)<void, IDepositAddresses, Error>();

export const fetchFeesAsync = createAsyncAction(
  SwapActionTypes.FETCH_FEES_REQUEST,
  SwapActionTypes.FETCH_FEES_SUCCESS,
  SwapActionTypes.FETCH_FEES_FAILURE
)<void, IFetchFees, Error>();

export const fetchPlatformStatusAsync = createAsyncAction(
  SwapActionTypes.FETCH_PLATFORM_STATUS_REQUEST,
  SwapActionTypes.FETCH_PLATFORM_STATUS_SUCCESS,
  SwapActionTypes.FETCH_PLATFORM_STATUS_FAILURE
)<void, IPlatformStatusResponse, Error>();

export const switchCurrency = createAction(
  SwapActionTypes.SWITCH_CURRENCY,
  (action) => {
    return () => action();
  }
);
