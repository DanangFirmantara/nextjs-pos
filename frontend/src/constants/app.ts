// src/constants/app.ts
export const APP_NAME = 'POS System';
export const APP_DESCRIPTION = 'Professional Point of Sale System';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
} as const;

export const DEMO_USERS = {
  USER: {
    email: 'user@example.com',
    password: 'anything',
    role: 'user',
  },
  ADMIN: {
    email: 'admin@example.com',
    password: 'anything',
    role: 'admin',
  },
} as const;
