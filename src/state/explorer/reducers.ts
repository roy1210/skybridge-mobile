import { ActionType, getType } from "typesafe-actions";
import * as actions from "./actions";
import {
  IExplorerState,
  InitialFloatsBalance,
  TOGGLE_HIDE_WAITING,
  GO_TO_NEXT_PAGE,
  GO_TO_BACK_PAGE,
  SET_QUERY,
  CHECK_TRANSACTION_LENGTH,
  TOGGLE_ACTION_SHEET,
} from "./types";

export const initialState: IExplorerState = {
  page: 0,
  selectedPage: 0,
  query: "",
  total: 0,
  swapHistory: null,
  isLoading: false,
  isHideWaiting: false,
  error: null,
  fees: [],
  info: null,
  floats: InitialFloatsBalance,
  isNoResults: false,
  platformStatus: null,
};

export type ExplorerAction = ActionType<typeof actions>;

export const reducer = (
  state: IExplorerState = initialState,
  action: ExplorerAction
): IExplorerState => {
  switch (action.type) {
    case TOGGLE_HIDE_WAITING: {
      return { ...state, isHideWaiting: !state.isHideWaiting };
    }
    case GO_TO_NEXT_PAGE: {
      return { ...state, page: action.payload };
    }
    case GO_TO_BACK_PAGE: {
      return { ...state, page: action.payload };
    }
    case SET_QUERY: {
      return { ...state, query: action.payload };
    }
    case CHECK_TRANSACTION_LENGTH: {
      return {
        ...state,
        isNoResults: action.payload,
      };
    }
    case getType(actions.fetchSwapHistoryAsync.request): {
      return { ...state, isLoading: true };
    }
    case getType(actions.fetchSwapHistoryAsync.success): {
      return { ...state, isLoading: false, swapHistory: action.payload };
    }
    case getType(actions.fetchSwapHistoryAsync.failure): {
      return { ...state, isLoading: false, error: action.payload.message };
    }

    case getType(actions.fetchFloatsAsync.request): {
      return state;
    }
    case getType(actions.fetchFloatsAsync.success): {
      return { ...state, floats: action.payload };
    }
    case getType(actions.fetchFloatsAsync.failure): {
      return { ...state, error: action.payload.message };
    }

    // case getType(actions.fetchFeesAsync.request): {
    //   return state;
    // }
    // case getType(actions.fetchFeesAsync.success): {
    //   return { ...state, fees: action.payload };
    // }
    // case getType(actions.fetchFeesAsync.failure): {
    //   return { ...state, error: action.payload.message };
    // }
    // case getType(actions.fetchPlatformStatusAsync.request): {
    //   return state;
    // }
    // case getType(actions.fetchPlatformStatusAsync.success): {
    //   return { ...state, platformStatus: action.payload };
    // }
    // case getType(actions.fetchPlatformStatusAsync.failure): {
    //   return { ...state, error: action.payload.message };
    // }
    default:
      return state;
  }
};
