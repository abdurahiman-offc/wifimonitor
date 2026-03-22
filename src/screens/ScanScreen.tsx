import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ProgressBarAndroid, ActivityIndicator, Platform } from 'react-native';
import { useDeviceStore } from '../store/deviceStore';
import { scanNetwork } from '../services/scannerService';
import { generateIpRange } from '../utils/ipRange';

const ScanScreen = ({ navigation }: any) => {
  const { networkInfo, setScanProgress, scanProgress, isScanning, setScanning, setDevices } = useDeviceStore();

  const startScan = async () => {
    if (!networkInfo?.ipAddress || !networkInfo?.subnetMask) return;
    
    setScanning(true);
    const range = generateIpRange(networkInfo.ipAddress, networkInfo.subnetMask);
    
    const wifiName = networkInfo.ssid || 'Unknown Network';
    
    try {
      const discovered = await scanNetwork(range, wifiName, (progress) => {
        setScanProgress(progress);
      });
      setDevices(discovered);
    } catch (e) {
      console.error('Scan failed', e);
    } finally {
      setScanning(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Network Scanner</Text>
      <Text style={styles.subtitle}>
        Scanning all IPs in the {networkInfo?.ssid || 'connected'} network.
      </Text>

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {isScanning ? `Scanning IP: ${scanProgress.current} / ${scanProgress.total}` : 'Ready to Scan'}
        </Text>
        
        {/* Simplified progress bar for cross-platform or demonstration */}
        <View style={styles.barBackground}>
          <View style={[styles.barForeground, { width: `${scanProgress.percentage}%` }]} />
        </View>
        
        <Text style={styles.percentageText}>{scanProgress.percentage}%</Text>
      </View>

      {isScanning ? (
        <View style={styles.scanningIndicator}>
          <ActivityIndicator size="large" color="#4299E1" />
          <Text style={styles.indicatorText}>Please wait while we discover devices...</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.scanButton} onPress={startScan}>
          <Text style={styles.scanButtonText}>
            {scanProgress.percentage > 0 ? 'Rescan Network' : 'Start Scan'}
          </Text>
        </TouchableOpacity>
      )}

      {!isScanning && scanProgress.percentage === 100 && (
        <TouchableOpacity 
          style={styles.doneButton} 
          onPress={() => navigation.navigate('DevicesList')}
        >
          <Text style={styles.doneButtonText}>View Results</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 40,
  },
  progressContainer: {
    width: '100%',
    marginBottom: 40,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 15,
  },
  barBackground: {
    width: '100%',
    height: 12,
    backgroundColor: '#E2E8F0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  barForeground: {
    height: '100%',
    backgroundColor: '#4299E1',
  },
  percentageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginTop: 10,
  },
  scanningIndicator: {
    alignItems: 'center',
  },
  indicatorText: {
    marginTop: 15,
    color: '#718096',
    fontSize: 14,
  },
  scanButton: {
    backgroundColor: '#4299E1',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 12,
    elevation: 3,
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  doneButton: {
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  doneButtonText: {
    color: '#4299E1',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ScanScreen;
