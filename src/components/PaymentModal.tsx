import { useState } from 'react';
import { User } from '../App';

interface PaymentModalProps {
  onClose: () => void;
  onSuccess: (newBalance: number) => void;
  user: User | null;
}

export default function PaymentModal({ onClose, onSuccess, user }: PaymentModalProps) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const predefinedAmounts = [50, 100, 250, 500, 1000, 2000];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!user) {
      setError('Kullanıcı bulunamadı');
      setLoading(false);
      return;
    }

    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      setError('Geçerli bir miktar girin');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/payment/deposit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          amount: depositAmount
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess(data.newBalance);
      } else {
        setError(data.message || 'Para yatırılamadı');
      }
    } catch (error) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const handleAmountSelect = (selectedAmount: number) => {
    setAmount(selectedAmount.toString());
  };

  return (
    <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="bg-primary border border-secondary/20 rounded-xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-white">Para Yatır</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        {user && (
          <div className="bg-secondary/20 border border-secondary/30 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-white font-bold">Mevcut Bakiye:</span>
              <span className="text-secondary font-black text-xl">
                {user.balance.toFixed(2)} TL
              </span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white font-bold mb-4">
              Yatırılacak Miktar
            </label>
            
            {/* Predefined amounts */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {predefinedAmounts.map((predefinedAmount) => (
                <button
                  key={predefinedAmount}
                  type="button"
                  onClick={() => handleAmountSelect(predefinedAmount)}
                  className={`py-3 px-4 rounded-lg font-bold transition-colors ${
                    amount === predefinedAmount.toString()
                      ? 'bg-secondary text-primary'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  {predefinedAmount} TL
                </button>
              ))}
            </div>

            {/* Custom amount input */}
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Özel miktar girin"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-secondary"
              min="1"
              step="0.01"
            />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-3">
            <button
              type="submit"
              disabled={loading || !amount}
              className="w-full bg-secondary hover:bg-secondary/90 text-primary font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Para yatırılıyor...' : 'Para Yatır'}
            </button>
            
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              İptal
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-300 text-sm">
            <i className="fas fa-shield-alt text-green-400 mr-2"></i>
            Güvenli ödeme sistemi
          </p>
        </div>
      </div>
    </div>
  );
}

