/**
 * Calculates the IP range based on IP address and subnet mask.
 * Example: IP 192.168.1.15, Mask 255.255.255.0 -> Range 192.168.1.1 to 192.168.1.254
 */
export const generateIpRange = (ip: string, mask: string): string[] => {
  const ipParts = ip.split('.').map(Number);
  const maskParts = mask.split('.').map(Number);

  if (ipParts.length !== 4 || maskParts.length !== 4) {
    return [];
  }

  const networkParts = ipParts.map((part, i) => part & maskParts[i]);
  const broadcastParts = ipParts.map((part, i) => part | (255 - maskParts[i]));

  const start = ipToLong(networkParts) + 1;
  const end = ipToLong(broadcastParts) - 1;

  const range: string[] = [];
  for (let i = start; i <= end; i++) {
    range.push(longToIp(i));
  }

  return range;
};

const ipToLong = (ipParts: number[]): number => {
  return (
    (ipParts[0] << 24) |
    (ipParts[1] << 16) |
    (ipParts[2] << 8) |
    (ipParts[3] << 0)
  ) >>> 0;
};

const longToIp = (long: number): string => {
  return [
    (long >>> 24) & 0xff,
    (long >>> 16) & 0xff,
    (long >>> 8) & 0xff,
    long & 0xff,
  ].join('.');
};
