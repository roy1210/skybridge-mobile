export const toBTC = (satoshiValue: string): number => {
  return Number(satoshiValue) / 100000000;
};
