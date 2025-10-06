import { FaArrowRight } from 'react-icons/fa';

interface PromoCardsProps {
  onGameClick: (gameId: string) => void;
}

export default function PromoCards({ onGameClick }: PromoCardsProps) {
  return (
    <section className="py-8 bg-primary" id="promotions">
      <div className="max-w-[92rem] mx-auto px-2">
        {/* Mobile Layout */}
        <div className="block md:hidden">
          <div className="grid grid-cols-2 gap-3">
            {/* Telegram Card */}
            <div 
              className="promo-card relative overflow-hidden rounded-xl h-48 col-span-2 cursor-pointer"
              data-testid="card-telegram"
              onClick={() => onGameClick('telegram')}
              onTouchEnd={(e) => {
                e.preventDefault();
                onGameClick('telegram');
              }}
            >
              <img 
                src="/images/telegram.jpg" 
                alt="Telegram" 
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-black/40 rounded-xl"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-4xl font-black uppercase mb-4 leading-tight">
                    KANALA<br />KATIL
                  </h3>
                  <button className="bg-black text-white px-6 py-3 rounded-lg font-bold text-sm flex items-center space-x-2 hover:bg-gray-800 transition-colors mx-auto">
                    <span>+200K ABONE</span>
                    <span className="ml-2">CASİBOM TELEGRAM'DA</span>
                    <FaArrowRight className="ml-2 text-lg" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile App Card */}
            <div 
              className="promo-card relative overflow-hidden rounded-xl h-32 cursor-pointer"
              data-testid="card-mobile"
              onClick={() => onGameClick('mobile-app')}
              onTouchEnd={(e) => {
                e.preventDefault();
                onGameClick('mobile-app');
              }}
            >
              <img 
                src="/images/mobil.jpg" 
                alt="Mobile App" 
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-lg font-black uppercase">MOBİL UYGULAMA</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Telegram Card - Left Side, Wide */}
            <div 
              className="promo-card relative overflow-hidden rounded-xl h-48 md:col-span-1 order-1"
              data-testid="card-telegram"
            >
              <img 
                src="/images/telegram.jpg" 
                alt="Telegram" 
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-3xl font-black uppercase mb-2">KANALA KATIL</h3>
                  <p className="text-lg font-bold">+200K ABONE</p>
                  <p className="text-sm">CASİBOM TELEGRAM'DA</p>
                  <div className="mt-4">
                    <i className="fas fa-arrow-right text-2xl"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* VIP Program Card - Center */}
            <div 
              className="promo-card relative overflow-hidden rounded-xl cursor-pointer h-48 md:col-span-1 order-2"
              data-testid="card-vip"
            >
                <img 
                  src="/images/vip.jpg" 
                  alt="VIP Program" 
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="flex justify-center gap-4 mb-2">
                      <span className="text-2xl font-black">%15</span>
                      <span className="text-2xl font-black">%20</span>
                      <span className="text-2xl font-black">%25</span>
                    </div>
                    <h3 className="text-xl font-black uppercase">VIP PROGRAMI</h3>
                    <div className="mt-2">
                      <i className="fas fa-arrow-right text-xl"></i>
                    </div>
                  </div>
                </div>
            </div>

            {/* Mobile App Card - Right */}
            <div 
              className="promo-card relative overflow-hidden rounded-xl h-48 md:col-span-1 order-3"
              data-testid="card-mobile"
            >
                <img 
                  src="/images/mobil.jpg" 
                  alt="Mobile App" 
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-xl font-black uppercase">MOBİL UYGULAMA</h3>
                    <div className="mt-2">
                      <i className="fas fa-arrow-right text-xl"></i>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}