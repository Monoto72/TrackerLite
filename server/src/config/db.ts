import '../utils/loadEnv.js';
import { logger } from '../app.js';
import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

const INIT_QUERIES = [
    `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        username VARCHAR(20) NOT NULL UNIQUE,
        password_hash VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
]

export async function testConnection() {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
}

export async function initializeDatbase() {
    await Promise.all(INIT_QUERIES.map(query => pool.query(query)));
    logger.info('Database tables are verified and ready');
}