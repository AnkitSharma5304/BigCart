import { cookies } from 'next/headers';

// Cookie options
const defaultOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60, // 7 days
  path: '/',
};

/**
 * Set a cookie with the given name, value, and options
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {object} options - Cookie options
 */
export function setCookie(name, value, options = {}) {
  const cookieStore = cookies();
  cookieStore.set(name, value, { ...defaultOptions, ...options });
}

/**
 * Get a cookie by name
 * @param {string} name - Cookie name
 * @returns {string|undefined} - Cookie value or undefined if not found
 */
export function getCookie(name) {
  const cookieStore = cookies();
  const cookie = cookieStore.get(name);
  return cookie?.value;
}

/**
 * Delete a cookie by name
 * @param {string} name - Cookie name
 */
export function deleteCookie(name) {
  const cookieStore = cookies();
  cookieStore.delete(name);
}

/**
 * Set authentication cookies
 * @param {string} token - JWT token
 * @param {object} user - User object
 */
export function setAuthCookies(token, user) {
  setCookie('token', token);
  setCookie('user', JSON.stringify(user));
}

/**
 * Clear authentication cookies
 */
export function clearAuthCookies() {
  deleteCookie('token');
  deleteCookie('user');
}