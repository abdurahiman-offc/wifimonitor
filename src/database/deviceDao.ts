import { SQLiteDatabase } from 'react-native-sqlite-storage';
import { Device, DeviceLog } from '../types/device';

export const saveDevice = async (db: SQLiteDatabase, device: Device) => {
  const insertQuery = `
    INSERT OR REPLACE INTO devices (
      device_name, ip_address, mac_address, vendor, wifi_name, status, first_seen, last_seen
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    device.deviceName,
    device.ipAddress,
    device.macAddress,
    device.vendor,
    device.wifiName,
    device.status,
    device.firstSeen,
    device.lastSeen,
  ];

  try {
    return await db.executeSql(insertQuery, values);
  } catch (error) {
    console.error('Error saving device:', error);
    throw Error('Failed to save device');
  }
};

export const getDevices = async (db: SQLiteDatabase): Promise<Device[]> => {
  try {
    const devices: Device[] = [];
    const results = await db.executeSql('SELECT * FROM devices ORDER BY last_seen DESC');
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        const row = result.rows.item(index);
        devices.push({
          id: row.id,
          deviceName: row.device_name,
          ipAddress: row.ip_address,
          macAddress: row.mac_address,
          vendor: row.vendor,
          wifiName: row.wifi_name,
          status: row.status,
          firstSeen: row.first_seen,
          lastSeen: row.last_seen,
        });
      }
    });
    return devices;
  } catch (error) {
    console.error('Error getting devices:', error);
    throw Error('Failed to get devices');
  }
};

export const updateDeviceStatus = async (
  db: SQLiteDatabase,
  macAddress: string,
  status: 'online' | 'offline',
  lastSeen: string
) => {
  const updateQuery = `UPDATE devices SET status = ?, last_seen = ? WHERE mac_address = ?`;
  try {
    return await db.executeSql(updateQuery, [status, lastSeen, macAddress]);
  } catch (error) {
    console.error('Error updating device status:', error);
    throw Error('Failed to update status');
  }
};

export const addDeviceLog = async (db: SQLiteDatabase, log: DeviceLog) => {
  const insertQuery = `INSERT INTO device_logs (device_id, status, timestamp) VALUES (?, ?, ?)`;
  try {
    return await db.executeSql(insertQuery, [log.deviceId, log.status, log.timestamp]);
  } catch (error) {
    console.error('Error adding device log:', error);
    throw Error('Failed to add log');
  }
};
