import { useState, useEffect } from 'react';
import { User } from '../App';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

interface RegisterModalProps {
  onClose: () => void;
  onSuccess: (user: User) => void;
  onSwitchToLogin: () => void;
}

export default function RegisterModal({ onClose, onSuccess, onSwitchToLogin }: RegisterModalProps) {
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

  useEffect(() => {
    setError('');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

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

    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır');
      setLoading(false);
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "users"), {
        username: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        currency: formData.currency,
        phone: `${formData.verificationCode}${formData.phone}`,
        balance: 1000,
        createdAt: serverTimestamp(),
      });

      const userData: User = {
        id: docRef.id,
        username: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        balance: 1000,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setSuccess("Kayıt başarılı! Giriş yapabilirsiniz.");
      setLoading(false);

      setTimeout(() => {
        onSuccess(userData);
        onClose();
      }, 2000);
    } catch (err) {
      console.error("🔥 Firebase kayıt hatası:", err);
      setError("Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.");
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="absolute right-0 mt-2 w-[360px] bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 p-6">
      {/* Kapat Butonu */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
      >
        <i className="fas fa-times text-lg"></i>
      </button>

      {/* Sekmeler */}
      <div className="flex mb-4 pt-2">
        <button
          onClick={onSwitchToLogin}
          className="flex-1 py-2 text-white font-bold hover:bg-gray-800 transition-all duration-300 rounded-lg"
        >
          Giriş
        </button>
        <button className="flex-1 py-2 text-white font-bold bg-casino-bright-green rounded-lg shadow-lg">
          Üye Ol
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Ad Soyad */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            name="firstName"
            placeholder="Ad"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#ffb400]"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Soyad"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#ffb400]"
          />
        </div>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email adresiniz"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#ffb400]"
        />

        {/* Şifre */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Casibom şifreniz"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#ffb400] pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
          </button>
        </div>

        {/* Para birimi & Telefon */}
        <div className="grid grid-cols-3 gap-3">
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="col-span-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#ffb400]"
          >
            <option value="TRY">TRY</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>

          <select
            name="verificationCode"
            value={formData.verificationCode}
            onChange={handleChange}
            className="col-span-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#ffb400]"
          >
            <option value="+90">+90</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
          </select>

          <input
            type="tel"
            name="phone"
            placeholder="Telefon"
            value={formData.phone}
            onChange={handleChange}
            required
            className="col-span-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#ffb400]"
          />
        </div>

        {/* Checkboxlar */}
        <div className="space-y-2 text-sm text-white">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={ageVerified}
              onChange={(e) => setAgeVerified(e.target.checked)}
              className="w-4 h-4 text-[#ffb400] bg-white border-gray-300 rounded focus:ring-[#ffb400] focus:ring-2"
            />
            <span>18 yaşından büyüğüm</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="w-4 h-4 text-[#ffb400] bg-white border-gray-300 rounded focus:ring-[#ffb400] focus:ring-2"
            />
            <span>
              Kabul ediyorum{" "}
              <span className="text-yellow-400 underline hover:text-yellow-300 cursor-pointer">
                Hüküm ve Koşullar
              </span>
            </span>
          </label>
        </div>

        {error && (
          <div className="bg-red-800/30 border border-red-700 text-red-200 p-2 rounded text-center text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-800/30 border border-green-700 text-green-200 p-2 rounded text-center text-sm">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-casino-gold hover:bg-casino-yellow text-black font-bold py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-xl disabled:opacity-50"
        >
          {loading ? "Kayıt olunuyor..." : "ÜYE OL"}
        </button>
      </form>

      <div className="mt-3 text-center">
        <button
          onClick={onSwitchToLogin}
          className="text-yellow-400 underline hover:text-yellow-300 font-bold text-sm"
        >
          Hesabınız var mı? Giriş yapın
        </button>
      </div>
    </div>
  );
}
