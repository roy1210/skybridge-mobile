export const toSatoshi = (btcValue: string): number => {
  return Number(btcValue) * 100000000;
};
