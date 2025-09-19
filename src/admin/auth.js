const bcrypt = require('bcryptjs');

const authenticate = async (email, password) => {
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@carebridge.com';
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'CareBridge2024!';
  
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return { 
      email: ADMIN_EMAIL, 
      role: 'admin',
      name: 'CareBridge Admin'
    };
  }
  return null;
};

module.exports = {
  authenticate,
  cookiePassword: process.env.COOKIE_SECRET || 'carebridge-admin-secret-key-2024'
};
