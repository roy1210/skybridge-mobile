import { toBTC } from "./../toBTC";

it("should return unit of BTC", () => {
  expect(toBTC("49836")).toStrictEqual(0.00049836);
});
