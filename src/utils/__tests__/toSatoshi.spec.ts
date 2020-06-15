import { toSatoshi } from "../toSatoshi";

it("should return unit of satoshi", () => {
  expect(toSatoshi("0.00049836")).toStrictEqual(49836);
});
