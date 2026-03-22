import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useDeviceStore } from '../store/deviceStore';
import { Device } from '../types/device';

const DevicesListScreen = ({ navigation }: any) => {
  const { devices } = useDeviceStore();

  const renderDeviceItem = ({ item }: { item: Device }) => (
    <TouchableOpacity 
      style={styles.deviceCard}
      onPress={() => navigation.navigate('DeviceDetails', { device: item })}
    >
      <View style={styles.deviceIcon}>
        <Text style={styles.iconText}>{item.deviceName[0]}</Text>
      </View>
      <View style={styles.deviceInfo}>
        <Text style={styles.deviceName}>{item.deviceName}</Text>
        <Text style={styles.deviceIp}>{item.ipAddress}</Text>
        <Text style={styles.deviceVendor}>{item.vendor}</Text>
      </View>
      <View style={[styles.statusBadge, item.status === 'online' ? styles.onlineBadge : styles.offlineBadge]}>
        <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.macAddress}
        renderItem={renderDeviceItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No devices discovered yet.</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Scan')}>
              <Text style={styles.emptyButton}>Start a Scan</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  listContent: {
    padding: 15,
  },
  deviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  deviceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A5568',
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  deviceIp: {
    fontSize: 14,
    color: '#718096',
    marginTop: 2,
  },
  deviceVendor: {
    fontSize: 12,
    color: '#A0AEC0',
    marginTop: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  onlineBadge: {
    backgroundColor: '#C6F6D5',
  },
  offlineBadge: {
    backgroundColor: '#FED7D7',
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#718096',
  },
  emptyButton: {
    fontSize: 16,
    color: '#4299E1',
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default DevicesListScreen;
