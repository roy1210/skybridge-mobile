import { getLessUXTOConfirmationValue } from "./../getLessUXTOConfirmationValue";

const mockData = [
  {
    tx_hash: "db47ec1a6c977e77900bb25a858df94586da46a5b94c9739eaf129fda43909c2",
    block_height: 1668475,
    tx_input_n: 4,
    tx_output_n: -1,
    value: 10000,
    ref_balance: 97295458366,
    confirmations: 1,
    confirmed: "2020-03-07T03:39:28Z",
    double_spend: false
  },
  {
    tx_hash: "db47ec1a6c977e77900bb25a858df94586da46a5b94c9739eaf129fda43909c2",
    block_height: 1668475,
    tx_input_n: 3,
    tx_output_n: -1,
    value: 10000,
    ref_balance: 97389452583,
    confirmations: 1,
    confirmed: "2020-03-07T03:39:28Z",
    double_spend: false
  },
  {
    tx_hash: "db47ec1a6c977e77900bb25a858df94586da46a5b94c9739eaf129fda43909c2",
    block_height: 1668475,
    tx_input_n: 2,
    tx_output_n: -1,
    value: 532999940,
    ref_balance: 147389451998,
    confirmations: 2,
    confirmed: "2020-03-07T03:39:28Z",
    double_spend: false
  }
];

it("should return correct value amount", () => {
  expect(getLessUXTOConfirmationValue(mockData)).toStrictEqual(20000);
});
