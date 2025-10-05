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
    { id: '13', name: 'CANLI CASİNO', imageUrl: '/images/canli-casino-banner.png', isHot: false, isNew: false, category: 'live' },
    { id: '14', name: 'Casibom Lightning Rulet', imageUrl: '/images/casibom-lightning-rulet.png', isHot: false, isNew: false, category: 'live' },
    { id: '15', name: 'Casibom Özel Stüdyo', imageUrl: '/images/casibom-ozel-studio-1.png', isHot: false, isNew: false, category: 'live' },
    { id: '16', name: 'Casibom Özel Rulet', imageUrl: '/images/casibom-ozel-rulet.png', isHot: false, isNew: false, category: 'live' },
    { id: '17', name: 'Blackjack Lobby', imageUrl: '/images/blackjack-lobby.png', isHot: false, isNew: false, category: 'live' },
    { id: '18', name: 'Casibom VIP Blackjack', imageUrl: '/images/casibom-vip-blackjack.png', isHot: false, isNew: false, category: 'live' },
  ]);

  return (
    <div className="py-12 bg-primary">
      {/* 🎯 Mobil Görünüm */}
      <div className="block md:hidden">
        {/* Slot Games */}
        <section id="games" className="mb-16">
          <h2 className="text-3xl font-extrabold text-center mb-6 text-white">POPÜLER</h2>
          <div className="grid grid-cols-3 gap-3 px-3">
            {slotGames.map((game) => (
              <div key={game.id} className="rounded-xl overflow-hidden cursor-pointer" onClick={() => onGameClick(game.id)}>
                <img
                  src={game.imageUrl}
                  alt={game.name}
                  className="w-full h-auto aspect-[1.6/1] object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://via.placeholder.com/280x220/333/fff?text=${game.name}`;
                  }}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button className="bg-yellow-500 text-black font-bold px-10 py-3 rounded-lg hover:bg-yellow-400 transition">
              HEPSİNİ GÖR
            </button>
          </div>
        </section>

        {/* Live Casino */}
        <section id="live-casino" className="mt-16">
          <h2 className="text-3xl font-extrabold text-center mb-6 text-white">CANLI CASİNO</h2>
          <div className="grid grid-cols-3 gap-3 px-3">
            {liveCasinoGames.map((game) => (
              <div key={game.id} className="rounded-xl overflow-hidden cursor-pointer" onClick={() => onGameClick(game.id)}>
                <img
                  src={game.imageUrl}
                  alt={game.name}
                  className="w-full h-auto aspect-[1.6/1] object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://via.placeholder.com/280x220/333/fff?text=${game.name}`;
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 💻 Masaüstü Görünüm */}
      <div className="hidden md:block">
        {/* Burada senin mevcut masaüstü düzenin aynı şekilde kalacak */}
        {/* Hiçbir şey değişmedi */}
      </div>
    </div>
  );
}
