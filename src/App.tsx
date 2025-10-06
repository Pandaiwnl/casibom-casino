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

  // Kullanıcı oturum kontrolü
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
    <div className="min-h-screen bg-primary text-white relative pb-16 md:pb-0">
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
        
        {/* Adres Bölümü */}
        <section className="bg-primary py-4">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-white text-sm">
              Güncel adresimiz için: 
              <span className="text-secondary ml-2">
                <i className="fab fa-telegram mr-1"></i>
                t.me/casibomadres linkini kullanınız
              </span>
            </p>
          </div>
        </section>
        
        <PromoCards />
        <WinnersSection />
        <GamesGrid onGameClick={handleGameClick} />
      </main>
      
      <Footer />

      {/* Modallar */}
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

      {/* 📱 Mobil Alt Menü */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#111] border-t border-[#2a2a2a] flex justify-around items-center py-2 md:hidden">
        {/* Spor */}
        <button className="flex flex-col items-center text-gray-300 hover:text-[#ffb400] transition-colors">
          <i className="fas fa-futbol text-lg mb-1"></i>
          <span className="text-xs font-semibold">SPOR</span>
        </button>

        {/* Casino */}
        <button className="flex flex-col items-center text-gray-300 hover:text-[#ffb400] transition-colors">
          <i className="fas fa-dice text-lg mb-1"></i>
          <span className="text-xs font-semibold">CASİNO</span>
        </button>

        {/* Canlı Destek */}
        <button className="flex flex-col items-center text-gray-300 hover:text-[#ffb400] transition-colors">
          <i className="fas fa-comments text-lg mb-1"></i>
          <span className="text-xs font-semibold">CANLI DESTEK</span>
        </button>

        {/* Canlı Casino */}
        <button className="flex flex-col items-center text-gray-300 hover:text-[#ffb400] transition-colors">
          <i className="fas fa-user-tie text-lg mb-1"></i>
          <span className="text-xs font-semibold">CANLI CASİNO</span>
        </button>

        {/* Menü */}
        <button className="flex flex-col items-center text-gray-300 hover:text-[#ffb400] transition-colors">
          <i className="fas fa-bars text-lg mb-1"></i>
          <span className="text-xs font-semibold">MENÜ</span>
        </button>
      </div>
    </div>
  );
}

export default App;
