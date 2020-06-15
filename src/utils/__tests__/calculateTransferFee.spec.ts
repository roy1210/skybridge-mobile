import { calculateTransferFee } from "./../calculateTransferFee";

const fees = [
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
  expect(calculateTransferFee("BTC", fees)).toStrictEqual(0.1);
});
