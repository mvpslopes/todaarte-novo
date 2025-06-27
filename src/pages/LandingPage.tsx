import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Hero } from '../components/landing/Hero';
import { Portfolio } from '../components/landing/Portfolio';
import { Services } from '../components/landing/Services';
import { Contact } from '../components/landing/Contact';
import { WhatsAppButton } from '../components/layout/WhatsAppButton';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';
import { useAuth } from '../contexts/AuthContext';

export function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { user } = useAuth();

  const handleNavClick = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onNavClick={handleNavClick} isLandingPage={true} onShowLogin={() => setShowLogin(true)} />
      
      <main>
        <Hero />
        <Portfolio />
        <Services />
        <Contact />
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Serviços</h3>
              <ul className="space-y-2 text-gray-300">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contato</h3>
              <ul className="space-y-2 text-gray-300">
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <div className="flex flex-col md:flex-row md:justify-between items-center">
              <p>&copy; 2024 Toda Arte. Todos os direitos reservados.</p>
              <span className="text-xs text-gray-500 mt-2 md:mt-0"></span>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppButton />

      {showLogin && (
        <LoginForm 
          onClose={() => setShowLogin(false)} 
          onShowRegister={() => { setShowLogin(false); setShowRegister(true); }}
        />
      )}
      {showRegister && (
        <RegisterForm onClose={() => setShowRegister(false)} />
      )}
    </div>
  );
}