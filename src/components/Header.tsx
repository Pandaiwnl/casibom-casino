import { useState } from "react";
import { User } from "../App";
import ProfileDropdown from "./ProfileDropdown";
import AuthModal from "./AuthModal";

interface HeaderProps {
  user: User | null;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
  onPayment: () => void;
  onLoginSuccess: (user: User) => void;
}

export default function Header({
  user,
  onLogin,
  onRegister,
  onLogout,
  onPayment,
  onLoginSuccess,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  return (
    <header className="bg-primary sticky top-0 z-50 py-3 shadow-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8">
        {/* LOGO */}
        <div className="flex items-center cursor-pointer select-none">
          <span className="text-white text-3xl font-black">casi</span>
          <span className="text-orange-500 text-3xl font-black relative">
            b<span className="inline-block animate-pulse">o</span>m
          </span>
        </div>

        {/* ORTA MENÜ */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-white hover:text-yellow-400 font-semibold">
            SPOR
          </a>
          <a href="#" className="text-white hover:text-yellow-400 font-semibold">
            CANLI BAHİS
          </a>
          <a href="#" className="text-white hover:text-yellow-400 font-semibold">
            CASINO
          </a>
          <a href="#" className="text-white hover:text-yellow-400 font-semibold">
            CANLI CASİNO
          </a>
          <a href="#" className="text-white hover:text-yellow-400 font-semibold">
            BONUSLAR
          </a>
          <a href="#" className="text-white hover:text-yellow-400 font-semibold">
            VIP PROGRAMI
          </a>
        </nav>

        {/* SAĞ TARAF */}
        <div className="flex items-center space-x-3 relative">
          {user ? (
            <div className="flex items-center space-x-3">
              <div className="bg-white text-black px-3 py-1 rounded font-bold">
                ₺ {user.balance.toFixed(2)}
              </div>

              <button
                onClick={onPayment}
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg transition"
              >
                PARA YATIR
              </button>

              <button
                onClick={() => setShowProfileDropdown(true)}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-2 rounded-lg font-bold"
              >
                💣
              </button>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowAuth(!showAuth)}
                className="bg-white hover:bg-gray-100 text-black font-bold px-5 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                GİRİŞ / ÜYE OL
              </button>

              {/* AuthModal */}
              {showAuth && (
                <AuthModal
                  onClose={() => setShowAuth(false)}
                  onSuccess={(user) => {
                    onLoginSuccess(user);
                    setShowAuth(false);
                  }}
                />
              )}
            </div>
          )}

          {/* Mobil Menü Butonu */}
          <button
            className="text-white text-2xl md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>
      </div>

      {/* MOBİL MENÜ */}
      {isMenuOpen && (
        <div className="bg-primary border-t border-gray-700 px-6 py-4 flex flex-col space-y-4 md:hidden">
          <a href="#" className="text-white hover:text-yellow-400 font-semibold">
            SPOR
          </a>
          <a href="#" className="text-white hover:text-yellow-400 font-semibold">
            CANLI BAHİS
          </a>
          <a href="#" className="text-white hover:text-yellow-400 font-semibold">
            CASINO
          </a>
          <a href="#" className="text-white hover:text-yellow-400 font-semibold">
            CANLI CASİNO
          </a>
          <a href="#" className="text-white hover:text-yellow-400 font-semibold">
            BONUSLAR
          </a>
          <a href="#" className="text-white hover:text-yellow-400 font-semibold">
            VIP PROGRAMI
          </a>
        </div>
      )}

      {/* PROFİL DROPDOWN */}
      {showProfileDropdown && user && (
        <ProfileDropdown
          user={user}
          onClose={() => setShowProfileDropdown(false)}
          onLogout={() => {
            setShowProfileDropdown(false);
            onLogout();
          }}
          onPayment={() => {
            setShowProfileDropdown(false);
            onPayment();
          }}
        />
      )}
    </header>
  );
}
