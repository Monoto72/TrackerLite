import type { Request, Response } from 'express';
import * as userService from '../services/authService.js';

interface UserBody {
    id: number;
    email: string;
    username: string;
    created_at: number;
}

interface CreateUserBody extends Pick<UserBody, 'email' | 'username'> {
    password: string;
}

interface LoginBody extends Pick<UserBody, 'email'> {
    password: string;
}

interface UpdateUserBody extends Partial<Omit<UserBody, 'id' | 'created_at'>> {}

export async function createUser(
    req: Request<{}, {}, CreateUserBody>, 
    res: Response
) {
    try {
        const { email, username, password } = req.body;
        const user = await userService.register(email, username, password);
        res.status(201).json(user);
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        res.status(400).json({ error: message });
    }
}

export async function loginUser(
    req: Request<{}, {}, LoginBody>, 
    res: Response
) {
    try {
        const { email, password } = req.body;
        const user = await userService.verify(email, password);

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password'})
        }

        const { password_hash, ...safeUser } = user;
        res.status(200).json(safeUser);
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        res.status(400).json({ error: message });
    }
}