import { useState } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess(data.user);
      } else {
        setShowErrorModal(true);
      }
    } catch (error) {
      setShowErrorModal(true);
    } finally {
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
    <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="bg-primary border border-secondary/20 rounded-xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-white">Giriş Yap</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-secondary"
              placeholder="E-posta adresinizi girin"
            />
            <div className="mt-2">
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-yellow-400 underline hover:text-yellow-300 text-sm transition-colors"
              >
                Kayıt
              </button>
            </div>
          </div>

          <div>
            <label className="block text-white font-bold mb-2">
              Casibom Şifreniz
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-secondary"
              placeholder="Şifrenizi girin"
            />
            <div className="mt-2">
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-yellow-400 underline hover:text-yellow-300 text-sm transition-colors"
              >
                Şifrenizi mi unuttunuz?
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
            className="w-full bg-secondary hover:bg-secondary/90 text-primary font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Giriş yapılıyor...' : 'GİRİŞ YAP'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-300">
            Hesabınız yok mu?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-secondary hover:text-secondary/80 font-bold transition-colors"
            >
              Üye Ol
            </button>
          </p>
        </div>
      </div>

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div className="bg-black/80 backdrop-blur-sm absolute inset-0" onClick={() => setShowErrorModal(false)}></div>
          <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl max-w-sm w-full">
            {/* Orange Header */}
            <div className="bg-orange-500 px-6 py-4 flex justify-between items-center">
              <h3 className="text-white font-bold text-lg">Giriş Hatası</h3>
              <button
                onClick={() => setShowErrorModal(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            {/* Content */}
            <div className="px-6 py-8 text-center">
              {/* Warning Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                  <i className="fas fa-exclamation text-white text-2xl"></i>
                </div>
              </div>
              
              {/* Error Message */}
              <p className="text-white text-lg mb-6">
                Giriş bilgileriniz hatalı, lütfen kontrol ediniz
              </p>
              
              {/* Close Button */}
              <button
                onClick={() => setShowErrorModal(false)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                KAPAT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

