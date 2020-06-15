import { searchTssAddress } from "../searchTssAddress";

const testArray = [
  {
    address: "mywi9FiG8ejMtvE2V8tNBRhvBD1CD2kUie",
    currency: "BTC"
  },
  {
    address: "tbnb1egsdny4jd4snznpsef0c0g9h7y8hqp9gsfmg34",
    currency: "BNB"
  },
  {
    address: "tbnb1egsdny4jd4snznpsef0c0g9h7y8hqp9gsfmg34",
    currency: "BTC.B"
  },
  {
    address: "tbnb1egsdny4jd4snznpsef0c0g9h7y8hqp9gsfmg34",
    currency: "BTCB"
  }
];

it("should returns correct TSS address", () => {
  expect(searchTssAddress(testArray, "BTC.B")).toStrictEqual(
    "tbnb1egsdny4jd4snznpsef0c0g9h7y8hqp9gsfmg34"
  );
  expect(searchTssAddress(testArray, "BTC")).toStrictEqual(
    "mywi9FiG8ejMtvE2V8tNBRhvBD1CD2kUie"
  );
});
