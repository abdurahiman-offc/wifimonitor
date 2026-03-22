import RNFS from 'react-native-fs';
import { Platform } from 'react-native';

export const getMacFromArpTable = async (ipAddress: string): Promise<string | null> => {
  if (Platform.OS !== 'android') return null;

  try {
    const arpTable = await RNFS.readFile('/proc/net/arp', 'utf8');
    const lines = arpTable.split('\n');
    
    // Skip header line
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const columns = line.split(/\s+/);
      if (columns.length >= 4) {
        const ip = columns[0];
        const mac = columns[3];
        
        if (ip === ipAddress && mac !== '00:00:00:00:00:00') {
          return mac.toUpperCase();
        }
      }
    }
  } catch (error) {
    console.error('Error reading ARP table:', error);
  }
  
  return null;
};

export const getAllArpEntries = async (): Promise<Record<string, string>> => {
  const entries: Record<string, string> = {};
  if (Platform.OS !== 'android') return entries;

  try {
    const arpTable = await RNFS.readFile('/proc/net/arp', 'utf8');
    const lines = arpTable.split('\n');
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const columns = line.split(/\s+/);
      if (columns.length >= 4) {
        const ip = columns[0];
        const mac = columns[3];
        if (mac !== '00:00:00:00:00:00') {
          entries[ip] = mac.toUpperCase();
        }
      }
    }
  } catch (error) {
    console.error('Error reading ARP table:', error);
  }
  
  return entries;
};
