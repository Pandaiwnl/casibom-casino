import React from "react";

interface PaymentMethodsModalProps {
  onClose: () => void;
  onSelect: (method: string) => void;
}

const methods = [
  { name: "Tether USDT TRC20", image: "/images/101233.png", limit: "₺200 - ₺5.000.000" },
  { name: "Tron TRX TRC20", image: "/images/101241.png", limit: "₺100 - ₺5.000.000" },
  { name: "FAST Havale", image: "/images/101249.png", limit: "₺100 - ₺100.000" },
  { name: "Tüm Bankalar FAST", image: "/images/101256.png", limit: "₺250 - ₺100.000" },
  { name: "BankPay", image: "/images/101304.png", limit: "₺100 - ₺100.000" },
  { name: "JET Havale", image: "/images/101313.png", limit: "₺100 - ₺100.000" },
  { name: "Otomatik Havale", image: "/images/101323.png", limit: "₺100 - ₺100.000" },
  { name: "Süper Havale", image: "/images/101337.png", limit: "₺500 - ₺100.000" },
  { name: "HavalePAY", image: "/images/101402.png", limit: "₺100 - ₺100.000" },
  { name: "FASTPay", image: "/images/101409.png", limit: "₺250 - ₺10.000" },
  { name: "Papara", image: "/images/101417.png", limit: "₺1.000 - ₺250.000" },
  { name: "Papara Hemen", image: "/images/101424.png", limit: "₺500 - ₺100.000" },
  { name: "Tether USDT ERC20", image: "/images/101431.png", limit: "₺100 - ₺5.000.000" },
  { name: "Bitcoin", image: "/images/101438.png", limit: "₺1.000 - ₺5.000.000" },
  { name: "Ethereum", image: "/images/101445.png", limit: "₺500 - ₺5.000.000" },
  { name: "Litecoin", image: "/images/101452.png", limit: "₺100 - ₺5.000.000" },
  { name: "Solana", image: "/images/101501.png", limit: "₺100 - ₺5.000.000" },
  { name: "Papel", image: "/images/101507.png", limit: "₺250 - ₺250.000" },
  { name: "Paratim", image: "/images/101513.png", limit: "₺100 - ₺250.000" },
  { name: "Parolapara", image: "/images/101522.png", limit: "₺250 - ₺250.000" },
  { name: "BankFast", image: "/images/101529.png", limit: "₺100 - ₺100.000" },
];

export default function PaymentMethodsModal({ onClose, onSelect }: PaymentMethodsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center overflow-y-auto">
      <div className="w-full max-w-md bg-[#111] text-white">
        <div className="bg-[#ffb400] text-black font-bold text-center py-3 sticky top-0">
          Ödeme yöntemi seç
        </div>

        {methods.map((m, i) => (
          <button
            key={i}
            onClick={() => {
              onSelect(m.name);
              onClose();
            }}
            className="w-full flex items-center justify-between border-b border-gray-700 py-3 px-4 hover:bg-[#222] transition"
          >
            <div className="flex items-center space-x-3">
              <img src={m.image} alt={m.name} className="w-16 h-auto rounded-md" />
              <span className="font-semibold">{m.name}</span>
            </div>
            <div className="text-sm text-yellow-400">{m.limit}</div>
          </button>
        ))}

        <div className="py-4 text-center">
          <button
            onClick={onClose}
            className="bg-[#ffb400] text-black font-bold py-2 px-6 rounded-md hover:bg-[#ffc933]"
          >
            KAPAT
          </button>
        </div>
      </div>
    </div>
  );
}
