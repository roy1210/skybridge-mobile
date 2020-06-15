export const qrValueBuilder = (
  addressIn: string,
  currencyIn: string,
  amountIn?: string
): string => {
  let qrValue = "";
  if (currencyIn === "BTC") {
    qrValue = `bitcoin:${addressIn}?amount=${amountIn}`;
  } else if (currencyIn === "BTC.B") {
    qrValue = `${addressIn}?amount=0`;
  }
  return qrValue;
};
