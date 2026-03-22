import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const database_name = 'WiFiMonitor.db';

export const getDBConnection = async () => {
  return SQLite.openDatabase({ name: database_name, location: 'default' });
};

export const createTables = async (db: SQLite.SQLiteDatabase) => {
  // Devices table
  const devicesQuery = `
    CREATE TABLE IF NOT EXISTS devices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      device_name TEXT,
      ip_address TEXT,
      mac_address TEXT UNIQUE,
      vendor TEXT,
      wifi_name TEXT,
      status TEXT,
      first_seen TEXT,
      last_seen TEXT
    );
  `;

  // Device logs table
  const logsQuery = `
    CREATE TABLE IF NOT EXISTS device_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      device_id INTEGER,
      status TEXT,
      timestamp TEXT,
      FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE
    );
  `;

  try {
    await db.executeSql(devicesQuery);
    await db.executeSql(logsQuery);
  } catch (error) {
    console.error('Error creating tables:', error);
    throw Error('Failed to create tables');
  }
};
