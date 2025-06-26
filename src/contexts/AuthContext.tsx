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
const initialMockUsers: User[] = [
  {
    id: '1',
    name: 'Admin Toda Arte',
    email: 'admin@todaarte.com',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: '2',
    name: 'João Silva',
    email: 'joao@empresa.com',
    role: 'client',
    company: 'Empresa XYZ',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  },
  {
    id: '3',
    name: 'Lara',
    email: 'lara@todaarte.com',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Lara'
  },
  {
    id: '4',
    name: 'Thaty',
    email: 'thaty@todaarte.com',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Thaty'
  }
];

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

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const foundUser = users.find(u => u.email === email);
    if (foundUser && password === 'demo123') {
      setUser(foundUser);
      localStorage.setItem('todaarte_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
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