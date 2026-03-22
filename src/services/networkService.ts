import { NetworkInfo as RNNetworkInfo } from 'react-native-network-info';
import WifiManager from 'react-native-wifi-reborn';
import { PermissionsAndroid, Platform } from 'react-native';
import { NetworkInfo } from '../types/device';

export const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location to scan Wi-Fi networks.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
};

export const getNetworkInfo = async (): Promise<NetworkInfo> => {
  const hasPermission = await requestLocationPermission();
  
  let ssid = null;
  if (hasPermission) {
    try {
      ssid = await WifiManager.getCurrentWifiSSID();
    } catch (e) {
      console.log('Error getting SSID', e);
    }
  }

  const ipAddress = await RNNetworkInfo.getIPAddress();
  const subnetMask = await RNNetworkInfo.getSubnet();
  const gateway = await RNNetworkInfo.getGatewayIPAddress();
  const dns1 = null; // RNNetworkInfo doesn't directly provide DNS in simple calls
  const dns2 = null;

  return {
    ssid,
    ipAddress,
    subnetMask,
    gateway,
    dns1,
    dns2,
  };
};
