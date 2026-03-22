import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useDeviceStore } from '../store/deviceStore';

const NetworkInfoScreen = () => {
  const { networkInfo } = useDeviceStore();

  const InfoCard = ({ title, items }: { title: string; items: { label: string; value: string | null }[] }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {items.map((item, index) => (
        <View key={index} style={[styles.itemRow, index === items.length - 1 && styles.lastItem]}>
          <Text style={styles.itemLabel}>{item.label}</Text>
          <Text style={styles.itemValue}>{item.value || 'Not available'}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Network Details</Text>
      
      <InfoCard 
        title="Wi-Fi Connection"
        items={[
          { label: 'SSID', value: networkInfo?.ssid || 'Disconnected' },
          { label: 'Signal Strength', value: '-65 dBm (Mocked)' },
          { label: 'Link Speed', value: '150 Mbps (Mocked)' },
        ]}
      />

      <InfoCard 
        title="IP Configuration"
        items={[
          { label: 'IPv4 Address', value: networkInfo?.ipAddress || null },
          { label: 'Subnet Mask', value: networkInfo?.subnetMask || null },
          { label: 'Default Gateway', value: networkInfo?.gateway || null },
          { label: 'DNS 1', value: networkInfo?.dns1 || null },
          { label: 'DNS 2', value: networkInfo?.dns2 || null },
        ]}
      />

      <InfoCard 
        title="Device Properties"
        items={[
          { label: 'Manufacturer', value: 'Google (Pixel 6)' },
          { label: 'Android Version', value: '13' },
          { label: 'MAC Address', value: 'AA:BB:CC:DD:EE:FF' },
        ]}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 20,
    marginTop: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
    paddingBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F7FAFC',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemLabel: {
    fontSize: 14,
    color: '#718096',
  },
  itemValue: {
    fontSize: 14,
    color: '#2D3748',
    fontWeight: '500',
  },
});

export default NetworkInfoScreen;
