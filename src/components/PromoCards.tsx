export default function PromoCards() {
  return (
    <section className="py-8 bg-primary" id="promotions">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Telegram Card - Left Side, Wide */}
          <a 
            href="https://t.me/casibom"
            target="_blank"
            rel="noopener noreferrer"
            className="promo-card relative overflow-hidden rounded-xl cursor-pointer h-48 flex-1 block"
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
          </a>

          {/* VIP and Mobile Cards - Right Side, Side by Side */}
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            {/* VIP Program Card */}
            <div 
              className="promo-card relative overflow-hidden rounded-xl cursor-pointer h-48 flex-1"
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

            {/* Mobile App Card */}
            <a 
              href="http://146.59.9.171/"
              target="_blank"
              rel="noopener noreferrer"
              className="promo-card relative overflow-hidden rounded-xl cursor-pointer h-48 flex-1 block"
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
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}