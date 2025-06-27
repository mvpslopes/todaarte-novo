import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  register: (data: {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'client';
    company?: string;
  }) => Promise<{ success: boolean; message?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const initialMockUsers: User[] = [];

function getStoredUsers(): User[] {
  const stored = localStorage.getItem('todaarte_users');
  let users: User[] = stored ? JSON.parse(stored) : [];
  // Garante que todos os mockados estejam presentes
  initialMockUsers.forEach(mockUser => {
    if (!users.some(u => u.email === mockUser.email)) {
      users.push(mockUser);
    }
  });
  return users;
}
function setStoredUsers(users: User[]) {
  localStorage.setItem('todaarte_users', JSON.stringify(users));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>(getStoredUsers());

  useEffect(() => {
    // Check for stored user
    const storedUser = localStorage.getItem('todaarte_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setStoredUsers(users);
  }, [users]);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        setIsLoading(false);
        return false;
      }
      const data = await response.json();
      setUser(data.user);
      localStorage.setItem('todaarte_user', JSON.stringify(data.user));
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const register = async (data: {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'client';
    company?: string;
  }): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const exists = users.some(u => u.email === data.email);
    if (exists) {
      setIsLoading(false);
      return { success: false, message: 'E-mail já cadastrado.' };
    }
    const newUser: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      role: data.role,
      avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(data.name),
      ...(data.role === 'client' ? { company: data.company } : {})
    };
    setUsers(prev => [...prev, newUser]);
    setUser(newUser);
    localStorage.setItem('todaarte_user', JSON.stringify(newUser));
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('todaarte_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}