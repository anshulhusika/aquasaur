import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export interface User {
  userId: string;
  email: string;
}

export function getUserFromToken(): User | null {
  try {
    const token = cookies().get('token')?.value;
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as User;
    return decoded;
  } catch (error) {
    return null;
  }
}