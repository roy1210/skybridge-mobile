export interface SwapRawObject {
  addressIn: string;
  addressOut: string;
  amountIn: number;
  amountOut: number;
  currencyIn: string;
  currencyOut: string;
  fee?: number;
  feeCurrency: string;
  status: string;
  timestamp?: number;
  txIdIn?: string;
  txIdOut?: string;
  rewards?: Reward[];
}

export interface Reward {
  address: string;
  amount: string;
  currency: string;
}

export interface VinObject {
  txid: string;
  vout: number;
  sequence: number;
}

export interface VoutObject {
  value: string;
  spent: boolean;
  txs: string[];
  n: number;
  scriptPubkey: any;
}

export interface WSTxObject {
  txid: string;
  hash: string;
  confirms: number;
  receivedtime: number;
  minedtime: number;
  mediantime: number;
  version: number;
  weight: number;
  locktime: number;
  vin: VinObject[];
  vout: VoutObject[];
}

export interface WSMessagePayload {
  action: string;
  result: string;
  message: string;
  txs: WSTxObject[];
}

export const WSActions = {
  WATCH_TXS: "watchTxs",
};

export const DocumentTitle = {
  Main: "Swingby Skybridge",
  explorer: "Swingby Skybridge | Explorer",
  nodeList: "Swingby Skybridge | Node list",
  PageNotFound: "Swingby Skybridge | 404",
};
