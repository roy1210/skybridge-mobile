import btc from "../resource/BTC.svg";
import btcs from "../resource/BTCS.svg";
import { CoinSymbol } from "../state/ducks/explorer/types";

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
