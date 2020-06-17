import { addComma } from "./addComma";
import {
  IFloatsBalance,
  FloatBalanceArray,
} from "../state/ducks/explorer/types";

export const searchBTCBFloatsBalance = (
  floatBalanceArray: FloatBalanceArray,
  currency: string
): string => {
  const filteredFloatsInfoArray = floatBalanceArray.filter(
    (info: IFloatsBalance) => {
      return info.symbol === currency;
    }
  );

  const floatBalance = Number(filteredFloatsInfoArray[0].free);

  return addComma(floatBalance, 2);
};
