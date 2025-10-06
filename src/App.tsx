import { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import PromoCards from './components/PromoCards';
import GamesGrid from './components/GamesGrid';
import WinnersSection from './components/WinnersSection';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import PaymentModal from './components/PaymentModal';
import { FaFutbol, FaHeadset, FaUserFriends } from 'react-icons/fa';
import { GiCardAceHearts } from 'react-icons/gi';
import { HiMenu } from 'react-icons/hi';

export interface User {
  id: string;
  username: string;
  email: string;
  balance: number;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [, setSelectedGame] = useState<string | null>(null);

  // Check for existing user session
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleGameClick = (gameId: string) => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    setSelectedGame(gameId);
  };

  const handlePaymentSuccess = (newBalance: number) => {
    if (user) {
      const updatedUser = { ...user, balance: newBalance };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    setShowPayment(false);
    setSelectedGame(null);
  };

  const isModalOpen = showLogin || showRegister || showPayment;

  return (
    <div className="min-h-screen bg-primary text-white relative flex flex-col">
      {/* HEADER */}
      <Header 
        user={user} 
        onLogin={() => setShowLogin(true)}
        onRegister={() => setShowRegister(true)}
        onLogout={handleLogout}
        onPayment={() => user ? setShowPayment(true) : setShowLogin(true)}
      />

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto pb-24 md:pb-0">
        <HeroCarousel 
          onRegister={() => setShowRegister(true)} 
          onPayment={() => user ? setShowPayment(true) : setShowLogin(true)}
        />
        
        <section className="bg-primary py-4 text-center px-2">
          <p className="text-white text-sm">
            Güncel adresimiz için:
            <span className="text-secondary ml-2 break-all">
              <i className="fab fa-telegram mr-1"></i>
              t.me/casibomadres linkini kullanınız
            </span>
          </p>
        </section>
        
        <PromoCards />
        <WinnersSection />
        <GamesGrid onGameClick={handleGameClick} />
      </main>

      {/* FOOTER (masaüstü) */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* MODALLAR */}
      {showLogin && (
        <LoginModal 
          onClose={() => setShowLogin(false)}
          onSuccess={handleLogin}
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {showRegister && (
        <RegisterModal 
          onClose={() => setShowRegister(false)}
          onSuccess={handleLogin}
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}

      {showPayment && (
        <PaymentModal 
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
          user={user}
        />
      )}

      {/* MOBİL ALT MENÜ */}
      {!isModalOpen && (
        <div className="fixed bottom-0 left-0 w-full bg-[#111] text-white border-t border-gray-700 flex justify-around py-3 md:hidden z-50">
          <button className="flex flex-col items-center text-xs opacity-90 hover:text-yellow-400 transition">
            <FaFutbol className="text-xl mb-1" />
            Spor
          </button>
          <button className="flex flex-col items-center text-xs opacity-90 hover:text-yellow-400 transition">
            <GiCardAceHearts className="text-xl mb-1" />
            Casino
          </button>
          <button className="flex flex-col items-center text-xs opacity-90 hover:text-yellow-400 transition">
            <FaHeadset className="text-xl mb-1" />
            Canlı Destek
          </button>
          <button className="flex flex-col items-center text-xs opacity-90 hover:text-yellow-400 transition">
            <FaUserFriends className="text-xl mb-1" />
            Canlı Casino
          </button>
          <button className="flex flex-col items-center text-xs opacity-90 hover:text-yellow-400 transition">
            <HiMenu className="text-xl mb-1" />
            Menü
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
