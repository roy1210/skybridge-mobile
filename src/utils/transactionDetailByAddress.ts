import { CoinSymbol } from "../data/constants";

export const transactionDetailByAddress = (
  currency: string,
  address: string
): string => {
  const btcExplorerBaseUrl = "https://blockstream.info/testnet/address";
  const bnbExplorerBaseUrl = "https://testnet-explorer.binance.org/address";

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
