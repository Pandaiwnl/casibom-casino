import { useState, useEffect } from "react";

type UserLike = {
  id?: string;
  balance: number;
  [k: string]: any;
};

interface PaymentModalProps {
  onClose: () => void;
  user?: UserLike | null;
  onDeposit?: (amount: number) => void;
  onWithdraw?: (amount: number) => void;
}

export default function PaymentModal({ onClose, user, onDeposit, onWithdraw }: PaymentModalProps) {
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw" | "history" | "lossbonus">("deposit");
  const [depositMethod, setDepositMethod] = useState<string>("");
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const methods = [
    { id: "tether", name: "Tether TRC20", img: "/icons/tether-trc20.png", min: 100, max: 5000000 },
    { id: "fast", name: "FAST Havale", img: "/icons/fast-havale.png", min: 50, max: 1000000 },
    { id: "havale", name: "Havale / EFT", img: "/icons/havale-eft.png", min: 50, max: 1000000 },
    { id: "papara", name: "Papara", img: "/icons/papara.png", min: 50, max: 500000 },
    { id: "parolapara", name: "Parolapara", img: "/icons/parolapara.png", min: 50, max: 250000 },
    { id: "mefete", name: "Mefete", img: "/icons/mefete.png", min: 50, max: 250000 },
    { id: "anindapara", name: "Anında Para", img: "/icons/aninda-para.png", min: 100, max: 250000 },
    { id: "papel", name: "Papel", img: "/icons/papel.png", min: 50, max: 250000 },
    { id: "kripto", name: "Kripto Ödeme", img: "/icons/kripto.png", min: 200, max: 10000000 },
  ];

  useEffect(() => {
    if (message) {
      const t = setTimeout(() => setMessage(null), 3500);
      return () => clearTimeout(t);
    }
  }, [message]);

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      setMessage("Lütfen geçerli bir miktar girin.");
      return;
    }
    if (!depositMethod) {
      setMessage("Lütfen bir yöntem seçin.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onDeposit) onDeposit(amount);
      setMessage(`${depositMethod} ile ${amount}₺ yatırma talebi alındı.`);
      setDepositAmount("");
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-4xl bg-[#111] rounded-lg overflow-hidden shadow-xl">
        {/* Header */}
        <div className="bg-[#ffb400] flex items-center justify-between px-4 py-3">
          <div className="text-black font-bold">ÖDEME İŞLEMLERİ</div>
          <button onClick={onClose} className="text-black text-2xl font-bold">✕</button>
        </div>

        {/* Tabs */}
        <div className="flex text-white text-lg">
          {["deposit", "withdraw", "history", "lossbonus"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 py-3 text-center ${
                activeTab === tab
                  ? "border-b-2 border-[#ffb400] text-[#ffb400]"
                  : "hover:text-[#ffb400]"
              }`}
            >
              {tab === "deposit"
                ? "Para Yatır"
                : tab === "withdraw"
                ? "Para Çekme"
                : tab === "history"
                ? "Geçmiş"
                : "Kayıp Bonusu"}
            </button>
          ))}
        </div>

        {/* İçerik */}
        <div className="p-6 text-white">
          {message && (
            <div className="mb-4 bg-green-800/30 border border-green-700 text-green-200 p-3 rounded">
              {message}
            </div>
          )}

          {/* PARA YATIR */}
          {activeTab === "deposit" && (
            <div>
              <h3 className="text-[#ffb400] font-bold text-lg mb-6 text-center">Ödeme Yöntemleri</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {methods.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setDepositMethod(m.name)}
                    className={`border rounded-xl p-4 flex flex-col items-center justify-center space-y-2 transition ${
                      depositMethod === m.name
                        ? "border-[#ffb400] bg-[#ffb400]/10"
                        : "border-gray-600 hover:border-[#ffb400]/70"
                    }`}
                  >
                    <img src={m.img} alt={m.name} className="h-10 object-contain" />
                    <div className="text-sm font-bold">{m.name}</div>
                    <div className="text-xs text-gray-400">
                      ₺{m.min.toLocaleString()} - ₺{m.max.toLocaleString()}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-8 max-w-md mx-auto">
                <label className="block text-sm mb-2">Yatırılacak miktar (₺)</label>
                <input
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Örn: 100"
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none"
                />

                <button
                  onClick={handleDeposit}
                  className="mt-6 w-full bg-[#ffb400] text-black font-bold py-3 px-6 rounded-lg hover:bg-[#ffcc33] transition disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "İşleniyor..." : "PARA YATIR"}
                </button>
              </div>
            </div>
          )}

          {/* DİĞER TABLAR (eski haliyle korundu) */}
          {activeTab === "withdraw" && (
            <div className="text-center text-gray-300 py-12">Para çekme ekranı yakında aktif edilecek.</div>
          )}
          {activeTab === "history" && (
            <div className="py-12 text-center text-red-400">
              Geçmiş verisi yüklenemedi. Lütfen daha sonra tekrar deneyin.
            </div>
          )}
          {activeTab === "lossbonus" && (
            <div className="py-12 text-center text-gray-300">
              Kayıp bonusu özelliği yakında eklenecek.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
