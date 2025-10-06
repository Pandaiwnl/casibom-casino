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
}

export default function PaymentModal({ onClose, user, onDeposit }: PaymentModalProps) {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw' | 'history' | 'loss'>('deposit');
  const [bonus, setBonus] = useState("Bonus istemiyorum.");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [methodsOverlayOpen, setMethodsOverlayOpen] = useState(false);

  // Ödeme görselleri public/odeme-yontemleri klasöründen yüklenir
  const [paymentImages, setPaymentImages] = useState<{ id: string; src: string; alt: string; limit?: string }[]>([]);

  useEffect(() => {
    const methods = [
      { src: "/odeme-yontemleri/101233.png", alt: "Tether USDT TRC20", limit: "₺200 - ₺5.000.000" },
      { src: "/odeme-yontemleri/101241.png", alt: "Tron TRX", limit: "₺100 - ₺5.000.000" },
      { src: "/odeme-yontemleri/101249.png", alt: "FAST Havale", limit: "₺100 - ₺100.000" },
      { src: "/odeme-yontemleri/101256.png", alt: "Tüm Bankalar FAST", limit: "₺250 - ₺100.000" },
      { src: "/odeme-yontemleri/101304.png", alt: "BankPay", limit: "₺100 - ₺100.000" },
      { src: "/odeme-yontemleri/101313.png", alt: "JET Havale", limit: "₺100 - ₺100.000" },
      { src: "/odeme-yontemleri/101323.png", alt: "Otomatik Havale", limit: "₺100 - ₺100.000" },
      { src: "/odeme-yontemleri/101329.png", alt: "Süper Havale", limit: "₺500 - ₺100.000" },
      { src: "/odeme-yontemleri/101337.png", alt: "HavalePay", limit: "₺100 - ₺100.000" },
      { src: "/odeme-yontemleri/101402.png", alt: "FASTPAY", limit: "₺250 - ₺10.000" },
      { src: "/odeme-yontemleri/101417.png", alt: "Papara", limit: "₺500 - ₺100.000" },
      { src: "/odeme-yontemleri/101424.png", alt: "Papara Hemen", limit: "₺1.000 - ₺250.000" },
      { src: "/odeme-yontemleri/101431.png", alt: "Tether ERC20", limit: "₺100 - ₺5.000.000" },
      { src: "/odeme-yontemleri/101438.png", alt: "USDC ERC20", limit: "₺100 - ₺5.000.000" },
      { src: "/odeme-yontemleri/101445.png", alt: "Bitcoin", limit: "₺1.000 - ₺5.000.000" },
      { src: "/odeme-yontemleri/101501.png", alt: "Ethereum", limit: "₺500 - ₺5.000.000" },
      { src: "/odeme-yontemleri/101507.png", alt: "Litecoin", limit: "₺100 - ₺5.000.000" },
      { src: "/odeme-yontemleri/101513.png", alt: "Solana", limit: "₺100 - ₺5.000.000" },
      { src: "/odeme-yontemleri/101522.png", alt: "Papel", limit: "₺250 - ₺250.000" },
      { src: "/odeme-yontemleri/101529.png", alt: "Parolapara", limit: "₺250 - ₺250.000" },
    ];
    setPaymentImages(methods.map((m, idx) => ({ id: String(idx + 1), ...m })));
  }, []);

  const handleDeposit = () => {
    if (!selectedMethod) {
      setMessage("Lütfen bir ödeme yöntemi seçin.");
      return;
    }
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      setMessage("Geçerli bir miktar girin.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onDeposit?.(parseFloat(depositAmount));
      setMessage("Para yatırma işlemi başarılı!");
      setDepositAmount("");
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-4xl bg-[#111] rounded-lg overflow-hidden shadow-xl">
        {/* Üst Başlık */}
        <div className="bg-[#ffb400] flex items-center justify-between px-4 py-3">
          <h2 className="text-black font-bold">PARA YATIR</h2>
          <button onClick={onClose} className="text-black text-2xl font-bold">✕</button>
        </div>

        {/* Sekmeler */}
        <nav className="px-6 pt-3 border-b border-white/10 text-white/80 flex gap-6">
          {[
            { key: 'deposit', label: 'Para Yatır' },
            { key: 'withdraw', label: 'Para Çekme' },
            { key: 'history', label: 'Geçmiş' },
            { key: 'loss', label: 'Kayıp Bonusu' },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key as any)}
              className={`pb-3 -mb-px border-b-2 ${
                activeTab === t.key ? 'text-white border-[#ffb400]' : 'border-transparent hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* İçerik */}
        <div className="p-6 text-white">
          {message && (
            <div className="mb-4 bg-green-800/30 border border-green-700 text-green-200 p-3 rounded text-center">
              {message}
            </div>
          )}

          {activeTab === "deposit" && (
            <div>
              <div className="text-center mb-6">
                <h3 className="text-[#ffb400] font-bold text-lg mb-2">Adım 1</h3>
                <p className="mb-4">Bonus seç</p>
                <select
                  value={bonus}
                  onChange={(e) => setBonus(e.target.value)}
                  className="bg-transparent border border-gray-600 text-white rounded-lg px-4 py-3 w-full max-w-md mx-auto block"
                >
                  <option>Bonus istemiyorum.</option>
                  <option>%10 Hoşgeldin Bonusu</option>
                  <option>%15 Kayıp Bonusu</option>
                </select>
              </div>

              <hr className="border-gray-700 my-6" />

              {/* Adım 2 */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-center text-[#ffb400] font-bold text-lg mb-2">Adım 2</h3>
                  <p className="text-center mb-4">Ödeme yöntemi seç</p>

                  <button
                    onClick={() => setMethodsOverlayOpen(true)}
                    className="bg-transparent border border-gray-600 text-white rounded-lg px-4 py-3 w-full flex items-center justify-between"
                  >
                    <span>{selectedMethod ? selectedMethod : "Tüm yöntemleri göster"}</span>
                    <span>▾</span>
                  </button>

                  <div className="mt-6 text-sm text-gray-300">
                    <div>Limitler</div>
                    <div className="text-gray-400 mt-2">---</div>
                  </div>
                </div>

                {/* Sağ taraf - para yatır */}
                <div className="flex items-center justify-center">
                  <div className="text-center space-y-4">
                    {selectedMethod && (
                      <div className="max-w-xs">
                        <label className="block text-left text-sm mb-2">Yatırılacak miktar (₺)</label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none"
                          placeholder="Örn: 100"
                        />
                      </div>
                    )}

                    <button
                      disabled={loading || !selectedMethod}
                      onClick={handleDeposit}
                      className="bg-white text-black font-bold py-3 px-10 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                    >
                      {loading ? "İşleniyor..." : "PARA YATIR"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab !== "deposit" && (
            <div className="py-12 text-center text-gray-400">
              {activeTab === "history" || activeTab === "loss" ? (
                <div className="bg-red-800/20 border border-red-600 text-red-300 inline-block px-6 py-4 rounded-lg">
                  Bir hata oluştu. Lütfen daha sonra tekrar deneyin.
                </div>
              ) : (
                "Bu sekme yakında aktif olacak."
              )}
            </div>
          )}
        </div>
      </div>

      {/* Ödeme yöntemleri listesi overlay (yenilenmiş) */}
      {methodsOverlayOpen && (
        <div className="fixed inset-0 z-[55] flex items-center justify-center bg-black/80 p-4">
          <div className="bg-[#111] rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl border border-[#ffb400]/40">
            {/* Üst bar */}
            <div className="bg-[#ffb400] text-black flex items-center justify-between px-4 py-3">
              <span className="font-bold">Ödeme yöntemi seç</span>
              <button onClick={() => setMethodsOverlayOpen(false)} className="text-2xl font-bold hover:opacity-80">✕</button>
            </div>

            {/* Liste */}
            <div className="max-h-[80vh] overflow-y-auto divide-y divide-white/10">
              {paymentImages.map((img) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => {
                    setSelectedMethod(img.id);
                    setMethodsOverlayOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-4 px-4 py-3 text-left transition-all duration-200 border-l-4 ${
                    selectedMethod === img.id
                      ? "border-[#ffb400] bg-white/10"
                      : "border-transparent hover:border-[#ffb400]/80 hover:bg-white/5"
                  }`}
                >
                  {/* Sol kısım: logo + isim */}
                  <div className="flex items-center gap-4">
                    <div className="bg-white rounded-md p-2 w-28 h-12 flex items-center justify-center">
                      <img src={img.src} alt={img.alt} className="max-h-10 object-contain" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">{img.alt}</div>
                      <div className="text-[#ffb400] text-xs">Limitler: {img.limit || "—"}</div>
                    </div>
                  </div>

                  {/* Sağ ok */}
                  <i className="fas fa-chevron-right text-white/40"></i>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

