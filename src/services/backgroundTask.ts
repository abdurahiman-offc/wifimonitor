import BackgroundFetch from 'react-native-background-fetch';
import { scanNetwork } from './scannerService';
import { getNetworkInfo } from './networkService';
import { generateIpRange } from '../utils/ipRange';
import { getDBConnection } from '../database';
import { addDeviceLog, updateDeviceStatus } from '../database/deviceDao';

export const initBackgroundFetch = async () => {
  const onEvent = async (taskId: string) => {
    console.log('[BackgroundFetch] event received:', taskId);

    try {
      const info = await getNetworkInfo();
      if (info.ipAddress && info.subnetMask) {
        const range = generateIpRange(info.ipAddress, info.subnetMask);
        const wifiName = info.ssid || 'Unknown Network';
        
        const discovered = await scanNetwork(range, wifiName, () => {});
        
        // Mark all discovered as online and log them
        const db = await getDBConnection();
        const now = new Date().toISOString();
        
        for (const device of discovered) {
          if (device.id) {
            await addDeviceLog(db, {
              deviceId: device.id,
              status: 'online',
              timestamp: now,
            });
          }
        }
      }
    } catch (e) {
      console.error('[BackgroundFetch] Error during background scan:', e);
    }

    BackgroundFetch.finish(taskId);
  };

  const onTimeout = async (taskId: string) => {
    console.warn('[BackgroundFetch] TIMEOUT:', taskId);
    BackgroundFetch.finish(taskId);
  };

  const status = await BackgroundFetch.configure(
    {
      minimumFetchInterval: 15, // minutes (minimum for Android/iOS)
      stopOnTerminate: false,
      enableHeadless: true,
      startOnBoot: true,
      requiredNetworkType: BackgroundFetch.NETWORK_TYPE_UNMETERED,
    },
    onEvent,
    onTimeout
  );

  console.log('[BackgroundFetch] configure status:', status);
};
