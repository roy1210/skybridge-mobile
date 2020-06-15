import { MAXIMUM_SWAP_AMOUNT, MINIMUM_SWAP_AMOUNT } from "./../data/constants";
import { CoinSymbol } from "./../data/constants";
// import { isProduction } from "./isProduction";

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

// https://github.com/ruigomeseu/bitcoin-address-validation
export const FormatIsWrongMessage = "Format is wrong.";
export const isBitcoinAddress = (address: string): ValidationResult => {
  if (/^(tb1|bc1)[a-zA-HJ-NP-Z0-9]{25,39}$/.test(address)) {
    return { isValid: true };
  }
  return { isValid: false, message: FormatIsWrongMessage };
};

// Todo: need to modify if not using testnet.
export const isBinanceAddress = (address: string): ValidationResult => {
  // const hrp = isProduction() ? "bnb" : "tbnb";
  // const hrp = "tbnb";
  // if (crypto.checkAddress(address, hrp)) {
  if (/^(bnb|tbnb)[a-zA-HJ-NP-Z0-9]{25,39}$/.test(address)) {
    return { isValid: true };
  }

  return { isValid: false, message: FormatIsWrongMessage };
};

export const isAddress = (address: string): boolean => {
  if (isBitcoinAddress(address).isValid) {
    return true;
  } else if (isBinanceAddress(address).isValid) {
    return true;
  }
  return false;
};

export const BTCMaximumAmountFailureMessage = `Maximum swap is ${MAXIMUM_SWAP_AMOUNT.BTC}`;
export const BTC_BMaximumAmountFailureMessage = `Maximum swap is ${MAXIMUM_SWAP_AMOUNT.BTC_B}`;
export const MinimumAmountFailureMessage = `Minimum swap is ${MINIMUM_SWAP_AMOUNT}`;

export const isValidAmount = (
  amount: number,
  currency: string
): ValidationResult => {
  const minimumSwapAmount = MINIMUM_SWAP_AMOUNT;
  const maximumSwapAmount =
    currency === CoinSymbol.BTC
      ? MAXIMUM_SWAP_AMOUNT.BTC
      : MAXIMUM_SWAP_AMOUNT.BTC_B;

  if (amount >= minimumSwapAmount && amount <= maximumSwapAmount) {
    return {
      isValid: true,
    };
  } else if (currency === CoinSymbol.BTC && amount > maximumSwapAmount) {
    return {
      isValid: false,
      message: BTCMaximumAmountFailureMessage,
    };
  } else if (currency === CoinSymbol.BTC_B && amount > maximumSwapAmount) {
    return {
      isValid: false,
      message: BTC_BMaximumAmountFailureMessage,
    };
  } else {
    return {
      isValid: false,
      message: MinimumAmountFailureMessage,
    };
  }
};

export const isHalfWidthCharacterFailureMessage =
  "Format is not half-width characters";
export const isHalfWidthCharacter = (value: string): ValidationResult => {
  if (/^[.0-9a-zA-Z]*$/.test(value)) {
    return { isValid: true };
  }
  return { isValid: false, message: isHalfWidthCharacterFailureMessage };
};

export const isNotContainStringFailureMessage = "Please enter number only";
export const isNotContainString = (value: string): ValidationResult => {
  const valueArray = value.split("");

  for (const value of valueArray) {
    if (/^[^.0-9]*$/.test(value)) {
      return { isValid: false, message: isNotContainStringFailureMessage };
    }
  }
  return { isValid: true };
};
