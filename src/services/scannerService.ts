import Ping from 'react-native-ping';
import { getMacFromArpTable } from './arpService';
import { lookupVendor } from './vendorService';
import { Device, ScanProgress } from '../types/device';
import { saveDevice, updateDeviceStatus, getDevices } from '../database/deviceDao';
import { getDBConnection } from '../database';

export const scanIp = async (ip: string, timeout: number = 1000): Promise<boolean> => {
  try {
    const ms = await Ping.start(ip, { timeout });
    return ms !== undefined;
  } catch (e) {
    return false;
  }
};

export const scanNetwork = async (
  ipRange: string[],
  wifiName: string,
  onProgress: (progress: ScanProgress) => void
): Promise<Device[]> => {
  const db = await getDBConnection();
  const foundDevices: Device[] = [];
  const total = ipRange.length;

  for (let i = 0; i < total; i++) {
    const ip = ipRange[i];
    const isOnline = await scanIp(ip);
    
    if (isOnline) {
      const mac = await getMacFromArpTable(ip);
      if (mac) {
        const vendor = lookupVendor(mac);
        
        // Check if device already exists in DB
        const allDevices = await getDevices(db);
        const existingDevice = allDevices.find((d: Device) => d.macAddress === mac);
        
        const device: Device = {
          deviceName: existingDevice ? existingDevice.deviceName : 'New Device Detected',
          ipAddress: ip,
          macAddress: mac,
          vendor,
          wifiName,
          status: 'online',
          firstSeen: existingDevice ? existingDevice.firstSeen : new Date().toISOString(),
          lastSeen: new Date().toISOString(),
        };
        
        await saveDevice(db, device);
        foundDevices.push(device);
        
        if (!existingDevice) {
          console.warn(`[Scanner] New device detected: ${mac} (${ip})`);
          // Here we could trigger a local notification
        }
      }
    }

    onProgress({
      total,
      current: i + 1,
      percentage: Math.round(((i + 1) / total) * 100),
      isScanning: i + 1 < total,
    });
  }

  // Optional: Mark devices not found in this scan as offline
  // This would require getting all devices for this WiFi from DB first
  
  return foundDevices;
};
