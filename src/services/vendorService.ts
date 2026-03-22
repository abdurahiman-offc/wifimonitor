import vendors from '../assets/vendor.json';

export const lookupVendor = (macAddress: string): string => {
  if (!macAddress) return 'Unknown';
  
  const prefix = macAddress.toUpperCase().substring(0, 8);
  return (vendors as Record<string, string>)[prefix] || 'Unknown Vendor';
};
