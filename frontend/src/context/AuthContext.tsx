'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cek authentication status saat component mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulasi API call ke backend
      // Pada production, ini akan call API real
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Validasi sederhana
      if (!email || !password) {
        throw new Error('Email dan password harus diisi');
      }

      if (!email.includes('@')) {
        throw new Error('Email tidak valid');
      }

      // Demo: Accept any email/password untuk testing
      const userData: User = {
        id: '1',
        email: email,
        name: email.split('@')[0],
        role: email === 'admin@example.com' ? 'admin' : 'user',
        avatar: null,
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: user !== null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
