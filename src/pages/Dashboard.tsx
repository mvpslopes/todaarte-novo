import React, { useState } from 'react';
import { Sidebar } from '../components/dashboard/Sidebar';
import { AdminDashboard } from '../components/dashboard/admin/AdminDashboard';
import { ProjectManagement } from '../components/dashboard/admin/ProjectManagement';
import { ClientDashboard } from '../components/dashboard/client/ClientDashboard';
import { ClientProjects } from '../components/dashboard/client/ClientProjects';
import { useAuth } from '../contexts/AuthContext';

export function Dashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { user } = useAuth();

  const renderContent = () => {
    if (user?.role === 'admin') {
      switch (activeSection) {
        case 'dashboard':
          return <AdminDashboard />;
        case 'projects':
          return <ProjectManagement />;
        case 'clients':
          return <div className="p-8"><h1 className="text-2xl font-bold">Gerenciar Clientes</h1><p>Em desenvolvimento...</p></div>;
        case 'portfolio':
          return <div className="p-8"><h1 className="text-2xl font-bold">Gerenciar Portfólio</h1><p>Em desenvolvimento...</p></div>;
        case 'financials':
          return <div className="p-8"><h1 className="text-2xl font-bold">Financeiro</h1><p>Em desenvolvimento...</p></div>;
        case 'settings':
          return <div className="p-8"><h1 className="text-2xl font-bold">Configurações</h1><p>Em desenvolvimento...</p></div>;
        default:
          return <AdminDashboard />;
      }
    } else {
      switch (activeSection) {
        case 'dashboard':
          return <ClientDashboard />;
        case 'projects':
          return <ClientProjects />;
        case 'messages':
          return <div className="p-8"><h1 className="text-2xl font-bold">Mensagens</h1><p>Em desenvolvimento...</p></div>;
        case 'settings':
          return <div className="p-8"><h1 className="text-2xl font-bold">Configurações</h1><p>Em desenvolvimento...</p></div>;
        default:
          return <ClientDashboard />;
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
}