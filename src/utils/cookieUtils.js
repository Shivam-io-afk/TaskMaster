/**
 * Utility functions for handling authentication cookies using js-cookie library
 */
import Cookies from 'js-cookie';

/**
 * Set an authentication cookie with expiration time
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {number} minutes - Minutes until cookie expires
 */
export const setCookie = (name, value, minutes) => {
  Cookies.set(name, value, { expires: minutes / 1440 }); // Convert minutes to days (js-cookie uses days)
};

/**
 * Get a cookie value by name
 * @param {string} name - Cookie name
 * @returns {string|undefined} - Cookie value or undefined if not found
 */
export const getCookie = (name) => {
  return Cookies.get(name);
};

/**
 * Delete a cookie by name
 * @param {string} name - Cookie name
 */
export const deleteCookie = (name) => {
  Cookies.remove(name);
};

/**
 * Refresh the authentication cookie
 * @param {string} name - Cookie name
 * @param {number} minutes - Minutes until cookie expires
 */
export const refreshAuthCookie = (name, minutes) => {
  const value = getCookie(name);
  if (value) {
    setCookie(name, value, minutes);
  }
};