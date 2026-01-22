import mysql from 'mysql2/promise';

// Konfigurasi koneksi MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'laukpedia',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function query(sql: string, params?: any[]) {
  const connection = await pool.getConnection();
  try {
    const [results] = await connection.execute(sql, params || []);
    return results;
  } finally {
    connection.release();
  }
}

export async function getConnection() {
  return await pool.getConnection();
}

export default pool;
