import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useDeviceStore } from '../store/deviceStore';
import { getNetworkInfo } from '../services/networkService';

const DashboardScreen = ({ navigation }: any) => {
  const { networkInfo, setNetworkInfo, devices } = useDeviceStore();

  useEffect(() => {
    const fetchInfo = async () => {
      const info = await getNetworkInfo();
      setNetworkInfo(info);
    };
    fetchInfo();
  }, [setNetworkInfo]);

  const onlineCount = devices.filter(d => d.status === 'online').length;
  const offlineCount = devices.filter(d => d.status === 'offline').length;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Network Dashboard</Text>
        <Text style={styles.subtitle}>{networkInfo?.ssid || 'Not Connected'}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{devices.length}</Text>
          <Text style={styles.statLabel}>Total Devices</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: '#4CAF50' }]}>{onlineCount}</Text>
          <Text style={styles.statLabel}>Online</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: '#F44336' }]}>{offlineCount}</Text>
          <Text style={styles.statLabel}>Offline</Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Current Connection</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoKey}>IP Address:</Text>
          <Text style={styles.infoValue}>{networkInfo?.ipAddress || '---'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoKey}>Gateway:</Text>
          <Text style={styles.infoValue}>{networkInfo?.gateway || '---'}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.scanButton}
        onPress={() => navigation.navigate('Scan')}
      >
        <Text style={styles.scanButtonText}>Start Network Scan</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.viewDevicesButton}
        onPress={() => navigation.navigate('DevicesList')}
      >
        <Text style={styles.viewDevicesButtonText}>View Discovered Devices</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  header: {
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A202C',
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    width: '30%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  statLabel: {
    fontSize: 12,
    color: '#A0AEC0',
    marginTop: 4,
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  infoKey: {
    color: '#718096',
    fontSize: 14,
  },
  infoValue: {
    color: '#2D3748',
    fontWeight: '500',
    fontSize: 14,
  },
  scanButton: {
    backgroundColor: '#4299E1',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 4,
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewDevicesButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#4299E1',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  viewDevicesButtonText: {
    color: '#4299E1',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DashboardScreen;
