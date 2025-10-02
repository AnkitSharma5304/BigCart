    import { NextResponse } from 'next/server';
    import { PrismaClient } from '@prisma/client';
    import bcrypt from 'bcryptjs';

    const prisma = new PrismaClient();

    export async function POST(request) {
      try {
        const { name, email, password } = await request.json();

        // 1. Validate input
        if (!name || !email || !password) {
          return NextResponse.json(
            { error: 'Name, email, and password are required' },
            { status: 400 }
          );
        }

        // 2. Check if user already exists
        const existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (existingUser) {
          return NextResponse.json(
            { error: 'User with this email already exists' },
            { status: 409 } // 409 Conflict
          );
        }

        // 3. Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds

        // 4. Create the new user in the database
        await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        });

        // 5. Respond with a success message
        return NextResponse.json(
          { message: 'User created successfully' },
          { status: 201 } // 201 Created
        );

      } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
          { error: 'An error occurred during registration' },
          { status: 500 }
        );
      }
    }
    
