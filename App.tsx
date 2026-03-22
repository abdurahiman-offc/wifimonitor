import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { getDBConnection, createTables } from './src/database';
import { useDeviceStore } from './src/store/deviceStore';
import { getNetworkInfo } from './src/services/networkService';
import { getDevices } from './src/database/deviceDao';
import { StatusBar } from 'react-native';
import { initBackgroundFetch } from './src/services/backgroundTask';

const App = () => {
  const { setNetworkInfo, setDevices } = useDeviceStore();

  useEffect(() => {
    const initApp = async () => {
      try {
        const db = await getDBConnection();
        await createTables(db);
        
        const storedDevices = await getDevices(db);
        setDevices(storedDevices);
        
        const info = await getNetworkInfo();
        setNetworkInfo(info);
        
        await initBackgroundFetch();
      } catch (error) {
        console.error('App initialization error:', error);
      }
    };

    initApp();
  }, [setDevices, setNetworkInfo]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <AppNavigator />
    </>
  );
};

export default App;
