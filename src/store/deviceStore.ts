import { create } from 'zustand';
import { Device, NetworkInfo, ScanProgress } from '../types/device';

interface DeviceState {
  devices: Device[];
  networkInfo: NetworkInfo | null;
  scanProgress: ScanProgress;
  isScanning: boolean;
  
  setDevices: (devices: Device[]) => void;
  updateDevice: (device: Device) => void;
  setNetworkInfo: (info: NetworkInfo) => void;
  setScanProgress: (progress: ScanProgress) => void;
  setScanning: (isScanning: boolean) => void;
}

export const useDeviceStore = create<DeviceState>((set) => ({
  devices: [],
  networkInfo: null,
  scanProgress: {
    total: 0,
    current: 0,
    percentage: 0,
    isScanning: false,
  },
  isScanning: false,

  setDevices: (devices) => set({ devices }),
  
  updateDevice: (device) => set((state) => {
    const index = state.devices.findIndex((d) => d.macAddress === device.macAddress);
    if (index !== -1) {
      const newDevices = [...state.devices];
      newDevices[index] = { ...newDevices[index], ...device };
      return { devices: newDevices };
    } else {
      return { devices: [device, ...state.devices] };
    }
  }),

  setNetworkInfo: (networkInfo) => set({ networkInfo }),
  
  setScanProgress: (scanProgress) => set({ scanProgress }),
  
  setScanning: (isScanning) => set({ isScanning }),
}));
