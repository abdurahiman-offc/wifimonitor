import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Device } from '../types/device';

const DeviceDetailsScreen = ({ route }: any) => {
  const { device }: { device: Device } = route.params;

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>{device.deviceName[0]}</Text>
          </View>
          <Text style={styles.deviceNameText}>{device.deviceName}</Text>
          <View style={[styles.statusBadge, device.status === 'online' ? styles.onlineBadge : styles.offlineBadge]}>
            <Text style={styles.statusText}>{device.status.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <InfoRow label="IP Address" value={device.ipAddress} />
        <InfoRow label="MAC Address" value={device.macAddress} />
        <InfoRow label="Vendor" value={device.vendor} />
        <InfoRow label="Wi-Fi Name" value={device.wifiName} />
        
        <View style={styles.divider} />
        
        <InfoRow label="First Seen" value={new Date(device.firstSeen).toLocaleString()} />
        <InfoRow label="Last Seen" value={new Date(device.lastSeen).toLocaleString()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 15,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A5568',
  },
  deviceNameText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  statusBadge: {
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  onlineBadge: {
    backgroundColor: '#C6F6D5',
  },
  offlineBadge: {
    backgroundColor: '#FED7D7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#2D3748',
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
    marginLeft: 20,
  },
});

export default DeviceDetailsScreen;
