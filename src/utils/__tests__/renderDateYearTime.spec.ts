import { renderDateYearTime } from "./../renderDateYearTime";

// Test under Singapore time environment
it("should return Month Date Year - time", () => {
  expect(renderDateYearTime(1578194192)).toStrictEqual("JAN 5 2020 - 11:16");

  expect(renderDateYearTime(1)).toStrictEqual("JAN 1 1970 - 07:30");
});
