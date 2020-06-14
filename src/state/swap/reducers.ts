import { GET_ALL_USER_INFO_REQUEST_SUCCESS, ADD_NUM } from "./actions";
import { ActionType, getType } from "typesafe-actions";
import * as actions from "./actions";

const initialState = {
  step: 1,
  isValid: false,
  isConfirmedAddress: false,
  validationMessage: "",
  fromCurrency: "BTC",
  // Changed according to updated design
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
  id: "id1",
  name: "Michael",
  email: "michael@example.com",
  number: 1,
};

export type SwapAction = ActionType<typeof actions>;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USER_INFO_REQUEST_SUCCESS: {
      const { id, name, email } = action.payload;

      return {
        id,
        name,
        email,
      };
    }
    case ADD_NUM: {
      return {
        number: state.number + 1,
      };
    }
    case getType(actions.fetchPriceAsync.request): {
      return { ...state, error: null };
    }
    case getType(actions.fetchPriceAsync.success): {
      return { ...state, btcPrice: action.payload };
    }
    case getType(actions.fetchPriceAsync.failure): {
      return { ...state, error: action.payload };
    }
    default:
      return state;
  }
};

export { reducer };
