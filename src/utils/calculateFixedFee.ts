import { IFetchFees } from "./../state/swap/types";
import { toBTC } from "./toBTC";
import { CoinSymbol } from "../data/constants";

// https://skybridge-docs.swingby.network/fees
export const calculateFixedFee = (
  currency: string,
  feeInfos: IFetchFees
): number => {
  let fixedFee = 0;
  if (currency === CoinSymbol.BTC_B_918) {
    currency = CoinSymbol.BTC_B;
  } else if (currency === CoinSymbol.BTC_B_888) {
    currency = CoinSymbol.BTC_B;
  }

  try {
    feeInfos.forEach((feeInfo) => {
      if (feeInfo.currency === currency) {
        fixedFee = toBTC(feeInfo.minerFee);
      }
    });
  } catch (err) {
    console.error(err);
  }
  return fixedFee;
};
