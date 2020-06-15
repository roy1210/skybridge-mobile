import { TxrefsArray, ITxrefs } from "./../state/ducks/explorer/types";

export const getLessUXTOConfirmationValue = (
  txrefsArray: TxrefsArray
): number => {
  let totalValue = 0;

  txrefsArray.forEach((txref: ITxrefs) => {
    if (txref.confirmations < 2) {
      totalValue = totalValue + txref.value;
    }
  });
  return totalValue;
};
