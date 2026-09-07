import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../config/db.js'

interface UserRow extends RowDataPacket {
    id?: number;
    email: string;
    username: string;
    password_hash: string;
}

export async function getUser(email: string) {
    const [rows] = await pool.query<UserRow[]>(
        'SELECT * FROM `users` WHERE email = ?;', [email]
    );

    if (!rows.length) return null;
    
    const { id, username, password_hash } = rows[0];
    return { id, email, username, password_hash };
}

export async function insertUser(email: string, username: string, passwordHash: string) {
    const [result] = await pool.query<ResultSetHeader>(
        'INSERT INTO `users` (email, username, password_hash) VALUES (?, ?, ?);', 
        [email, username, passwordHash]
    );

    return result.insertId;
}