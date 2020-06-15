import { MAXIMUM_SWAP_AMOUNT } from "./../../data/constants";
import { CoinSymbol } from "./../../data/constants";
import {
  BTCMaximumAmountFailureMessage,
  BTC_BMaximumAmountFailureMessage,
  MinimumAmountFailureMessage,
} from "./../validator";
import * as validator from "../validator";

const validationSuccess = {
  isValid: true,
};
const validationFailure = {
  isValid: false,
  message: "Format is wrong.",
};
const minimumAmountFailure = {
  isValid: false,
  message: MinimumAmountFailureMessage,
};
const maximumBTCAmountFailure = {
  isValid: false,
  message: BTCMaximumAmountFailureMessage,
};
const maximumBTCBAmountFailure = {
  isValid: false,
  message: BTC_BMaximumAmountFailureMessage,
};

const isHalfWidthCharacterFailure = {
  isValid: false,
  message: "Format is not half-width characters",
};
const isNotContainStringFailure = {
  isValid: false,
  message: "Please enter number only",
};

it("isBitcoinAddress", () => {
  expect(
    validator.isBitcoinAddress("tb1q0fzppaflhcju7emf9sh5n5st3c47mwuczwxmt7")
  ).toStrictEqual(validationSuccess);

  expect(
    validator.isBitcoinAddress(
      "tb1q0fzppaflhcju7emf9sh5n5st3c47mwuczwxmt123456"
    )
  ).toStrictEqual(validationFailure);

  expect(validator.isBitcoinAddress("DummyAddress")).toStrictEqual(
    validationFailure
  );
  expect(
    validator.isBitcoinAddress("tbnb18y6ak4nvd7u89dsyu205jhwaguluxt9l7fklsz")
  ).toStrictEqual(validationFailure);
});

it("isBinanceAddress", () => {
  expect(
    // Memo: Roy's wallet address for debug using
    validator.isBinanceAddress("tbnb1lpq6tp2p72js9jjfk7ux8g2qjpm5udzpy4h7k5")
  ).toStrictEqual(validationSuccess);
  expect(
    validator.isBinanceAddress("tbnb18y6ak4nvd7u89dsyu205jhwaguluxt9l7fklsz")
  ).toStrictEqual(validationSuccess);
  expect(validator.isBinanceAddress("dummyAddress")).toStrictEqual(
    validationFailure
  );
  expect(
    validator.isBinanceAddress("tb1q0fzppaflhcju7emf9sh5n5st3c47mwuczwxmt")
  ).toStrictEqual(validationFailure);
});

it("isAddress", () => {
  expect(
    validator.isAddress("tbnb18y6ak4nvd7u89dsyu205jhwaguluxt9l7fklsz")
  ).toStrictEqual(true);
  expect(
    validator.isAddress("tb1q0fzppaflhcju7emf9sh5n5st3c47mwuczwxmt7")
  ).toStrictEqual(true);
  expect(
    validator.isAddress("m47N1Thc213QqfYCz3PZkjoJpNv5b14kBd")
  ).toStrictEqual(false);
  expect(
    validator.isAddress("147N1Thc213QqfYCz3PZkjoJpNv5b14kBd")
  ).toStrictEqual(false);
});

it("isValidAmount", () => {
  expect(validator.isValidAmount(50, CoinSymbol.BTC)).toStrictEqual(
    validationSuccess
  );
  expect(validator.isValidAmount(55.123, CoinSymbol.BTC)).toStrictEqual(
    validationSuccess
  );
  expect(validator.isValidAmount(-100, CoinSymbol.BTC)).toStrictEqual(
    minimumAmountFailure
  );
  expect(validator.isValidAmount(0.0001, CoinSymbol.BTC_B)).toStrictEqual(
    minimumAmountFailure
  );
  expect(validator.isValidAmount(600, CoinSymbol.BTC_B)).toStrictEqual(
    maximumBTCBAmountFailure
  );
  expect(validator.isValidAmount(600, CoinSymbol.BTC)).toStrictEqual(
    validationSuccess
  );
  expect(
    validator.isValidAmount(MAXIMUM_SWAP_AMOUNT.BTC + 1, CoinSymbol.BTC)
  ).toStrictEqual(maximumBTCAmountFailure);
  expect(validator.isValidAmount(0.0004, CoinSymbol.BTC)).toStrictEqual(
    validationSuccess
  );
});

it("isNotContainString", () => {
  expect(validator.isNotContainString("a10abc")).toStrictEqual(
    isNotContainStringFailure
  );
  expect(validator.isNotContainString("0.1!?")).toStrictEqual(
    isNotContainStringFailure
  );
  expect(validator.isNotContainString("0.01")).toStrictEqual(validationSuccess);
});

it("isHalfWidthAmount", () => {
  expect(validator.isHalfWidthCharacter("50.12")).toStrictEqual(
    validationSuccess
  );
  expect(validator.isHalfWidthCharacter("bdf123")).toStrictEqual(
    validationSuccess
  );
  expect(validator.isHalfWidthCharacter("ｂｄｆ１２３")).toStrictEqual(
    isHalfWidthCharacterFailure
  );
  expect(validator.isHalfWidthCharacter("１２３")).toStrictEqual(
    isHalfWidthCharacterFailure
  );
  expect(validator.isHalfWidthCharacter(String("１２３"))).toStrictEqual(
    isHalfWidthCharacterFailure
  );
});
