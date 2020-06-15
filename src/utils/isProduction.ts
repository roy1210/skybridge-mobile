export const isProduction = (): boolean => {
  // const defaultNetwork = (process.env.NODE_ENV === "production") ? "mainnet" : "testnet"
  const defaultNetwork = "testnet";
  const network = localStorage.getItem("network") || defaultNetwork;
  return network === "mainnet";
  // const params = queryString.parse(window.location.search);
  // const env = params.env || process.env.NODE_ENV;
  // return env === "production";
};
