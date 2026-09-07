import * as bcrypt from 'bcrypt';
import { getUser, insertUser } from '../models/userModel.js'

export async function register(email: string, username: string, plainPassword: string) {
    const exist = await getUser(email);
    if (exist) throw new Error('Email in use');

    const password_hash = await bcrypt.hash(plainPassword, 10);
    // Check for race condition two simultaneous email sign_ups
    try {
        const id = await insertUser(email, username, password_hash);
        return { id, email, username };
    } catch (err: any) {
        if (err.code === 'ER_DUP_ENTRY') throw new Error('Email in use')
        throw err;
    }
}

export async function verify(email: string, plainPassword: string) {
    const user = await getUser(email);
    if (!user) return null;

    const valid = await bcrypt.compare(plainPassword, user.password_hash);
    return valid ? user : null;
}
