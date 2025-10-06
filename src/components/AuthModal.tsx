import { useState } from "react";
import { User } from "../App";
import { addDoc, collection, getDocs, query, where, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (user: User) => void;
}

export default function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    currency: "TRY",
    verificationCode: "+90",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [ageVerified, setAgeVerified] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔐 Giriş veya Kayıt butonuna basıldığında
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (isRegister) {
        // Kayıt modu
        if (!ageVerified) {
          setError("18 yaşından büyük olduğunuzu onaylamalısınız");
          setLoading(false);
          return;
        }
        if (!termsAccepted) {
          setError("Hüküm ve Koşulları kabul etmelisiniz");
          setLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          setError("Şifre en az 6 karakter olmalıdır");
          setLoading(false);
          return;
        }

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
        setIsRegister(false);
      } else {
        // Giriş modu
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", formData.email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError("Email bulunamadı!");
          setLoading(false);
          return;
        }

        const userDoc = querySnapshot.docs[0];
        const user = userDoc.data();

        if (user.password !== formData.password) {
          setError("Şifre hatalı!");
          setLoading(false);
          return;
        }

        const userData: User = {
          id: userDoc.id,
          username: user.username,
          email: user.email,
          balance: user.balance || 1000,
        };

        localStorage.setItem("user", JSON.stringify(userData));
        setSuccess("Giriş başarılı!");
        setTimeout(() => {
          onSuccess(userData);
          onClose();
        }, 1500);
      }
    } catch (err) {
      console.error("🔥 Auth hatası:", err);
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    }

    setLoading(false);
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-[360px] bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 p-6">
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
          onClick={() => setIsRegister(false)}
          className={`flex-1 py-2 text-white font-bold rounded-lg ${
            !isRegister ? "bg-casino-bright-green" : "hover:bg-gray-800"
          } transition-all duration-300`}
        >
          Giriş
        </button>
        <button
          onClick={() => setIsRegister(true)}
          className={`flex-1 py-2 text-white font-bold rounded-lg ${
            isRegister ? "bg-casino-bright-green" : "hover:bg-gray-800"
          } transition-all duration-300`}
        >
          Üye Ol
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegister && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-white text-sm font-medium mb-1">Ad</label>
              <input
                type="text"
                name="firstName"
                placeholder="Ad"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#ffb400]"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-1">Soyad</label>
              <input
                type="text"
                name="lastName"
                placeholder="Soyad"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#ffb400]"
              />
            </div>
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block text-white text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#ffb400]"
          />
        </div>

        {/* Şifre ve Para Birimi */}
        {isRegister && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-white text-sm font-medium mb-1">Casibom Şifreniz</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Casibom Şifreniz"
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
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-1">Para birimi</label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#ffb400]"
              >
                <option value="TRY">TRY</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
        )}

        {/* Giriş için şifre */}
        {!isRegister && (
          <div>
            <label className="block text-white text-sm font-medium mb-1">Casibom Şifreniz</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Casibom Şifreniz"
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
          </div>
        )}

        {/* Kayıt alanları - Onay Kodu ve Cep Telefonu */}
        {isRegister && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-white text-sm font-medium mb-1">Onay Kodu</label>
                <select
                  name="verificationCode"
                  value={formData.verificationCode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#ffb400]"
                >
                  <option value="+90">+90</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-1">Cep telefonu</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Telefon numarası"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#ffb400]"
                />
              </div>
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
          </>
        )}

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
          {loading ? "İşleniyor..." : isRegister ? "ÜYE OL" : "GİRİŞ YAP"}
        </button>

        {/* Hesabınız var mı linki */}
        {isRegister && (
          <div className="text-center mt-3">
            <span className="text-white text-sm">
              Hesabınız var mı?{" "}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="text-yellow-400 hover:text-yellow-300 underline"
              >
                Giriş yapın
              </button>
            </span>
          </div>
        )}
      </form>
    </div>
  );
}
