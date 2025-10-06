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
import BottomNav from './components/BottomNav';

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
        showLogin={showLogin}
        showRegister={showRegister}
        onCloseLogin={() => setShowLogin(false)}
        onCloseRegister={() => setShowRegister(false)}
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
        onSwitchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
        onLoginSuccess={handleLogin}
      />

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <HeroCarousel 
          onRegister={() => setShowRegister(true)} 
          onPayment={() => user ? setShowPayment(true) : setShowLogin(true)}
        />
        
        <section className="bg-primary py-4 text-center px-2">
          <p className="text-white text-sm">
            Güncel adresimiz için:
            <span className="text-secondary ml-2 break-all">
              <i className="fab fa-telegram mr-1"></i>
              t.ly/casibomadres
            </span>
          </p>
        </section>
        
        <PromoCards onGameClick={handleGameClick} />
        <WinnersSection />
        <GamesGrid onGameClick={handleGameClick} />
      </main>

      {/* FOOTER (masaüstü) */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {showPayment && (
        <PaymentModal 
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
          user={user}
        />
      )}

      {/* MOBİL ALT MENÜ */}
      {!isModalOpen && <BottomNav />}
    </div>
  );
}

export default App;
