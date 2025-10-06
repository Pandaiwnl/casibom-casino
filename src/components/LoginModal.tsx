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
      // Get registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      
      // Find user by email and password
      const user = registeredUsers.find((u: any) => 
        u.email === formData.email && u.password === formData.password
      );

      if (!user) {
        setError('Email veya şifre hatalı!');
        setLoading(false);
        return;
      }

      // Create user data for login
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
    <div className="modal-overlay fixed top-20 right-4 z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-md relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
        >
          <i className="fas fa-times text-xl"></i>
        </button>

        {/* Header */}
        <div className="flex mb-6">
          <button className="flex-1 py-3 px-4 text-white font-bold bg-casino-bright-green rounded-lg shadow-lg">
            Giriş
          </button>
          <button
            onClick={onSwitchToRegister}
            className="flex-1 py-3 px-4 text-white font-bold hover:bg-gray-800 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl"
          >
            Üye Ol
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white border rounded-lg text-gray-900 focus:outline-none focus:border-green-500"
              placeholder="Email"
            />
          </div>

          <div>
            <label className="block text-white font-bold mb-2">Şifre</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border rounded-lg text-gray-900 focus:outline-none focus:border-green-500 pr-12"
                placeholder="Şifre"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-casino-gold hover:bg-casino-yellow text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            {loading ? 'Giriş yapılıyor...' : 'GİRİŞ YAP'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onSwitchToRegister}
            className="text-yellow-400 underline hover:text-yellow-300 font-bold"
          >
            Hesabınız yok mu? Üye olun
          </button>
        </div>
      </div>
    </div>
  );
}

