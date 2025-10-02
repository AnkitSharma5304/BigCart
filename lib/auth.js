import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

/**
 * Hash a password using bcrypt
 * @param {string} password - The plain text password to hash
 * @returns {Promise<string>} - The hashed password
 */
export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Compare a plain text password with a hashed password
 * @param {string} password - The plain text password
 * @param {string} hashedPassword - The hashed password to compare against
 * @returns {Promise<boolean>} - True if passwords match, false otherwise
 */
export async function comparePasswords(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Generate a JWT token for a user
 * @param {object} user - The user object to generate a token for
 * @returns {string} - The JWT token
 */
export function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name
  };
  
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

/**
 * Verify a JWT token
 * @param {string} token - The token to verify
 * @returns {object|null} - The decoded token payload or null if invalid
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

/**
 * Find a user by email
 * @param {string} email - The email to search for
 * @returns {Promise<object|null>} - The user object or null if not found
 */
export async function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email }
  });
}

/**
 * Find a user by ID
 * @param {string} id - The user ID to search for
 * @returns {Promise<object|null>} - The user object or null if not found
 */
export async function findUserById(id) {
  return prisma.user.findUnique({
    where: { id }
  });
}