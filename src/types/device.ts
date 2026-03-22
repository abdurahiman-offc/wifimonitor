export interface Device {
  id?: number;
  deviceName: string;
  ipAddress: string;
  macAddress: string;
  vendor: string;
  wifiName: string;
  status: 'online' | 'offline';
  firstSeen: string; // ISO timestamp
  lastSeen: string; // ISO timestamp
}

export interface DeviceLog {
  id?: number;
  deviceId: number;
  status: 'online' | 'offline';
  timestamp: string; // ISO timestamp
}

export interface NetworkInfo {
  ssid: string | null;
  ipAddress: string | null;
  subnetMask: string | null;
  gateway: string | null;
  dns1: string | null;
  dns2: string | null;
}

export interface ScanProgress {
  total: number;
  current: number;
  percentage: number;
  isScanning: boolean;
}
