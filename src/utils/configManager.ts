import { LOCAL_STORAGE } from "./../data/constants";
import { Testnet } from "./../data/node";
import { isProduction } from "./isProduction";

export const REST_API = (): string => {
  if (isProduction()) {
    return process.env.REACT_APP_API_MAINNET as string;
  } else {
    switch (localStorage.getItem(LOCAL_STORAGE.NODE)) {
      case Testnet.Node2Text:
        return process.env.REACT_APP_API_NODE_2 as string;
      case Testnet.Node3Text:
        return process.env.REACT_APP_API_NODE_3 as string;
      case Testnet.Node4Text:
        return process.env.REACT_APP_API_NODE_4 as string;
      case Testnet.Node5Text:
        return process.env.REACT_APP_API_NODE_5 as string;
      case Testnet.Node6Text:
        return process.env.REACT_APP_API_NODE_6 as string;
      case Testnet.Node7Text:
        return process.env.REACT_APP_API_NODE_7 as string;
      case Testnet.Node8Text:
        return process.env.REACT_APP_API_NODE_8 as string;
      case Testnet.Node9Text:
        return process.env.REACT_APP_API_NODE_9 as string;
      case Testnet.Node10Text:
        return process.env.REACT_APP_API_NODE_10 as string;
      case Testnet.Node11Text:
        return process.env.REACT_APP_API_NODE_11 as string;
      case Testnet.Node12Text:
        return process.env.REACT_APP_API_NODE_12 as string;
      case Testnet.Node13Text:
        return process.env.REACT_APP_API_NODE_13 as string;
      case Testnet.Node14Text:
        return process.env.REACT_APP_API_NODE_14 as string;
      case Testnet.Node15Text:
        return process.env.REACT_APP_API_NODE_15 as string;
      case Testnet.Node16Text:
        return process.env.REACT_APP_API_NODE_16 as string;
      case Testnet.Node17Text:
        return process.env.REACT_APP_API_NODE_17 as string;
      case Testnet.Node18Text:
        return process.env.REACT_APP_API_NODE_18 as string;
      case Testnet.Node19Text:
        return process.env.REACT_APP_API_NODE_19 as string;
      case Testnet.Node20Text:
        return process.env.REACT_APP_API_NODE_20 as string;
      case Testnet.Node21Text:
        return process.env.REACT_APP_API_NODE_21 as string;
      case Testnet.Node22Text:
        return process.env.REACT_APP_API_NODE_22 as string;
      case Testnet.Node23Text:
        return process.env.REACT_APP_API_NODE_23 as string;
      case Testnet.Node24Text:
        return process.env.REACT_APP_API_NODE_24 as string;
      case Testnet.Node25Text:
        return process.env.REACT_APP_API_NODE_25 as string;
      default:
        return process.env.REACT_APP_API as string;
    }
  }
};

export const BLOCKCHAIN_INFO = (): string => {
  return process.env.REACT_APP_BLOCKCHAIN_INFO as string;
};

export const WS = (): string => {
  if (isProduction()) {
    return "wss://mainnet.swingby.network/ws";
  } else {
    return process.env.REACT_APP_WS_URL as string;
  }
};
