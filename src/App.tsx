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
    // Always redirect to registration modal when clicking on games
    setShowRegister(true);
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

  return (
    <div className="min-h-screen bg-primary text-white">
      <Header 
        user={user} 
        onLogin={() => setShowLogin(true)}
        onRegister={() => setShowRegister(true)}
        onLogout={handleLogout}
        onPayment={() => setShowPayment(true)}
      />
      
      <main>
        <HeroCarousel 
          onRegister={() => setShowRegister(true)} 
          onPayment={() => setShowPayment(true)}
        />
        
        {/* Address Section */}
        <section className="bg-primary py-4">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-white text-sm">
              Güncel adresimiz için: 
              <span className="text-secondary ml-2">
                <i className="fab fa-telegram mr-1"></i>
                t.me/casibomadres linkin kullanınız
              </span>
            </p>
          </div>
        </section>
        
        <PromoCards />
        <WinnersSection />
        <GamesGrid onGameClick={handleGameClick} />
      </main>
      
      <Footer />

      {/* Modals */}
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
    </div>
  );
}

export default App;

