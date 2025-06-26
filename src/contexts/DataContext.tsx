import React, { createContext, useContext, useState } from 'react';
import { Project, PortfolioItem, Service, Financial, Comment } from '../types';

interface DataContextType {
  projects: Project[];
  portfolio: PortfolioItem[];
  services: Service[];
  financials: Financial[];
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'comments'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  addComment: (projectId: string, comment: Omit<Comment, 'id' | 'createdAt'>) => void;
  addFinancial: (financial: Omit<Financial, 'id'>) => void;
  updateFinancial: (id: string, updates: Partial<Financial>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Mock data
const mockPortfolio: PortfolioItem[] = [
  {
    id: '1',
    title: 'Campanha Digital Verão',
    category: 'Marketing Digital',
    image: 'https://images.pexels.com/photos/1367276/pexels-photo-1367276.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Campanha completa para redes sociais com foco no verão',
    featured: true
  },
  {
    id: '2',
    title: 'Identidade Visual Restaurante',
    category: 'Branding',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Logo, cardápio e materiais gráficos para restaurante',
    featured: true
  },
  {
    id: '3',
    title: 'Website Corporativo',
    category: 'Web Design',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Design e desenvolvimento de site institucional',
    featured: false
  },
  {
    id: '4',
    title: 'Embalagem Produto',
    category: 'Design Gráfico',
    image: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Design de embalagem para linha de produtos',
    featured: true
  }
];

const mockServices: Service[] = [
  {
    id: '1',
    name: 'Identidade Visual',
    description: 'Criação de logo, paleta de cores, tipografia e manual da marca',
    icon: 'Palette',
    price: 'A partir de R$ 1.500'
  },
  {
    id: '2',
    name: 'Marketing Digital',
    description: 'Campanhas para redes sociais, Google Ads e e-mail marketing',
    icon: 'Megaphone',
    price: 'A partir de R$ 800'
  },
  {
    id: '3',
    name: 'Web Design',
    description: 'Design e desenvolvimento de websites responsivos e modernos',
    icon: 'Monitor',
    price: 'A partir de R$ 2.500'
  },
  {
    id: '4',
    name: 'Design Gráfico',
    description: 'Flyers, cartões, banners e materiais impressos diversos',
    icon: 'FileText',
    price: 'A partir de R$ 200'
  }
];

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Redesign da Marca',
    description: 'Modernização da identidade visual da empresa',
    category: 'Branding',
    images: [
      'https://images.pexels.com/photos/1367276/pexels-photo-1367276.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    status: 'review',
    clientId: '2',
    clientName: 'João Silva',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    budget: 3500,
    deadline: '2024-02-15',
    comments: [
      {
        id: '1',
        projectId: '1',
        userId: '1',
        userName: 'Admin Toda Arte',
        userRole: 'admin',
        message: 'Primeira versão da logo está pronta para aprovação',
        createdAt: '2024-01-20T10:00:00Z'
      }
    ]
  }
];

const mockFinancials: Financial[] = [
  {
    id: '1',
    type: 'income',
    description: 'Projeto Redesign da Marca - João Silva',
    amount: 3500,
    date: '2024-01-15',
    category: 'Branding',
    status: 'pending',
    projectId: '1'
  },
  {
    id: '2',
    type: 'expense',
    description: 'Adobe Creative Suite - Licença Mensal',
    amount: 150,
    date: '2024-01-01',
    category: 'Software',
    status: 'paid'
  }
];

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [portfolio] = useState<PortfolioItem[]>(mockPortfolio);
  const [services] = useState<Service[]>(mockServices);
  const [financials, setFinancials] = useState<Financial[]>(mockFinancials);

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'comments'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: []
    };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === id 
        ? { ...project, ...updates, updatedAt: new Date().toISOString() }
        : project
    ));
  };

  const addComment = (projectId: string, commentData: Omit<Comment, 'id' | 'createdAt'>) => {
    const newComment: Comment = {
      ...commentData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    setProjects(prev => prev.map(project =>
      project.id === projectId
        ? { ...project, comments: [...project.comments, newComment] }
        : project
    ));
  };

  const addFinancial = (financialData: Omit<Financial, 'id'>) => {
    const newFinancial: Financial = {
      ...financialData,
      id: Date.now().toString()
    };
    setFinancials(prev => [...prev, newFinancial]);
  };

  const updateFinancial = (id: string, updates: Partial<Financial>) => {
    setFinancials(prev => prev.map(financial =>
      financial.id === id ? { ...financial, ...updates } : financial
    ));
  };

  return (
    <DataContext.Provider value={{
      projects,
      portfolio,
      services,
      financials,
      addProject,
      updateProject,
      addComment,
      addFinancial,
      updateFinancial
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}