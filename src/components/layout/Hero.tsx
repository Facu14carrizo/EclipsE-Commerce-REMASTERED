import React from 'react';
import { ArrowRight, Star, Telescope } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export function Hero({ onExploreClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>
      </div>

      {/* Stars Animation */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${1 + Math.random() * 3}s`
            }}
          >
            <Star
              className="text-white/40 animate-twinkle"
              style={{
                fontSize: `${4 + Math.random() * 12}px`,
                filter: `brightness(${0.5 + Math.random() * 1.5})`
              }}
            />
          </div>
        ))}
        
        {/* Shooting Stars */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`shooting-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full animate-shooting-star opacity-0"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animationDelay: `${i * 8 + Math.random() * 5}s`,
              animationDuration: '2s'
            }}
          />
        ))}
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-0.5 h-0.5 bg-cyan-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <Telescope className="h-20 w-20 text-cyan-400 mx-auto mb-6 animate-bounce" />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-fade-in-up">
          Explora el Cosmos
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
          Descubre los secretos del universo con nuestros telescopios de última generación 
          y sumérgete en nuestra enciclopedia astronómica interactiva.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
          <button
            onClick={onExploreClick}
            className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold rounded-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
          >
            <span className="flex items-center">
              Explorar Catálogo
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="px-8 py-4 border-2 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 font-semibold rounded-lg transition-all duration-300"
          >
            Aprender Astronomía
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 animate-fade-in-up animation-delay-600">
          {[
            { number: '1000+', label: 'Productos' },
            { number: '50+', label: 'Marcas' },
            { number: '10k+', label: 'Clientes' },
            { number: '500+', label: 'Artículos Wiki' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}