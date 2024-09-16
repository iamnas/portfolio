
/**
 * Trims an Ethereum address for display purposes.
 * @param {string} address - The full Ethereum address.
 * @returns {string} - The trimmed Ethereum address.
 */
export const trimAddress = (address: string): string => {
  if (!address) return "";

  // Ensure address is a string
  const addressStr = String(address);

  // Return a shortened version of the address
  return `${addressStr.slice(0, 6)}...${addressStr.slice(-4)}`;
};
