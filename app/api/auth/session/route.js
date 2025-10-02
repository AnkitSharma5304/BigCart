import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function GET(request) {
  try {
    // 1. Get the token from the server-side cookies
    const token = cookies().get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // 2. Verify the token using your JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. If valid, return the user's data from the token
    const user = { id: decoded.id, email: decoded.email, name: decoded.name };

    return NextResponse.json({ user });

  } catch (error) {
    // This will happen if the token is expired or invalid
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}