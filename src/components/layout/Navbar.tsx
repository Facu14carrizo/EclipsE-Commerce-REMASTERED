import React from 'react';
import { ShoppingCart, Search, Menu, X, Telescope } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

interface NavbarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onSearchToggle: () => void;
}

export function Navbar({ activeSection, onSectionChange, onSearchToggle }: NavbarProps) {
  const { totalItems, setIsOpen, justAdded } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'catalog', label: 'Catálogo' },
    { id: 'wiki', label: 'Wiki Espacial' },
    { id: 'about', label: 'Nosotros' },
    { id: 'contact', label: 'Contacto' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900/95 via-indigo-900/95 to-purple-900/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => onSectionChange('home')}
          >
            <Telescope className="h-8 w-8 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              AstroShop
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? 'text-cyan-400 bg-white/10 shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onSearchToggle}
              className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200"
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200 group"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-violet-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
              
              {/* Tooltip de producto agregado */}
              {justAdded && totalItems > 0 && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-3 py-1 rounded-md whitespace-nowrap z-[60] shadow-lg animate-bounce">
                  ✅ {justAdded.length > 20 ? justAdded.substring(0, 20) + '...' : justAdded}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-500"></div>
                </div>
              )}
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium text-left transition-all duration-200 ${
                    activeSection === item.id
                      ? 'text-cyan-400 bg-white/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}