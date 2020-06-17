import { IFetchFees } from "./../state/swap/types";

export const calculateTransferFee = (
  currency: string,
  feeInfos: IFetchFees
): number => {
  let transferFee = 0;
  try {
    feeInfos &&
      feeInfos.forEach((feeInfo) => {
        if (feeInfo.currency === currency) {
          transferFee = Number(feeInfo.bridgeFeePercent);
        }
      });
  } catch (err) {
    console.error(err);
  }
  return transferFee;
};
