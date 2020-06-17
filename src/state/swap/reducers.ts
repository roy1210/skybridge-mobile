import { ActionType, getType } from "typesafe-actions";
import * as actions from "./actions";
import {
  GO_NEXT_STEP,
  INPUT_RECEIVING_ADDRESS,
  INPUT_RECEIVING_BALANCE,
  INPUT_SENDING_BALANCE,
  VALIDATE_INPUT,
  SET_TX_HASH,
  GO_BACK_STEP,
  SET_FROM_CURRENCY,
  SET_TO_CURRENCY,
} from "./types";

const initialState = {
  step: 1,
  isValid: false,
  // isConfirmedAddress: false,
  validationMessage: "",
  fromCurrency: "BTC",
  toCurrency: "BTC.B",
  sendingBalance: 0,
  receivingBalance: 0,
  rate: 1,
  btcPrice: 0,
  platformStatus: null,
  fromWalletAddress: "",
  toWalletAddress: "",
  isLoading: false,
  calculateSwapRes: null,
  createSwapRes: null,
  txHash: "",
  info: null,
  indexer: null,
  depositAddresses: [],
  fees: [],
  error: null,
};

export type SwapAction = ActionType<typeof actions>;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GO_NEXT_STEP: {
      return {
        ...state,
        step: state.step + 1,
      };
    }
    case GO_BACK_STEP: {
      return {
        ...state,
        step: action.payload,
        isValid: false,
        validationMessage: "",
        fromCurrency: "BTC",
        toCurrency: "BTC.B",
        sendingBalance: 0,
        receivingBalance: 0,
        fromWalletAddress: "",
        toWalletAddress: "",
        calculateSwapRes: null,
        createSwapRes: null,
        txHash: "",
        error: null,
      };
    }
    case INPUT_SENDING_BALANCE: {
      return { ...state, sendingBalance: Number(action.payload) };
    }
    case INPUT_RECEIVING_BALANCE: {
      return { ...state, receivingBalance: action.payload };
    }
    case VALIDATE_INPUT: {
      return {
        ...state,
        isValid: action.result,
        validationMessage: action.message,
      };
    }
    case INPUT_RECEIVING_ADDRESS: {
      return {
        ...state,
        toWalletAddress: action.payload,
      };
    }
    case SET_TX_HASH: {
      return { ...state, txHash: action.payload };
    }
    case SET_FROM_CURRENCY: {
      return { ...state, fromCurrency: action.payload };
    }
    case SET_TO_CURRENCY: {
      return { ...state, toCurrency: action.payload };
    }

    case getType(actions.fetchPriceAsync.request): {
      return { ...state, error: null };
    }
    case getType(actions.fetchPriceAsync.success): {
      return { ...state, btcPrice: action.payload };
    }
    case getType(actions.fetchPriceAsync.failure): {
      return { ...state, error: action.payload.message };
    }

    case getType(actions.fetchFeesAsync.request): {
      return state;
    }
    case getType(actions.fetchFeesAsync.success): {
      return { ...state, fees: action.payload };
    }
    case getType(actions.fetchFeesAsync.failure): {
      return { ...state, error: action.payload.message };
    }

    case getType(actions.calculateSwapAsync.request): {
      return { ...state, isLoading: true, error: null };
    }
    case getType(actions.calculateSwapAsync.success): {
      return { ...state, calculateSwapRes: action.payload, isLoading: false };
    }
    case getType(actions.calculateSwapAsync.failure): {
      return { ...state, isLoading: false, error: action.payload.message };
    }

    case getType(actions.createSwapAsync.request): {
      return { ...state, isLoading: true, error: null };
    }
    case getType(actions.createSwapAsync.success): {
      return { ...state, createSwapRes: action.payload, isLoading: false };
    }
    case getType(actions.createSwapAsync.failure): {
      return { ...state, isLoading: false, error: action.payload.message };
    }

    case getType(actions.fetchInfoAsync.request): {
      return state;
    }
    case getType(actions.fetchInfoAsync.success): {
      return { ...state, info: action.payload };
    }
    case getType(actions.fetchInfoAsync.failure): {
      return { ...state, error: action.payload.message.message, info: null };
    }

    case getType(actions.fetchIndexerAsync.success): {
      return { ...state, indexer: action.payload };
    }
    case getType(actions.fetchIndexerAsync.failure): {
      return { ...state, error: action.payload, indexer: null };
    }
    case getType(actions.fetchDepositAddressAsync.request): {
      return state;
    }
    case getType(actions.fetchDepositAddressAsync.success): {
      return { ...state, depositAddresses: action.payload };
    }
    case getType(actions.fetchDepositAddressAsync.failure): {
      return { ...state, error: action.payload };
    }

    default:
      return state;
  }
};

export { reducer };
