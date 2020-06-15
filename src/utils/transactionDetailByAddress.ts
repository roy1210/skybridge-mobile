import { CoinSymbol } from "./../state/ducks/explorer/types";
import { isProduction } from "./isProduction";

export const transactionDetailByAddress = (
  currency: string,
  address: string
): string => {
  const btcExplorerBaseUrl = isProduction()
    ? "https://blockstream.info/address"
    : "https://blockstream.info/testnet/address";
  const bnbExplorerBaseUrl = isProduction()
    ? "https://explorer.binance.org/address"
    : "https://testnet-explorer.binance.org/address";

  switch (currency) {
    case CoinSymbol.BTC:
      return `${btcExplorerBaseUrl}/${address}`;

    case CoinSymbol.BTC_B:
      return `${bnbExplorerBaseUrl}/${address}`;

    case CoinSymbol.BTC_B_888:
      return `${bnbExplorerBaseUrl}/${address}`;

    default:
      return "";
  }
};
