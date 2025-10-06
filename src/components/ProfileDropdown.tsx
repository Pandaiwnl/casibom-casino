import { useState } from 'react';
import { User } from '../App';

interface ProfileDropdownProps {
  user: User;
  onClose: () => void;
  onLogout: () => void;
  onPayment: () => void;
}

export default function ProfileDropdown({ user, onClose, onLogout, onPayment }: ProfileDropdownProps) {
  const [showAccountDetails, setShowAccountDetails] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-sm bg-[#111] rounded-lg overflow-hidden shadow-xl">
        {/* Üst Bar - Kullanıcı Adı */}
        <div className="bg-yellow-500 text-black text-center py-3">
          <div className="font-bold text-lg">{user.username}</div>
        </div>

        {/* Ana İçerik Alanı */}
        <div className="bg-gradient-to-br from-purple-900/20 to-black p-6">
          <div className="space-y-4">
            {/* KAYIP BONUSU */}
            <div className="flex justify-between items-center">
              <span className="text-white text-sm">KAYIP BONUSU</span>
              <button 
                onClick={() => {
                  onClose();
                  onPayment();
                }}
                className="bg-green-500 text-white px-4 py-2 rounded font-bold text-sm hover:bg-green-600 transition-colors"
              >
                KAYIP BONUSU AL
              </button>
            </div>

            {/* MESAJLAR */}
            <div className="flex justify-between items-center">
              <span className="text-white text-sm">MESAJLAR</span>
              <span className="text-white text-sm">HİÇ MESAJINIZ YOK</span>
            </div>

            {/* VIP SEVİYENİZ */}
            <div className="flex justify-between items-center">
              <span className="text-white text-sm">VIP SEVİYENİZ</span>
              <span className="text-white text-sm">BRONZE</span>
            </div>

            {/* SEVİYE PUANI */}
            <div className="flex justify-between items-center">
              <span className="text-white text-sm">SEVİYE PUANI</span>
              <span className="text-green-400 text-sm">0,00</span>
            </div>

            {/* FREESPINS */}
            <div className="flex justify-between items-center">
              <span className="text-white text-sm">FREESPINS</span>
              <span className="text-white text-sm">0</span>
            </div>

            {/* BONUS */}
            <div className="flex justify-between items-center">
              <span className="text-white text-sm">BONUS</span>
              <span className="text-white text-sm">0,00₺</span>
            </div>

            {/* TOPLAM ÇEVİRİM */}
            <div className="flex justify-between items-center">
              <span className="text-white text-sm">TOPLAM ÇEVİRİM</span>
              <span className="text-white text-sm">AKTİF BONUS YOK</span>
            </div>

            {/* ÇEVİRİM SÜRESİ */}
            <div className="flex justify-between items-center">
              <span className="text-white text-sm">ÇEVİRİM SÜRESİ</span>
              <span className="text-white text-sm">AKTİF BONUS YOK</span>
            </div>
          </div>
        </div>

        {/* Alt Navigasyon */}
        <div className="bg-yellow-500 flex justify-between items-center py-3 px-6">
          <button 
            onClick={() => setShowAccountDetails(true)}
            className="flex flex-col items-center"
          >
            <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mb-1">
              <i className="fas fa-user text-white text-sm"></i>
            </div>
            <span className="text-black font-bold text-xs">HESABIM</span>
          </button>

          <button 
            onClick={onLogout}
            className="flex flex-col items-center"
          >
            <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mb-1">
              <i className="fas fa-sign-out-alt text-white text-sm"></i>
            </div>
            <span className="text-black font-bold text-xs">ÇIKIŞ</span>
          </button>
        </div>
      </div>

      {/* HESABIM Modal */}
      {showAccountDetails && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-sm bg-[#111] rounded-lg overflow-hidden shadow-xl">
            {/* Üst Bar */}
            <div className="bg-yellow-500 text-black text-center py-3">
              <div className="font-bold text-lg">HESABIM</div>
            </div>

            {/* Hesap Detayları */}
            <div className="bg-gradient-to-br from-purple-900/20 to-black p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white text-sm">KULLANICI ADI</span>
                  <span className="text-white text-sm">{user.username}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white text-sm">E-MAIL</span>
                  <span className="text-white text-sm">{user.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white text-sm">BAKİYE</span>
                  <span className="text-green-400 text-sm">{user.balance.toFixed(2)}₺</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white text-sm">ÜYELİK TARİHİ</span>
                  <span className="text-white text-sm">Bugün</span>
                </div>
              </div>
            </div>

            {/* Alt Navigasyon */}
            <div className="bg-yellow-500 flex justify-between items-center py-3 px-6">
              <button 
                onClick={() => setShowAccountDetails(false)}
                className="flex flex-col items-center"
              >
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mb-1">
                  <i className="fas fa-arrow-left text-white text-sm"></i>
                </div>
                <span className="text-black font-bold text-xs">GERİ</span>
              </button>

              <button 
                onClick={onLogout}
                className="flex flex-col items-center"
              >
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mb-1">
                  <i className="fas fa-sign-out-alt text-white text-sm"></i>
                </div>
                <span className="text-black font-bold text-xs">ÇIKIŞ</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
