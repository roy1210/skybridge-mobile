import { CoinSymbol } from "./../data/constants";
import { TxStatus } from "../state/explorer/types";

const isRefundStatus = (status: string): boolean => {
  if (status === TxStatus.REFUNDED) {
    return true;
  } else if (status === TxStatus.SIGNING_REFUND) {
    return true;
  } else {
    return false;
  }
};

export const transactionDetail = (
  currency: string,
  refundCurrency: string,
  hash: string,
  status: string
): string => {
  const btcExplorerBaseUrl = "https://blockstream.info/testnet/tx";
  const bnbExplorerBaseUrl = "https://testnet-explorer.binance.org/tx";

  // Not refund status
  const bnbCurrencies = [
    CoinSymbol.BTC_B,
    CoinSymbol.BTC_B_918,
    CoinSymbol.BTC_B_888,
  ];
  if (!isRefundStatus(status)) {
    if (currency === CoinSymbol.BTC) {
      return `${btcExplorerBaseUrl}/${hash}`;
    } else if (bnbCurrencies.includes(currency)) {
      return `${bnbExplorerBaseUrl}/${hash}`;
    } else {
      return `${bnbExplorerBaseUrl}/${hash}`;
    }
    // Refund status
  } else {
    if (refundCurrency === CoinSymbol.BTC) {
      return `${btcExplorerBaseUrl}/${hash}`;
    } else if (bnbCurrencies.includes(refundCurrency)) {
      return `${bnbExplorerBaseUrl}/${hash}`;
    } else {
      return `${bnbExplorerBaseUrl}/${hash}`;
    }
  }
};
