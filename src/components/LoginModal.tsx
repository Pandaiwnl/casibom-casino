import { useState, useEffect } from 'react';
import { User } from '../App';

interface LoginModalProps {
  onClose: () => void;
  onSuccess: (user: User) => void;
  onSwitchToRegister: () => void;
}

export default function LoginModal({ onClose, onSuccess, onSwitchToRegister }: LoginModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

      const user = registeredUsers.find(
        (u: any) => u.email === formData.email && u.password === formData.password
      );

      if (!user) {
        setError('Email veya şifre hatalı!');
        setLoading(false);
        return;
      }

      const userData: User = {
        id: user.id,
        username: user.username,
        email: user.email,
        balance: user.balance
      };

      onSuccess(userData);
    } catch (error) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="absolute right-0 mt-2 w-[360px] bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 p-6">
      {/* Kapatma Butonu */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
      >
        <i className="fas fa-times text-lg"></i>
      </button>

      {/* Üst Butonlar */}
      <div className="flex mb-4 pt-2">
        <button className="flex-1 py-2 text-white font-bold bg-casino-bright-green rounded-lg shadow-lg">
          Giriş
        </button>
        <button
          onClick={onSwitchToRegister}
          className="flex-1 py-2 text-white font-bold hover:bg-gray-800 transition-all duration-300 rounded-lg"
        >
          Üye Ol
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white font-bold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email adresiniz"
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#ffb400]"
          />
        </div>

        <div>
          <label className="block text-white font-bold mb-1">Şifre</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Casibom şifreniz"
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#ffb400] pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-800/30 border border-red-700 text-red-200 p-2 rounded text-center text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-casino-gold hover:bg-casino-yellow text-black font-bold py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-xl disabled:opacity-50"
        >
          {loading ? 'Giriş yapılıyor...' : 'GİRİŞ YAP'}
        </button>
      </form>

      <div className="mt-3 text-center">
        <button
          onClick={onSwitchToRegister}
          className="text-yellow-400 underline hover:text-yellow-300 font-bold text-sm"
        >
          Hesabınız yok mu? Üye olun
        </button>
      </div>
    </div>
  );
}
