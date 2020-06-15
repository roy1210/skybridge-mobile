import { calculateFixedFee } from "../calculateFixedFee";

const testArray = [
  {
    bridgeFeePercent: "0.1",
    currency: "BNB",
    minerFee: "500"
  },
  {
    bridgeFeePercent: "0.1",
    currency: "BTC.B",
    minerFee: "500"
  },
  {
    bridgeFeePercent: "0.1",
    currency: "BTCB",
    minerFee: "500"
  },
  {
    bridgeFeePercent: "0.1",
    currency: "BTC",
    minerFee: "30000"
  }
];

it("should returns correct FixedFee", () => {
  expect(calculateFixedFee("BTC", testArray)).toStrictEqual(0.0003);
  expect(calculateFixedFee("BTC.B", testArray)).toStrictEqual(0.000005);
});
