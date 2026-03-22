import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DashboardScreen from '../screens/DashboardScreen';
import DevicesListScreen from '../screens/DevicesListScreen';
import DeviceDetailsScreen from '../screens/DeviceDetailsScreen';
import ScanScreen from '../screens/ScanScreen';
import NetworkInfoScreen from '../screens/NetworkInfoScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Dashboard"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FFFFFF',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#2D3748',
          },
          headerTintColor: '#4299E1',
        }}
      >
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen} 
          options={{ title: 'Wi-Fi Monitor' }}
        />
        <Stack.Screen 
          name="DevicesList" 
          component={DevicesListScreen} 
          options={{ title: 'Discovered Devices' }}
        />
        <Stack.Screen 
          name="DeviceDetails" 
          component={DeviceDetailsScreen} 
          options={{ title: 'Device Info' }}
        />
        <Stack.Screen 
          name="Scan" 
          component={ScanScreen} 
          options={{ title: 'Network Scan' }}
        />
        <Stack.Screen 
          name="NetworkInfo" 
          component={NetworkInfoScreen} 
          options={{ title: 'Network Setup' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
