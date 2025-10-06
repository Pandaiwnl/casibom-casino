import { useState, useEffect } from "react";

type UserLike = {
  id?: string;
  balance: number;
  [k: string]: any;
};

interface PaymentModalProps {
  onClose: () => void;
  user?: UserLike | null;
  onDeposit?: (amount: number) => void;   // çağrılırsa gerçek bakiye güncellemesi yap
  onWithdraw?: (amount: number) => void;  // çağrılırsa gerçek bakiye güncellemesi yap
}

export default function PaymentModal({ onClose, user, onDeposit, onWithdraw }: PaymentModalProps) {
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw" | "history" | "lossbonus">("deposit");

  // Deposit state
  const [bonus, setBonus] = useState<string>("Bonus istemiyorum.");
  const [depositMethod, setDepositMethod] = useState<string>("Tüm yöntemleri göster");
  const [depositAmount, setDepositAmount] = useState<string>("");

  // Withdraw state
  const [withdrawMethod, setWithdrawMethod] = useState<string>("Tüm yöntemleri göster");
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [withdrawError, setWithdrawError] = useState<string>("");

  // General UI state
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // temizle mesaj
    if (message) {
      const t = setTimeout(() => setMessage(null), 3500);
      return () => clearTimeout(t);
    }
  }, [message]);

  // Deposit handler (UI mode; if onDeposit provided, call it)
  const handleDepositClick = () => {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      setMessage("Lütfen geçerli bir miktar girin.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onDeposit) {
        onDeposit(amount);
        setMessage("Para yatırma isteği başarıyla işlendi.");
      } else {
        // Simüle edilmiş onay (UI mode)
        setMessage(`(Demo) ${amount} TL yatırma talebi alındı.`);
      }
      setDepositAmount("");
    }, 800);
  };

  // Withdraw handler
  const handleWithdrawClick = () => {
    setWithdrawError("");
    const amount = parseFloat(withdrawAmount);
    if (!user) {
      setWithdrawError("Kullanıcı bulunamadı. Lütfen giriş yapın.");
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      setWithdrawError("Lütfen çekilecek geçerli bir miktar girin.");
      return;
    }
    if (amount > user.balance) {
      setWithdrawError("Yetersiz bakiye.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onWithdraw) {
        onWithdraw(amount);
        setMessage("Çekme talebi başarıyla işlendi.");
      } else {
        setMessage(`(Demo) ${amount} TL çekme talebi alındı.`);
      }
      setWithdrawAmount("");
    }, 800);
  };

  // History tab -> sen istediğin gibi hata gösterilecek
  const renderHistory = () => {
    return (
      <div className="py-12 text-center">
        <div className="max-w-xl mx-auto bg-red-800/20 border border-red-700 text-red-300 p-6 rounded-lg">
          <h3 className="font-bold text-lg mb-2">Hata</h3>
          <p>Geçmiş verisi yüklenemedi. Lütfen daha sonra tekrar deneyin.</p>
          <p className="mt-2 text-sm text-red-200/80">(Demo: kayıtlı geçmiş yok veya bağlantı hatası)</p>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-3xl bg-[#111] rounded-lg overflow-hidden shadow-xl">
        {/* Sarı üst bar + kapatma */}
        <div className="bg-[#ffb400] flex items-center justify-between px-4 py-3">
          <div className="text-black font-bold">ÖDEME İŞLEMLERİ</div>
          <button onClick={onClose} className="text-black text-2xl font-bold">✕</button>
        </div>

        {/* Sekmeler */}
        <div className="flex text-white text-lg">
          <button
            onClick={() => setActiveTab("deposit")}
            className={`flex-1 py-3 text-center ${activeTab === "deposit" ? "border-b-2 border-[#ffb400] text-[#ffb400]" : "hover:text-[#ffb400]"}`}
          >
            Para Yatır
          </button>
          <button
            onClick={() => setActiveTab("withdraw")}
            className={`flex-1 py-3 text-center ${activeTab === "withdraw" ? "border-b-2 border-[#ffb400] text-[#ffb400]" : "hover:text-[#ffb400]"}`}
          >
            Para Çekme
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-3 text-center ${activeTab === "history" ? "border-b-2 border-[#ffb400] text-[#ffb400]" : "hover:text-[#ffb400]"}`}
          >
            Geçmiş
          </button>
          <button
            onClick={() => setActiveTab("lossbonus")}
            className={`flex-1 py-3 text-center ${activeTab === "lossbonus" ? "border-b-2 border-[#ffb400] text-[#ffb400]" : "hover:text-[#ffb400]"}`}
          >
            Kayıp Bonusu
          </button>
        </div>

        {/* İçerik */}
        <div className="p-6 text-white">
          {/* Mesaj kutusu */}
          {message && (
            <div className="mb-4 bg-green-800/30 border border-green-700 text-green-200 p-3 rounded">
              {message}
            </div>
          )}

          {/* PARA YATIR */}
          {activeTab === "deposit" && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-[#ffb400] font-bold text-lg">Adım 1</h3>
                <p className="mb-4">Bonus seç</p>
                <div className="max-w-md mx-auto relative">
                  <select
                    value={bonus}
                    onChange={(e) => setBonus(e.target.value)}
                    className="w-full bg-transparent border border-gray-500 rounded-lg py-3 px-4 text-white appearance-none"
                  >
                    <option>Bonus istemiyorum.</option>
                    <option>%10 Hoşgeldin Bonusu</option>
                    <option>%15 Kayıp Bonusu</option>
                  </select>
                  <span className="absolute right-4 top-3 text-white pointer-events-none">▾</span>
                </div>
              </div>

              <hr className="border-gray-700" />

              <div className="text-center">
                <h3 className="text-[#ffb400] font-bold text-lg">Adım 2</h3>
                <p className="mb-4">Ödeme yöntemi seç</p>
                <div className="max-w-md mx-auto relative">
                  <select
                    value={depositMethod}
                    onChange={(e) => setDepositMethod(e.target.value)}
                    className="w-full bg-transparent border border-gray-500 rounded-lg py-3 px-4 text-white appearance-none"
                  >
                    <option>Tüm yöntemleri göster</option>
                    <option>Kripto</option>
                    <option>Havale / EFT</option>
                    <option>QR Kod</option>
                  </select>
                  <span className="absolute right-4 top-3 text-white pointer-events-none">▾</span>
                </div>

                <div className="mt-6 max-w-md mx-auto">
                  <label className="block text-left text-sm mb-2">Yatırılacak miktar (₺)</label>
                  <input
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Örn: 100"
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={handleDepositClick}
                  className="bg-white text-black font-bold py-3 px-8 rounded-md hover:bg-gray-200 disabled:opacity-60"
                >
                  {loading ? "İşleniyor..." : "PARA YATIR"}
                </button>
              </div>
            </div>
          )}

          {/* PARA ÇEKME */}
          {activeTab === "withdraw" && (
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {/* Left column */}
              <div className="mb-6 md:mb-0">
                <div className="text-center mb-4">
                  <h4 className="text-sm text-gray-300">Çekilebilir</h4>
                  <div className="text-yellow-400 font-bold mt-1">₺ {user ? user.balance.toFixed(2) : "0,00"}</div>
                </div>

                <div className="max-w-md">
                  <label className="block text-sm mb-2">Para çekme yöntemi seç</label>
                  <div className="relative">
                    <select
                      value={withdrawMethod}
                      onChange={(e) => setWithdrawMethod(e.target.value)}
                      className="w-full bg-transparent border border-gray-500 rounded-lg py-3 px-4 text-white appearance-none"
                    >
                      <option>Tüm yöntemleri göster</option>
                      <option>Havale / EFT</option>
                      <option>Kripto</option>
                      <option>Ödeme sağlayıcı</option>
                    </select>
                    <span className="absolute right-4 top-3 text-white">▾</span>
                  </div>

                  <div className="mt-6 text-sm text-gray-300">
                    <div>Limitler</div>
                    <div className="text-gray-400 mt-2">---</div>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div>
                <div className="text-center mb-4">
                  <h4 className="text-sm text-gray-300">Toplam Bakiye</h4>
                  <div className="text-yellow-400 font-bold mt-1">₺ {user ? user.balance.toFixed(2) : "0,00"}</div>
                </div>

                <div className="max-w-md">
                  <label className="block text-sm mb-2">Para çekme miktarını girin.</label>
                  <input
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Örn: 100"
                    className="w-full bg-gray-800 border border-gray-600 rounded-full py-3 px-4 text-white focus:outline-none"
                  />

                  {withdrawError && (
                    <div className="mt-3 text-sm text-red-400 font-medium">{withdrawError}</div>
                  )}

                  <div className="mt-6">
                    <button
                      onClick={handleWithdrawClick}
                      className="w-full bg-white text-black font-bold py-3 px-6 rounded-md hover:bg-gray-200"
                    >
                      {loading ? "İşleniyor..." : "Para çekme"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* GEÇMİŞ */}
          {activeTab === "history" && renderHistory()}

          {/* KAYIP BONSU */}
          {activeTab === "lossbonus" && (
            <div className="py-8 text-center text-gray-300">
              <h3 className="text-[#ffb400] font-bold mb-2">Kayıp Bonusu</h3>
              <p>Bu bölüm henüz aktif değil. (Demo)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
