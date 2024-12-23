export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  candidateId: {
    _id: string;
    name: string;
    email: string;
  } | string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  isAdmin?: boolean;
}

export interface SignupCredentials extends LoginCredentials {
  name: string;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ user: User; token: string }>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
} 