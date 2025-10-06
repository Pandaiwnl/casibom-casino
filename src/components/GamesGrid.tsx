import { useState } from 'react';

interface Game {
  id: string;
  name: string;
  imageUrl: string;
  isHot: boolean | null;
  isNew: boolean | null;
  category: string;
}

interface GamesGridProps {
  onGameClick: (gameId: string) => void;
}

export default function GamesGrid({ onGameClick }: GamesGridProps) {
  const [slotGames] = useState<Game[]>([
    { id: '1', name: 'Supercharged Clovers', imageUrl: '/images/supercharged clovers.hold and win power chance.png', isHot: false, isNew: false, category: 'slot' },
    { id: '2', name: 'Gates of Olympus', imageUrl: '/images/gateofolympus superscatter.png', isHot: false, isNew: false, category: 'slot' },
    { id: '3', name: 'Highway to Hell', imageUrl: '/images/highwaytohell.png', isHot: false, isNew: false, category: 'slot' },
    { id: '4', name: 'Chaos Crew 3', imageUrl: '/images/chaos crew3.png', isHot: false, isNew: false, category: 'slot' },
    { id: '5', name: 'Gates of Olympus 1000', imageUrl: '/images/gatesofolympus1000.png', isHot: false, isNew: false, category: 'slot' },
    { id: '6', name: 'Sweet Bonanza', imageUrl: '/images/sweetbonanzasuperscatter.png', isHot: false, isNew: false, category: 'slot' },
    { id: '7', name: 'Casibom Spinman', imageUrl: '/images/casibom spinman.png', isHot: false, isNew: false, category: 'slot' },
    { id: '8', name: '100 Power Hot', imageUrl: '/images/100powerhotgoldencoinslink.png', isHot: false, isNew: false, category: 'slot' },
    { id: '9', name: '40 Extra Crown', imageUrl: '/images/40extracrowngoldencoinslink.png', isHot: false, isNew: false, category: 'slot' },
    { id: '10', name: 'Sword & Crown', imageUrl: '/images/sword&crown bell link.png', isHot: false, isNew: false, category: 'slot' },
    { id: '11', name: '40 Power Hot', imageUrl: '/images/40powerhotgoldencoinslink.png', isHot: false, isNew: false, category: 'slot' },
    { id: '12', name: 'Lucky Penny', imageUrl: '/images/luck penny.png', isHot: false, isNew: false, category: 'slot' },
  ]);

  const [liveCasinoGames] = useState<Game[]>([
    { id: '13', name: 'Casibom Lightning Rulet', imageUrl: '/images/casibom-lightning-rulet.png', isHot: false, isNew: false, category: 'live' },
    { id: '14', name: 'Casibom Özel Stüdyo', imageUrl: '/images/casibom-ozel-studio-1.png', isHot: false, isNew: false, category: 'live' },
    { id: '15', name: 'Casibom Özel Rulet', imageUrl: '/images/casibom-ozel-rulet.png', isHot: false, isNew: false, category: 'live' },
    { id: '16', name: 'Blackjack Lobby', imageUrl: '/images/blackjack-lobby.png', isHot: false, isNew: false, category: 'live' },
    { id: '17', name: 'Casibom VIP Blackjack', imageUrl: '/images/casibom-vip-blackjack.png', isHot: false, isNew: false, category: 'live' },
    { id: '18', name: 'Crazy Time', imageUrl: '/images/crazy-time.png', isHot: false, isNew: false, category: 'live' },
    { id: '19', name: 'Türkçe Masalar', imageUrl: '/images/turkce-masalar.png', isHot: false, isNew: false, category: 'live' },
    { id: '20', name: 'Spaceman', imageUrl: '/images/spaceman.png', isHot: false, isNew: false, category: 'live' },
  ]);

  return (
    <div className="py-12 bg-primary text-white">
      {/* 📱 Mobil */}
      <div className="block md:hidden">
        <section id="games" className="mb-16">
          <h2 className="text-3xl font-extrabold text-center mb-6">POPÜLER</h2>
          <div className="grid grid-cols-3 gap-3 px-3">
            {slotGames.slice(0, 15).map((game) => (
              <div 
                key={game.id} 
                className="rounded-xl overflow-hidden cursor-pointer select-none" 
                onClick={() => onGameClick(game.id)}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  onGameClick(game.id);
                }}
              >
                <img
                  src={game.imageUrl}
                  alt={game.name}
                  className="w-full h-auto aspect-[1.6/1] object-cover pointer-events-none"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button 
              className="bg-yellow-500 text-black font-bold px-10 py-3 rounded-lg hover:bg-yellow-400 transition"
              onClick={() => onGameClick('all-games')}
              onTouchEnd={(e) => {
                e.preventDefault();
                onGameClick('all-games');
              }}
            >
              HEPSİNİ GÖR
            </button>
          </div>
        </section>

        <section id="live-casino" className="mt-16">
          <h2 className="text-3xl font-extrabold text-center mb-6">CANLI CASİNO</h2>
          <div className="flex gap-3 px-3 overflow-x-auto">
            {liveCasinoGames.map((game) => (
              <div 
                key={game.id} 
                className="rounded-xl overflow-hidden cursor-pointer flex-shrink-0 w-32 select-none" 
                onClick={() => onGameClick(game.id)}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  onGameClick(game.id);
                }}
              >
                <img
                  src={game.imageUrl}
                  alt={game.name}
                  className="w-full h-auto aspect-[1.6/1] object-cover pointer-events-none"
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 💻 Masaüstü */}
      <div className="hidden md:block">
        {/* Slot Section */}
        <section id="games" className="mb-20 max-w-7xl mx-auto flex gap-4 px-4">
          {/* Sol Taraf Görsel */}
          <div className="w-[220px] flex-shrink-0 flex flex-col items-center justify-between">
            <img src="/images/popüler.png" alt="Popüler" className="rounded-lg mb-4" />
            <button className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition">HEPSİNİ GÖR</button>
          </div>

          {/* Sağ Taraf Grid */}
          <div className="flex-1 grid grid-cols-4 gap-4">
            {slotGames.map((game) => (
              <div key={game.id} className="relative group cursor-pointer">
                <img src={game.imageUrl} alt={game.name} className="w-full h-[180px] object-cover rounded-lg" />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition">
                  <h3 className="text-center text-sm font-semibold">{game.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Live Casino Section */}
        <section id="live-casino" className="max-w-7xl mx-auto flex gap-4 px-4">
          {/* Sol Taraf Görsel */}
          <div className="w-[220px] flex-shrink-0 flex flex-col items-center justify-between">
            <img src="/images/canli-casino.png" alt="Canlı Casino" className="rounded-lg mb-4" />
            <button className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition">HEPSİNİ GÖR</button>
          </div>

          {/* Sağ Taraf Grid */}
          <div className="flex-1 grid grid-cols-4 gap-4">
            {liveCasinoGames.map((game) => (
              <div key={game.id} className="relative group cursor-pointer">
                <img src={game.imageUrl} alt={game.name} className="w-full h-[180px] object-cover rounded-lg" />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition">
                  <h3 className="text-center text-sm font-semibold">{game.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
