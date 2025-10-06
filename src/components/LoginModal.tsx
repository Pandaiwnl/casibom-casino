import { useState, useEffect } from 'react';
import { User } from '../App';

interface RegisterModalProps {
  onClose: () => void;
  onSuccess: (user: User) => void;
  onSwitchToLogin: () => void;
}

export default function RegisterModal({ onSuccess, onSwitchToLogin }: RegisterModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    currency: 'TRY',
    verificationCode: '+90',
    phone: ''
  });

  const [ageVerified, setAgeVerified] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);

  useEffect(() => {
    setAttemptCount(0);
    setError('');
    setSuccess('');
  }, []);

  // Şifre Güç Kontrolü
  const isPasswordStrong = (password: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!ageVerified) {
      setError('18 yaşından büyük olduğunuzu onaylamalısınız');
      setLoading(false);
      return;
    }

    if (!termsAccepted) {
      setError('Hüküm ve Koşulları kabul etmelisiniz');
      setLoading(false);
      return;
    }

    if (!isPasswordStrong(formData.password)) {
      setError('Şifre en az 8 karakter olmalı, bir harf, bir sayı ve bir özel karakter içermelidir.');
      setLoading(false);
      return;
    }

    if (attemptCount === 0) {
      setAttemptCount(1);
      setError('Sunucu hatası. Lütfen tekrar deneyin.');
      setLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Kullanıcı oluşturma (örnek)
      const userData = {
        id: Date.now().toString(),
        username: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        balance: 100.00
      };

      setSuccess('Kayıt başarılı! Giriş yapabilirsiniz.');
      setError('');
      setLoading(false);

      // Otomatik giriş yapmadan sadece başarılı kayıt bildirimi
      setTimeout(() => {
        onSwitchToLogin(); // Giriş ekranına yönlendir
      }, 2000);
    } catch (error) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 w-full max-w-md">
        
        {/* Header */}
        <div className="flex mb-8">
          <button
            onClick={onSwitchToLogin}
            className="flex-1 py-3 px-4 text-white font-bold hover:bg-gray-800 transition-colors"
          >
            Giriş
          </button>
          <button className="flex-1 py-3 px-4 text-white font-bold bg-green-600 rounded-lg">
            Üye Ol
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-bold mb-2">Ad</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border rounded-lg text-gray-900 focus:outline-none focus:border-green-500"
                placeholder="Ad"
              />
            </div>
            <div>
              <label className="block text-white font-bold mb-2">Soyad</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border rounded-lg text-gray-900 focus:outline-none focus:border-green-500"
                placeholder="Soyad"
              />
            </div>
          </div>

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

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="block text-white font-bold mb-2">Casibom Şifreniz</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border rounded-lg text-gray-900 focus:outline-none focus:border-green-500 pr-12"
                  placeholder="Casibom Şifreniz"
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

            <div>
              <label className="block text-white font-bold mb-2">Para birimi</label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border rounded-lg text-gray-900 focus:outline-none focus:border-green-500"
              >
                <option value="TRY">TRY</option>
                <option value="EUR">EUR</option>
                <option value="BRL">BRL</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-white font-bold mb-2">Onay</label>
              <select
                name="verificationCode"
                value={formData.verificationCode}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border rounded-lg text-gray-900"
              >
                <option value="+90">+90</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
              </select>
            </div>

            <div className="col-span-3">
              <label className="block text-white font-bold mb-2">Cep telefonu</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border rounded-lg text-gray-900 focus:outline-none focus:border-green-500"
                placeholder="Telefon numarası"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={ageVerified}
                onChange={(e) => setAgeVerified(e.target.checked)}
                className="w-4 h-4 text-green-600 rounded"
              />
              <label className="text-white text-sm">18 yaşından büyüğüm</label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="w-4 h-4 text-green-600 rounded"
              />
              <label className="text-white text-sm">
                Kabul ediyorum{' '}
                <span className="text-yellow-400 underline cursor-pointer">
                  Hüküm ve Koşullar
                </span>
              </label>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-lg">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Kayıt olunuyor...' : attemptCount > 0 ? 'TEKRAR DENE' : 'ÜYE OL'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onSwitchToLogin}
            className="text-yellow-400 underline hover:text-yellow-300 font-bold"
          >
            Hesabınız var mı?
          </button>
        </div>
      </div>
    </div>
  );
}
