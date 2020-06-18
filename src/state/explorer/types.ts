// import {
//   IFetchFees,
//   IFetchInfoResponse,
//   IPlatformStatusResponse
// } from "./../swap/types";
// import { SwapRawObject } from "../../../types/swapApp";

// export interface IExplorerState {
//   readonly page: number;
//   readonly selectedPage: number;
//   readonly query: string;
//   readonly total: number;
//   readonly swapHistory: ITransactions | null;
//   readonly isLoading: boolean;
//   readonly isHideWaiting: boolean;
//   readonly isNoResults: boolean;
//   readonly error: Error | null;
//   readonly fees: IFetchFees;
//   readonly info: IFetchInfoResponse | null;
//   readonly floats: IFetchFloatsResponse;
//   readonly platformStatus: IPlatformStatusResponse | null;
// }

// export interface IFetchSwapHistoryRequest {
//   query: string;
//   page: number;
// }

// export interface IFetchSwapHistoryResponse {
//   items: SwapRawObject[];
//   itemCount: number;
//   total: number;
// }

// export interface ITransactions {
//   data: {
//     [page: number]: SwapRawObject[];
//   };
//   total: number;
// }

// export interface IFetchFloatsResponse {
//   btc: string;
//   btcb: string;
//   bnb: string;
// }
// export const InitialFloatsBalance: IFetchFloatsResponse = {
//   btc: "0",
//   btcb: "0",
//   bnb: "0"
// };
// export interface IFloatsBalance {
//   free: string;
//   frozen: string;
//   locked: string;
//   symbol: string;
// }

// export type FloatBalanceArray = IFloatsBalance[];

// export interface ITxrefs {
//   tx_hash: string;
//   block_height: number;
//   tx_input_n: number;
//   tx_output_n: number;
//   value: number;
//   ref_balance: number;
//   confirmations: number;
//   confirmed: string;
//   double_spend: boolean;
// }

// export type TxrefsArray = ITxrefs[];

// export interface IFloatBalance {
//   "BTC.B-888": string;
//   "BTC.B-918": string;
//   BNB: string;
//   BTC: IBtcFloatBalance;
// }

// export interface IBtcFloatBalance {
//   confirmed: string;
//   unconfirmed: string;
// }

export const FETCH_SWAP_HISTORY_REQUEST =
  "@@explorer/FETCH_SWAP_HISTORY_REQUEST";
export const FETCH_SWAP_HISTORY_SUCCESS =
  "@@explorer/FETCH_SWAP_HISTORY_SUCCESS";
export const FETCH_SWAP_HISTORY_FAILURE =
  "@@explorer/FETCH_SWAP_HISTORY_FAILURE";
export const FETCH_FLOATS_REQUEST = "@@explorer/FETCH_FLOATS_REQUEST";
export const FETCH_FLOATS_SUCCESS = "@@explorer/FETCH_FLOATS_SUCCESS";
export const FETCH_FLOATS_FAILURE = "@@explorer/FETCH_FLOATS_FAILURE";
export const CHECK_TRANSACTION_LENGTH = "@@explorer/CHECK_TRANSACTION_LENGTH";
export const TOGGLE_HIDE_WAITING = "@@explorer/TOGGLE_HIDE_WAITING";

export const TxStatus = {
  COMPLETED: "COMPLETED",
  REJECTED: "REJECTED",
  CANCELED: "CANCELED",
  WAITING: "WAITING",
  BROADCASTED: "BROADCASTED",
  SENDING: "SENDING",
  PENDING: "PENDING",
  SIGNING: "SIGNING",
  SENT: "SENT",
  REFUNDING: "REFUNDING",
  SIGNING_REFUND: "SIGNING_REFUND",
  REFUNDED: "REFUNDED",
  SENDING_REFUND: "SENDING_REFUND",
};
