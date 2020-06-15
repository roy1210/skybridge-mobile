import { coinId } from "../coinId";
import { CoinSymbol } from "../../state/ducks/explorer/types";

it("should return svg file name of chosen coins", () => {
  expect(coinId(CoinSymbol.BTC)).toStrictEqual("BTC.svg");

  expect(coinId(CoinSymbol.BTC_S)).toStrictEqual("BTCS.svg");

  expect(coinId(CoinSymbol.BTC_B)).toStrictEqual("BTCS.svg");

  expect(coinId("DummyCoin")).toStrictEqual("");
});
