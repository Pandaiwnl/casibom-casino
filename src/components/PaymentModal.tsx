import { useState, useEffect } from "react";

type UserLike = {
  id?: string;
  balance: number;
  [k: string]: any;
};

interface PaymentModalProps {
  onClose: () => void;
  user?: UserLike | null;
  onSuccess?: (newBalance: number) => void;
}

export default function PaymentModal({ onClose, user, onSuccess }: PaymentModalProps) {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw' | 'history' | 'loss'>('deposit');
  const [bonus, setBonus] = useState("Bonus istemiyorum.");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [methodsOverlayOpen, setMethodsOverlayOpen] = useState(false);
  const [bonusOverlayOpen, setBonusOverlayOpen] = useState(false);
  const [selectedBonus, setSelectedBonus] = useState<string>("Bonus istemiyorum.");

  const [paymentImages, setPaymentImages] = useState<{ id: string; src: string; alt: string; limit?: string }[]>([]);

  // Bonus seçenekleri
  const bonusOptions = [
    {
      id: "first-deposit",
      title: "%100 İlk Yatırım Casino Bonusu (1000 TL'ye kadar)",
      image: "/bonus5.png",
      description: "İlk yatırımınızda %100 bonus kazanın!"
    },
    {
      id: "second-deposit",
      title: "%50 2. Yatırım Casino Bonusu (500 TL'ye kadar)",
      image: "/bonus4.png",
      description: "İkinci yatırımınızda %50 bonus kazanın!"
    },
    {
      id: "third-deposit",
      title: "%50 3. Yatırım Casino Bonusu (500 TL'ye kadar)",
      image: "/bonus1 (1).png",
      description: "Üçüncü yatırımınızda %50 bonus kazanın!"
    },
    {
      id: "wager-free",
      title: "10% Çevrimsiz Casino Bonusu",
      image: "/bonus2.png",
      description: "Çevrim şartı olmayan %10 bonus!"
    },
    {
      id: "crypto-bonus",
      title: "20% Kripto Bonusu",
      image: "/bonus3.png",
      description: "Kripto para yatırımlarında %20 bonus!"
    },
    {
      id: "no-bonus",
      title: "Bonus istemiyorum.",
      image: null,
      description: "Herhangi bir bonus almak istemiyorum."
    }
  ];

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

  const selected = selectedMethod ? paymentImages.find(p => p.id === selectedMethod) : null;

  // limit'i parse et: ₺200 - ₺5.000.000 → [200, 5000000]
  const parseLimit = (limit?: string) => {
    if (!limit) return [0, Infinity];
    const match = limit.match(/₺([\d.,]+)\s*-\s*₺([\d.,]+)/);
    if (!match) return [0, Infinity];
    const min = parseFloat(match[1].replace(/[.,]/g, "").slice(0, -2)) || 0;
    const max = parseFloat(match[2].replace(/[.,]/g, "").slice(0, -2)) || Infinity;
    return [min, max];
  };

  const [minLimit, maxLimit] = parseLimit(selected?.limit);

  const validateAmount = (amount: string) => {
    const value = parseFloat(amount);
    if (!selected || isNaN(value)) return setError(null);
    if (value < minLimit) setError(`Minimum limit ₺${minLimit.toLocaleString("tr-TR")}`);
    else if (value > maxLimit) setError(`Maksimum limit ₺${maxLimit.toLocaleString("tr-TR")}`);
    else setError(null);
  };

  const handleDeposit = () => {
    if (!selected) return setMessage("Lütfen bir ödeme yöntemi seçin.");
    const value = parseFloat(depositAmount);
    if (isNaN(value) || value < minLimit || value > maxLimit)
      return setMessage("Lütfen geçerli bir miktar girin (limit aralığında).");

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (user && onSuccess) {
        const newBalance = user.balance + value;
        onSuccess(newBalance);
      }
      setMessage("Para yatırma işlemi başarılı!");
      setDepositAmount("");
    }, 1000);
  };

  const handleWithdraw = () => {
    if (!selected) return setMessage("Lütfen bir para çekme yöntemi seçin.");
    const value = parseFloat(withdrawAmount);
    if (isNaN(value) || value < minLimit || value > maxLimit)
      return setMessage("Lütfen geçerli bir miktar girin (limit aralığında).");

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage("Para çekme talebiniz alındı!");
      setWithdrawAmount("");
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-4xl bg-[#111] rounded-lg overflow-hidden shadow-xl">
        {/* Üst Bar */}
        <div className="bg-[#ffb400] flex items-center justify-between px-4 py-3">
          <div />
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
              onClick={() => {
                setActiveTab(t.key as any);
                setMessage(null);
                setError(null);
              }}
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

          {/* PARA YATIR */}
          {activeTab === "deposit" && (
            <div>
              {/* Adım 1 */}
              <div className="text-center mb-6">
                <h3 className="text-[#ffb400] font-bold text-lg mb-2">Adım 1</h3>
                <p className="mb-4">Bonus seç</p>
                <button
                  onClick={() => setBonusOverlayOpen(true)}
                  className="bg-transparent border border-gray-600 text-white rounded-lg px-4 py-3 w-full max-w-md mx-auto block flex items-center justify-between"
                >
                  <span>{selectedBonus}</span>
                  <span>▾</span>
                </button>
              </div>

              <hr className="border-gray-700 my-6" />

              {/* Adım 2 */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Sol */}
                <div>
                  <h3 className="text-center text-[#ffb400] font-bold text-lg mb-2">Adım 2</h3>
                  <p className="text-center mb-4">Ödeme yöntemi seç</p>

                  <button
                    onClick={() => setMethodsOverlayOpen(true)}
                    className="bg-transparent border border-gray-600 text-white rounded-lg px-4 py-3 w-full flex items-center justify-between"
                  >
                    {selected ? (
                      <div className="flex items-center gap-3">
                        <div className="bg-white rounded-md p-1 w-28 h-10 flex items-center justify-center">
                          <img src={selected.src} alt={selected.alt} className="max-h-8 object-contain" />
                        </div>
                      </div>
                    ) : (
                      <span>Tüm yöntemleri göster</span>
                    )}
                    <span>▾</span>
                  </button>

                  <div className="mt-6 text-sm text-gray-300">
                    <div>Limitler</div>
                    <div className="text-gray-400 mt-2">{selected?.limit || '---'}</div>
                  </div>
                </div>

                {/* Sağ */}
                <div className="flex items-center justify-center">
                  <div className="text-center space-y-4">
                    {selected && (
                      <div className="max-w-xs">
                        <label className="block text-left text-sm mb-2">Yatırılacak miktar (₺)</label>
                        <input
                          type="number"
                          min={minLimit}
                          max={maxLimit}
                          step="0.01"
                          value={depositAmount}
                          onChange={(e) => {
                            setDepositAmount(e.target.value);
                            validateAmount(e.target.value);
                          }}
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none"
                          placeholder={`Min ₺${minLimit.toLocaleString("tr-TR")}`}
                        />
                        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                      </div>
                    )}

                    <button
                      disabled={loading || !selected}
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

          {/* PARA ÇEKME */}
          {activeTab === "withdraw" && (
            <div className="md:grid md:grid-cols-2 md:gap-8 text-white">
              {/* Sol */}
              <div className="mb-6 md:mb-0">
                <div className="text-center mb-2">
                  <div className="text-sm text-gray-300">Çekilebilir</div>
                  <div className="text-yellow-400 font-bold mt-1">
                    ₺ {user ? user.balance.toFixed(2) : "0,00"}
                  </div>
                </div>

                <h3 className="text-[#ffb400] font-bold text-lg mt-2 mb-3 text-center">Adım 1</h3>
                <p className="text-center mb-3">Para çekme yöntemi seç</p>

                <div className="max-w-md mx-auto">
                  <button
                    type="button"
                    onClick={() => setMethodsOverlayOpen(true)}
                    className="bg-transparent border border-gray-500 rounded-lg py-3 px-4 w-full flex items-center justify-between text-white hover:border-[#ffb400]/80 transition-colors"
                  >
                    <span>{selected ? selected.alt : "Tüm yöntemleri göster"}</span>
                    <i className="fas fa-chevron-down"></i>
                  </button>

                  <div className="mt-4">
                    <div className="text-sm text-gray-400 mb-1">Limitler</div>
                    <div className="text-gray-500">{selected?.limit || "---"}</div>
                  </div>
                </div>
              </div>

              {/* Sağ */}
              <div className="flex flex-col items-center justify-center md:border-l md:border-white/10">
                <div className="text-center mb-2">
                  <div className="text-sm text-gray-300">Toplam Bakiye</div>
                  <div className="text-yellow-400 font-bold mt-1">
                    ₺ {user ? user.balance.toFixed(2) : "0,00"}
                  </div>
                </div>

                <h3 className="text-[#ffb400] font-bold text-lg mt-2 mb-3">Adım 2</h3>
                <p className="mb-4 text-white/90">Para çekme miktarını girin.</p>

                <input
                  type="number"
                  min={minLimit}
                  max={maxLimit}
                  step="0.01"
                  value={withdrawAmount}
                  onChange={(e) => {
                    setWithdrawAmount(e.target.value);
                    validateAmount(e.target.value);
                  }}
                  placeholder={`Min ₺${minLimit.toLocaleString("tr-TR")}`}
                  className="w-64 bg-gray-800 border border-gray-600 rounded-full py-3 px-4 text-center text-white focus:outline-none"
                />
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

                <button
                  onClick={handleWithdraw}
                  disabled={loading}
                  className="w-64 mt-6 bg-white text-black font-bold py-3 px-6 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-60"
                >
                  {loading ? "İşleniyor..." : "Para çekme"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ÖDEME YÖNTEMLERİ POPUP */}
      {methodsOverlayOpen && (
        <div className="fixed inset-0 z-[55] flex items-center justify-center bg-black/80 p-4">
          <div className="bg-[#111] rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl border border-[#ffb400]/40">
            <div className="bg-[#ffb400] text-black flex items-center justify-between px-4 py-3">
              <span className="font-bold">Ödeme yöntemi seç</span>
              <button onClick={() => setMethodsOverlayOpen(false)} className="text-2xl font-bold hover:opacity-80">✕</button>
            </div>

            <div className="max-h-[80vh] overflow-y-auto divide-y divide-white/10">
              {paymentImages.map((img) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => {
                    setSelectedMethod(img.id);
                    setMethodsOverlayOpen(false);
                    setError(null);
                    setMessage(null);
                  }}
                  className={`w-full flex items-center justify-between gap-6 px-6 py-6 text-left transition-all duration-200 border-l-4 ${
                    selectedMethod === img.id
                      ? "border-[#ffb400] bg-white/10"
                      : "border-transparent hover:border-[#ffb400]/80 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <div className="w-40 h-20 flex items-center justify-center">
                      <img 
                        src={img.src} 
                        alt={img.alt} 
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="hidden w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-600 text-sm font-bold">{img.alt}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-bold text-sm">{img.alt}</div>
                      <div className="text-[#ffb400] text-xs">Limitler: {img.limit || "—"}</div>
                    </div>
                  </div>

                  <i className="fas fa-chevron-right text-white/40"></i>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* BONUS SEÇİMİ POPUP */}
      {bonusOverlayOpen && (
        <div className="fixed inset-0 z-[55] flex items-center justify-center bg-black/80 p-4">
          <div className="bg-[#111] rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl border border-[#ffb400]/40">
            <div className="bg-[#ffb400] text-black flex items-center justify-end px-4 py-3">
              <button onClick={() => setBonusOverlayOpen(false)} className="text-2xl font-bold hover:opacity-80">✕</button>
            </div>

            <div className="px-4 py-3 border-b border-white/10">
              <h3 className="text-[#ffb400] font-bold text-lg text-center">Bonus seç</h3>
            </div>

            <div className="max-h-[80vh] overflow-y-auto divide-y divide-white/10">
              {bonusOptions.map((bonus) => (
                <button
                  key={bonus.id}
                  type="button"
                  onClick={() => {
                    setSelectedBonus(bonus.title);
                    setBonus(bonus.title);
                    setBonusOverlayOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-6 px-6 py-6 text-left transition-all duration-200 border-l-4 ${
                    selectedBonus === bonus.title
                      ? "border-[#ffb400] bg-white/10"
                      : "border-transparent hover:border-[#ffb400]/80 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-6">
                    {/* Checkbox */}
                    <div className={`w-6 h-6 border-2 rounded flex items-center justify-center ${
                      selectedBonus === bonus.title 
                        ? "bg-[#ffb400] border-[#ffb400]" 
                        : "border-white bg-transparent"
                    }`}>
                      {selectedBonus === bonus.title && (
                        <span className="text-black text-lg font-bold">✓</span>
                      )}
                    </div>

                    {/* Bonus Image */}
                    {bonus.image && (
                      <div className="w-40 h-20 flex items-center justify-center">
                        <img 
                          src={bonus.image} 
                          alt={bonus.title} 
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <div className="hidden w-full h-full bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-gray-600 text-sm font-bold">BONUS</span>
                        </div>
                      </div>
                    )}

                    {/* Bonus Text */}
                    <div className="flex-1">
                      <div className="text-[#ffb400] text-sm font-medium">{bonus.description}</div>
                    </div>
                  </div>

                  {/* DAHA FAZLA Button - sadece bonus seçenekleri için */}
                  {bonus.id !== "no-bonus" && (
                    <div className="flex items-center gap-3">
                      <button 
                        className="bg-[#ffb400] text-black px-4 py-2 rounded text-sm font-bold hover:bg-yellow-400 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          // DAHA FAZLA butonuna tıklandığında bonus detaylarını göster
                        }}
                      >
                        DAHA FAZLA
                      </button>
                      <i className="fas fa-chevron-right text-white/40 text-lg"></i>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="bg-[#ffb400] p-4">
              <button
                onClick={() => setBonusOverlayOpen(false)}
                className="w-full bg-[#ffb400] text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors"
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
