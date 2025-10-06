import { useState } from 'react';
import { User } from '../App';

interface HeaderProps {
  user: User | null;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
  onPayment: () => void;
}

export default function Header({ user, onLogin, onRegister, onLogout, onPayment }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-primary sticky top-0 z-50 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-20 px-4">
          {/* Logo - Far Left */}
          <div className="flex items-center">
            <div className="logo relative">
              <span className="casi text-white text-4xl font-black">casi</span>
              <span className="bom text-orange-500 text-4xl font-black relative inline-block">
                <span className="relative">
                  b
                  <span className="animate-blink inline-block transform-origin-center">
                    o
                  </span>
                  <div className="smile absolute -bottom-1 left-0 w-full h-4 border-b-4 border-orange-600 rounded-b-full"></div>
                </span>m
              </span>
            </div>
          </div>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center space-x-10">
            <a href="#sports" className="text-white hover:text-secondary transition-colors font-bold text-lg">
              SPOR
            </a>
            <a href="#live-betting" className="text-white hover:text-secondary transition-colors font-bold text-lg">
              CANLI BAHIS
            </a>
            <a href="#casino" className="text-white hover:text-secondary transition-colors font-bold text-lg">
              CASINO
            </a>
            <a href="#live-casino" className="text-white hover:text-secondary transition-colors font-bold text-lg">
              CANLI CASİNO
            </a>
            <a href="#bonuses" className="text-white hover:text-secondary transition-colors font-bold text-lg">
              BONUSLAR
            </a>
            <a href="#vip" className="text-white hover:text-secondary transition-colors font-bold text-lg">
              VIP PROGRAMI
            </a>
          </nav>

          {/* User Section - Far Right */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2 md:space-x-3">
                {/* Balance Button - White */}
                <div className="bg-white text-black px-2 py-1 md:px-3 md:py-2 rounded-lg font-bold text-xs md:text-sm">
                  ₺ {user.balance.toFixed(2)}
                </div>
                
                {/* Deposit Button - Green */}
                <button
                  onClick={onPayment}
                  className="bg-casino-green hover:bg-casino-green/90 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg font-bold text-xs md:text-sm transition-colors"
                >
                  PARA YATIR
                </button>
                
                {/* Bomb Icon with Dropdown */}
                <div className="relative">
                  <button 
                    onClick={onLogout}
                    className="flex items-center space-x-1 text-white hover:text-gray-300 transition-colors"
                  >
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-secondary rounded-full flex items-center justify-center border border-black">
                      <span className="text-black font-bold text-sm md:text-lg">💣</span>
                    </div>
                    <i className="fas fa-chevron-down text-xs hidden md:block"></i>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 md:space-x-4">
                <button
                  onClick={onLogin}
                  className="bg-white hover:bg-gray-100 text-black px-3 py-2 md:px-8 md:py-3 rounded-lg font-bold text-sm md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  GİRİŞ
                </button>
                <button 
                  onClick={onRegister}
                  className="bg-casino-bright-green hover:bg-casino-green text-white px-3 py-2 md:px-8 md:py-3 rounded-lg font-bold text-sm md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  ÜYE OL
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-secondary/20 px-4">
            <nav className="flex flex-col space-y-5">
              <a href="#sports" className="text-white hover:text-secondary transition-colors font-bold text-lg">
                SPOR
              </a>
              <a href="#live-betting" className="text-white hover:text-secondary transition-colors font-bold text-lg">
                CANLI BAHIS
              </a>
              <a href="#casino" className="text-white hover:text-secondary transition-colors font-bold text-lg">
                CASINO
              </a>
              <a href="#live-casino" className="text-white hover:text-secondary transition-colors font-bold text-lg">
                CANLI CASİNO
              </a>
              <a href="#bonuses" className="text-white hover:text-secondary transition-colors font-bold text-lg">
                BONUSLAR
              </a>
              <a href="#vip" className="text-white hover:text-secondary transition-colors font-bold text-lg">
                VIP PROGRAMI
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

