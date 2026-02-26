export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  avatar?: string | null;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
