export const toSatoshi = (btcValue: string): number => {
  return Math.round(Number(btcValue) * 100000000);
};
