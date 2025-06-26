import React from 'react';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Users, 
  DollarSign, 
  Settings,
  Palette,
  Briefcase,
  MessageSquare,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const { user, logout } = useAuth();

  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projetos', icon: FolderOpen },
    { id: 'clients', label: 'Clientes', icon: Users },
    { id: 'portfolio', label: 'Portfólio', icon: Palette },
    { id: 'financials', label: 'Financeiro', icon: DollarSign },
    { id: 'settings', label: 'Configurações', icon: Settings }
  ];

  const clientMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Meus Projetos', icon: Briefcase },
    { id: 'messages', label: 'Mensagens', icon: MessageSquare },
    { id: 'settings', label: 'Configurações', icon: Settings }
  ];

  const menuItems = user?.role === 'admin' ? adminMenuItems : clientMenuItems;

  return (
    <div className="bg-white h-screen w-64 shadow-lg border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Palette className="h-8 w-8 text-logo" />
          <span className="text-xl font-bold bg-gradient-to-r from-logo to-logo-light bg-clip-text text-transparent">
            Toda Arte
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Painel {user?.role === 'admin' ? 'Administrativo' : 'do Cliente'}
        </p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-logo to-logo-light text-white shadow-lg'
                    : 'text-gray-700 hover:bg-logo-light/60'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-2">
          {user?.avatar && (
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 truncate">{user?.name}</p>
            <p className="text-sm text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="mt-2 w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 font-medium py-2 rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
}