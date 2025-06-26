import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-black via-neutral-900 to-neutral-800 text-white py-24">
      {/* Fundo degradê preto já aplicado no <section> */}

      {/* Elementos animados de fundo removidos para eliminar azul/roxo pulsante */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-center mb-6">
              <span>Transformamos</span>
              <br />
              <span className="text-logo">Ideias em Arte</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Criamos experiências visuais únicas que conectam sua marca ao coração do seu público
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              className="bg-gradient-to-r from-logo to-logo-light text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Ver Portfólio</span>
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
            
            <button className="group flex items-center space-x-2 text-white hover:text-black transition-colors">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full group-hover:bg-white/30 transition-colors">
                <Play className="h-6 w-6" />
              </div>
              <span className="font-medium">Assistir Showreel</span>
            </button>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { number: '200+', label: 'Projetos Entregues' },
              { number: '50+', label: 'Clientes Satisfeitos' },
              { number: '5+', label: 'Anos de Experiência' }
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl sm:text-4xl font-bold text-white">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator - agora logo abaixo das estatísticas */}
      <div className="flex justify-center mt-12 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}