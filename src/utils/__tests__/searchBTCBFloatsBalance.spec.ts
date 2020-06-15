import { CoinSymbol } from "./../../state/ducks/explorer/types";
import { searchBTCBFloatsBalance } from "./../searchBTCBFloatsBalance";
const mockData = [
  {
    free: "46.93550000",
    frozen: "0.00000000",
    locked: "0.00000000",
    symbol: "BNB"
  },
  {
    free: "50000.00000000",
    frozen: "0.00000000",
    locked: "0.00000000",
    symbol: "BTC.B-888"
  },
  {
    free: "523.81395681",
    frozen: "0.00000000",
    locked: "0.00000000",
    symbol: "BTC.B-918"
  }
];

it("should returns free amount", () => {
  expect(searchBTCBFloatsBalance(mockData, CoinSymbol.BTC_B_918)).toStrictEqual(
    "523.81"
  );
  expect(searchBTCBFloatsBalance(mockData, CoinSymbol.BTC_B_888)).toStrictEqual(
    "50,000.00"
  );
  expect(searchBTCBFloatsBalance(mockData, CoinSymbol.BNB)).toStrictEqual(
    "46.94"
  );
});
