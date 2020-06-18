import { CoinSymbol } from "../data/constants";
import btc from "../../assets/btc.png";
import btcs from "../../assets/btcb.png";

export const coinId = (symbol: string): string => {
  switch (symbol) {
    case CoinSymbol.BTC:
      return btc;
    case CoinSymbol.BTC_S:
      return btcs;
    case CoinSymbol.BTC_B:
    case CoinSymbol.BTC_B_918:
    case CoinSymbol.BTC_B_888:
      return btcs;
    default:
      return "";
  }
};
