declare module 'react-native-ping' {
  export interface PingOptions {
    timeout?: number;
  }
  export default class Ping {
    static start(ip: string, options?: PingOptions): Promise<number | undefined>;
  }
}

declare module 'react-native-wifi-reborn' {
  export default class WifiManager {
    static getCurrentWifiSSID(): Promise<string>;
  }
}

declare module 'react-native-network-info' {
  export const NetworkInfo: {
    getSSID(): Promise<string | null>;
    getIPAddress(): Promise<string | null>;
    getSubnet(): Promise<string | null>;
    getGatewayIPAddress(): Promise<string | null>;
  };
}
