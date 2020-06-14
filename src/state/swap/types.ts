export interface ISwapState {
  readonly step: number;
  readonly isValid: boolean;
  readonly isConfirmedAddress: boolean;
  readonly validationMessage: string;
  readonly fromCurrency: string;
  readonly toCurrency: string;
  readonly sendingBalance: number;
  readonly receivingBalance: number;
  readonly rate: number;
  readonly btcPrice: number;
  readonly platformStatus: IPlatformStatusResponse | null;
  readonly fromWalletAddress: string;
  readonly toWalletAddress: string;
  readonly isLoading: boolean;
  readonly calculateSwapRes: ICalculateSwapResponse | null;
  readonly createSwapRes: ICreateSwapResponse | null;
  readonly txHash: string;
  readonly info: IFetchInfoResponse | null;
  readonly indexer: IFetchIndexer | null;
  readonly depositAddresses: IDepositAddresses;
  readonly fees: IFetchFees;
  readonly error: Error | null;
}

export interface IFetchPriceResponse {
  USD: {
    "15m": number;
  };
}

export interface ICreateSwapRequest {
  amount: string;
  fromCurrency: string;
  toCurrency: string;
  receivingAddress: string;
}

export interface ICreateSwapResponse {
  addressIn: string;
  addressOut: string;
  amountIn: string;
  currencyIn: string;
  currencyOut: string;
}
export interface ICalculateSwapResponse {
  currencyFrom: string;
  currencyTo: string;
  fee: string;
  nonce: number;
  receiveAmount: string;
  sendAmount: string;
}
export interface IFetchTxHashRequest {
  addressIn: string;
  addressOut: string;
  status: string;
}
export interface IFetchDepositAddress {
  currency: string;
  address: string;
}
export interface IDepositAddresses extends Array<IFetchDepositAddress> {}
export interface IFetchFee {
  bridgeFeePercent: string;
  currency: string;
  minerFee: string;
}
export interface IFetchFees extends Array<IFetchFee> {}

export interface IFetchInfoResponse {
  nodeInfo: {
    listenAddr: string;
    moniker: string;
    version: string;
  };
  swapInfo: {
    coin1: string;
    coin2: string;
    feePercent: number;
    stakeAmount: number;
  };
}

export interface IFetchIndexer {
  txId: string;
  from: string;
  to: string;
  amount: string;
  currency: string;
  decimals: number;
  height: number;
  time: number;
  confirmations: number;
  memo: string;
  outputIndex: number;
  spent: boolean;
}

export interface IFetchIndexers extends Array<IFetchIndexer> {}

export interface IPlatformStatusResponse {
  status: number;
}

export const SET_FROM_CURRENCY = "@@swap/SET_FROM_CURRENCY";
export const SET_TO_CURRENCY = "@@swap/SET_TO_CURRENCY";
export const INPUT_SENDING_BALANCE = "@@swap/INPUT_SENDING_BALANCE";
export const INPUT_RECEIVING_BALANCE = "@@swap/INPUT_RECEIVING_BALANCE";
export const GO_NEXT_STEP = "@@swap/GO_NEXT_STEP";
export const GO_BACK_STEP = "@@swap/GO_BACK_STEP";
export const GO_TO_BTCB_TRANSFER_STEP = "@@swap/GO_TO_BTCB_TRANSFER_STEP";
export const INPUT_RECEIVING_ADDRESS = "@@swap/INPUT_RECEIVING_ADDRESS";
export const VALIDATE_INPUT = "@@swap/VALIDATE_INPUT";
export const TOGGLE_CONFIRMED_ADDRESS = "@@swap/TOGGLE_CONFIRMED_ADDRESS";
export const SET_RATE = "@@swap/SET_RATE";
export const SET_TX_HASH = "@@swap/SET_TX_HASH";
export const RESET_INFO = "@@swap/RESET_INFO";
export const FETCH_PRICE_REQUEST = "@@swap/FETCH_PRICE_REQUEST";
export const FETCH_PRICE_SUCCESS = "@@swap/FETCH_PRICE_SUCCESS";
export const FETCH_PRICE_FAILURE = "@@swap/FETCH_PRICE_FAILURE";
export const CALCULATE_SWAP_REQUEST = "@@swap/CALCULATE_SWAP_REQUEST";
export const CALCULATE_SWAP_SUCCESS = "@@swap/CALCULATE_SWAP_SUCCESS";
export const CALCULATE_SWAP_FAILURE = "@@swap/CALCULATE_SWAP_FAILURE";
export const CREATE_SWAP_REQUEST = "@@swap/CREATE_SWAP_REQUEST";
export const CREATE_SWAP_SUCCESS = "@@swap/CREATE_SWAP_SUCCESS";
export const CREATE_SWAP_FAILURE = "@@swap/CREATE_SWAP_FAILURE";
export const FETCH_TX_HASH_REQUEST = "@@swap/FETCH_TX_HASH_REQUEST";
export const FETCH_TX_HASH_SUCCESS = "@@swap/FETCH_TX_HASH_SUCCESS";
export const FETCH_TX_HASH_FAILURE = "@@swap/FETCH_TX_HASH_FAILURE";
export const FETCH_INFO_REQUEST = "@@swap/FETCH_INFO_REQUEST";
export const FETCH_INFO_SUCCESS = "@@swap/FETCH_INFO_SUCCESS";
export const FETCH_INFO_FAILURE = "@@swap/FETCH_INFO_FAILURE";
export const FETCH_INDEXER_REQUEST = "@@swap/FETCH_INDEXER_REQUEST";
export const FETCH_INDEXER_SUCCESS = "@@swap/FETCH_INDEXER_SUCCESS";
export const FETCH_INDEXER_FAILURE = "@@swap/FETCH_INDEXER_FAILURE";
export const FETCH_DEPOSIT_ADDRESS_REQUEST =
  "@@swap/FETCH_DEPOSIT_ADDRESS_REQUEST";
export const FETCH_DEPOSIT_ADDRESS_SUCCESS =
  "@@swap/FETCH_DEPOSIT_ADDRESS_SUCCESS";
export const FETCH_DEPOSIT_ADDRESS_FAILURE =
  "@@swap/FETCH_DEPOSIT_ADDRESS_FAILURE";
export const FETCH_FEES_REQUEST = "@@swap/FETCH_FEES_REQUEST";
export const FETCH_FEES_SUCCESS = "@@swap/FETCH_FEES_SUCCESS";
export const FETCH_FEES_FAILURE = "@@swap/FETCH_FEES_FAILURE";
export const FETCH_PLATFORM_STATUS_REQUEST =
  "@@swap/FETCH_PLATFORM_STATUS_REQUEST";
export const FETCH_PLATFORM_STATUS_SUCCESS =
  "@@swap/FETCH_PLATFORM_STATUS_SUCCESS";
export const FETCH_PLATFORM_STATUS_FAILURE =
  "@@swap/FETCH_PLATFORM_STATUS_FAILURE";
export const SWITCH_CURRENCY = "@@swap/SWITCH_CURRENCY";
