export default function Footer() {
  return (
    <footer className="bg-primary py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Banner Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black mb-4">
            <span className="text-orange-500">Casibom™</span>
            <span className="text-white"> | Önde Gelen Casino ve Bahis Platformu</span>
          </h2>
          <p className="text-white text-lg">
            Casibom ile en iyi casino ve bahis deneyimini yaşayın! 2000 TL hoş geldin bonusuyla hemen kazanmaya başlayın.
          </p>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Email Section */}
          <div>
            <h3 className="text-gray-400 font-bold text-lg mb-4">EMAİL</h3>
            <a href="mailto:support@casibom.com" className="text-orange-500 text-lg font-bold hover:text-orange-400 transition-colors">
              support@casibom.com
            </a>
            <div className="flex space-x-4 mt-4">
              {/* Casibom App Icon */}
              <div className="w-10 h-10 bg-black rounded flex items-center justify-center">
                <span className="text-orange-500 font-bold text-xl">C</span>
              </div>
              {/* Telegram Icon */}
              <a href="https://t.me/casibom" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center hover:bg-blue-600 transition-colors">
                <i className="fab fa-telegram text-white text-xl"></i>
              </a>
            </div>
          </div>

          {/* Genel Kurallar */}
          <div>
            <h3 className="text-orange-500 font-bold text-lg mb-2">Genel Kurallar</h3>
            <div className="w-16 h-1 bg-orange-500 mb-4"></div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white hover:text-orange-500 transition-colors">
                  Kurallar ve Şartlar
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-orange-500 transition-colors">
                  Gizlilik politikası
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-orange-500 transition-colors">
                  Ortaklık
                </a>
              </li>
            </ul>
          </div>

          {/* Hakkımızda */}
          <div>
            <h3 className="text-orange-500 font-bold text-lg mb-2">Hakkımızda</h3>
            <div className="w-16 h-1 bg-orange-500 mb-4"></div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white hover:text-orange-500 transition-colors">
                  Sorumlu Oyun
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-orange-500 transition-colors">
                  Bize ulaşın
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-orange-500 transition-colors">
                  Casibom Yardım Merkezi
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-orange-500 transition-colors">
                  Bahis Kuralları
                </a>
              </li>
            </ul>
          </div>

          {/* Yasal ve Dil Seçimi */}
          <div className="flex items-start space-x-4">
            {/* 18+ Logo */}
            <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">18+</span>
            </div>
            
            {/* GCB Certificate */}
            <div className="bg-green-600 px-3 py-2 rounded">
              <div className="text-white font-bold text-sm">GCB</div>
              <div className="text-white text-xs">cert.gcb.cw</div>
            </div>
            
            {/* Language Selector */}
            <div className="border border-gray-600 px-3 py-2 rounded flex items-center space-x-2">
              <span className="text-white text-sm">🇹🇷 TR</span>
              <i className="fas fa-chevron-down text-gray-400 text-xs"></i>
            </div>
          </div>
        </div>

        {/* Legal Text */}
        <div className="border-t border-gray-700 pt-6 mb-4">
          <p className="text-gray-400 text-sm leading-relaxed">
            casibom.com, Curaçao yasalarına göre kayıtlı ve 153142 şirket numarasına sahip Seguri N.V. tarafından işletilmektedir. 
            Site, GCB tarafından verilen geçerli bir lisansa sahiptir.
          </p>
        </div>

        {/* Payment and Game Provider Logos */}
        <div className="border-t border-gray-700 pt-6 mb-6">
          <div className="flex flex-wrap justify-center gap-3">
            {/* Payment Methods */}
            <span className="text-gray-300 text-sm hover:text-white transition-colors">PAYco</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">Banka Havalesi</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">SUPER HAVALE</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">PEP</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">papara</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">PAY CELL</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">Hayhay</span>
            <span className="text-orange-500 text-sm hover:text-orange-400 transition-colors">₿ bitcoin</span>
            <span className="text-gray-400 text-sm hover:text-gray-300 transition-colors">Ł Litecoin</span>
            <span className="text-blue-400 text-sm hover:text-blue-300 transition-colors">Ξ ethereum</span>
            <span className="text-green-400 text-sm hover:text-green-300 transition-colors">USDT (TRC20)</span>
            <span className="text-green-400 text-sm hover:text-green-300 transition-colors">USDT (ERC20)</span>

            {/* Game Providers */}
            <span className="text-orange-500 text-sm hover:text-orange-400 transition-colors">Casibom Orijinal</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">PRAGMATIC PLAY</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">Evolution</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">PRAGMATIC LIVE</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">imaginelive</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">AMUSNET</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">WAZDAN</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">DIGITAIN</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">HACKSAW</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">NOLIMIT CITY</span>
            <span className="text-red-500 text-sm hover:text-red-400 transition-colors">RED TIGER</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">3 OAKS</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">SMARTSOFT</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">SPRIBE</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">PLAYSON</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">EGT</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">PG SOFT</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">betsolutions</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">BGAMING</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">Ezugi</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">RELAX</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">NETENT</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">GALAXSYS</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">BETSOFT</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">YGGDRASIL</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">BTG</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">evoplay</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">HABANERO</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">Endorphina</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">Microgaming</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">QUICKSPIN</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">Spinomenal</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">IRON DOG</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">HIGH 5</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">BOOMING</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">tom horn</span>
            <span className="text-gray-300 text-sm hover:text-white transition-colors">NOVOMATIC</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-right">
          <p className="text-gray-400 text-sm">
            © CasiBom. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}