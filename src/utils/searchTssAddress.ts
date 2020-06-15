import { IDepositAddresses } from "./../state/ducks/swap/types";

export const searchTssAddress = (
  addresses: IDepositAddresses,
  currency: string
): string => {
  let tssAddress = "";
  try {
    addresses.forEach(address => {
      if (address.currency === currency) {
        tssAddress = address.address;
      }
    });
  } catch (err) {
    console.error(err);
  }
  return tssAddress;
};
