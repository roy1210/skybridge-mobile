import { calculateReceivingAmount } from "./../calculateReceivingAmount";

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

it("should returns estimated receiving amount", () => {
  expect(calculateReceivingAmount(1, "BTC", fees)).toStrictEqual(0.9987);
  expect(calculateReceivingAmount(1, "BTC.B", fees)).toStrictEqual(0.998995);
});
