import { IFetchFees } from "./../state/swap/types";
import { calculateFixedFee } from "./calculateFixedFee";
import { calculateTransferFee } from "./calculateTransferFee";

export const calculateReceivingAmount = (
  receivingBalance: number,
  receivingCurrency: string,
  feeInfos: IFetchFees
): number => {
  const fixedFee = calculateFixedFee(receivingCurrency, feeInfos);
  const transactionFeePercent = calculateTransferFee(
    receivingCurrency,
    feeInfos
  );
  const transactionFee = (receivingBalance * transactionFeePercent) / 100;

  return Number((receivingBalance - fixedFee - transactionFee).toFixed(7));
};
