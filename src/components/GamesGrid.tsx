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
    // Slot Games
    { id: '1', name: 'Supercharged Clovers Hold and Win Power Chance', imageUrl: '/images/supercharged clovers.hold and win power chance.png', isHot: false, isNew: false, category: 'slot' },
    { id: '2', name: 'Gate of Olympus Super Scatter', imageUrl: '/images/gateofolympus superscatter.png', isHot: false, isNew: false, category: 'slot' },
    { id: '3', name: 'Highway to Hell', imageUrl: '/images/highwaytohell.png', isHot: false, isNew: false, category: 'slot' },
    { id: '4', name: 'Chaos Crew 3', imageUrl: '/images/chaos crew3.png', isHot: false, isNew: false, category: 'slot' },
    { id: '5', name: 'Gates of Olympus 1000', imageUrl: '/images/gatesofolympus1000.png', isHot: false, isNew: false, category: 'slot' },
    { id: '6', name: 'Sweet Bonanza Super Scatter', imageUrl: '/images/sweetbonanzasuperscatter.png', isHot: false, isNew: false, category: 'slot' },
    { id: '7', name: 'Casibom Spinman', imageUrl: '/images/casibom spinman.png', isHot: false, isNew: false, category: 'slot' },
    { id: '8', name: '100 Power Hot Golden Coins Link', imageUrl: '/images/100powerhotgoldencoinslink.png', isHot: false, isNew: false, category: 'slot' },
    { id: '9', name: '40 Extra Crown Golden Coins Link', imageUrl: '/images/40extracrowngoldencoinslink.png', isHot: false, isNew: false, category: 'slot' },
    { id: '10', name: 'Sword & Crown Bell Link', imageUrl: '/images/sword&crown bell link.png', isHot: false, isNew: false, category: 'slot' },
    { id: '11', name: '40 Power Hot Golden Coins Link', imageUrl: '/images/40powerhotgoldencoinslink.png', isHot: false, isNew: false, category: 'slot' },
    { id: '12', name: 'Luck Penny', imageUrl: '/images/luck penny.png', isHot: false, isNew: false, category: 'slot' },
  ]);

  const [liveCasinoGames] = useState<Game[]>([
    // Live Casino Games
    { id: '13', name: 'CANLI CASİNO', imageUrl: '/images/canli-casino-banner.png', isHot: false, isNew: false, category: 'live' },
    { id: '14', name: 'Casibom Lightning Rulet', imageUrl: '/images/casibom-lightning-rulet.png', isHot: false, isNew: false, category: 'live' },
    { id: '15', name: 'Casibom Özel Stüdyo', imageUrl: '/images/casibom-ozel-studio-1.png', isHot: false, isNew: false, category: 'live' },
    { id: '16', name: 'Casibom Özel Rulet', imageUrl: '/images/casibom-ozel-rulet.png', isHot: false, isNew: false, category: 'live' },
    { id: '17', name: 'Casibom Özel Stüdyo', imageUrl: '/images/casibom-ozel-studio-2.png', isHot: false, isNew: false, category: 'live' },
    { id: '18', name: 'Blackjack Lobby', imageUrl: '/images/blackjack-lobby.png', isHot: false, isNew: false, category: 'live' },
    { id: '19', name: 'Casibom VIP Blackjack', imageUrl: '/images/casibom-vip-blackjack.png', isHot: false, isNew: false, category: 'live' },
    { id: '20', name: 'Crazy Time', imageUrl: '/images/crazy-time.png', isHot: false, isNew: false, category: 'live' },
    { id: '21', name: 'Türkçe Masalar', imageUrl: '/images/turkce-masalar.png', isHot: false, isNew: false, category: 'live' },
    { id: '22', name: 'Spaceman', imageUrl: '/images/spaceman.png', isHot: false, isNew: false, category: 'live' },
  ]);

  return (
    <div className="py-12 bg-primary">
      {/* Slot Games Section */}
      <section id="games" className="mb-16">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Mobile Layout - 3 column grid like in the image */}
          <div className="block md:hidden">
            <h2 className="text-2xl font-black text-center mb-4 text-white">
              POPÜLER
            </h2>
            <div className="grid grid-cols-3 gap-1">
              {slotGames.slice(0, 15).map((game) => (
                <div
                  key={game.id}
                  className="game-card group cursor-pointer aspect-[1.2/1]"
                  onClick={() => onGameClick(game.id)}
                >
                  <div className="relative h-full">
                    <img
                      src={game.imageUrl}
                      alt={game.name}
                      className="w-full h-full object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.src = `https://via.placeholder.com/280x220/333/fff?text=${game.name}`;
                      }}
                    />
                    
                    {/* Mobile Badges - Smaller */}
                    <div className="absolute top-0.5 right-0.5">
                      {game.isHot && (
                        <span className="bg-casino-red text-white text-xs font-bold px-0.5 py-0.5 rounded text-xs">
                          HOT
                        </span>
                      )}
                      {game.isNew && (
                        <span className="bg-casino-green text-white text-xs font-bold px-0.5 py-0.5 rounded text-xs">
                          YENİ
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mobile See All Button */}
            <div className="text-center mt-6">
              <button className="bg-secondary text-primary px-12 py-4 rounded-lg font-bold text-lg hover:bg-secondary/90 transition-colors">
                HEPSİNİ GÖR
              </button>
            </div>
          </div>

          {/* Desktop Layout - Original with sidebar */}
          <div className="hidden md:block">
            <h2 className="text-4xl font-black text-center mb-12 text-white">
              POPÜLER OYUNLAR
            </h2>
            <div className="flex gap-4">
              {/* Popüler Image - Left Side */}
              <div className="hidden lg:block flex-shrink-0">
                <img 
                  src="/images/popüler.png" 
                  alt="Popüler" 
                  className="h-full object-cover rounded-lg"
                  style={{ height: '700px' }}
                />
              </div>
              
              {/* Slot Games Grid - Right Side */}
              <div className="flex flex-wrap gap-4 flex-1">
                {slotGames.map((game) => (
                  <div
                    key={game.id}
                    className="game-card group cursor-pointer"
                    style={{ width: '280px', height: '220px' }}
                    onClick={() => onGameClick(game.id)}
                  >
                    <div className="relative">
                      <img
                        src={game.imageUrl}
                        alt={game.name}
                        className="w-full h-full object-cover rounded-lg mb-2"
                        style={{ width: '280px', height: '220px' }}
                        onError={(e) => {
                          e.currentTarget.src = `https://via.placeholder.com/280x220/333/fff?text=${game.name}`;
                        }}
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-2 right-2 flex flex-col gap-1">
                        {game.isHot && (
                          <span className="bg-casino-red text-white text-xs font-bold px-2 py-1 rounded">
                            HOT
                          </span>
                        )}
                        {game.isNew && (
                          <span className="bg-casino-green text-white text-xs font-bold px-2 py-1 rounded">
                            YENİ
                          </span>
                        )}
                      </div>

                      {/* Game Name Overlay - Shows on Hover */}
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center p-3">
                        <div className="text-center">
                          <h3 className="text-white font-bold text-base leading-tight text-center">
                            {game.name}
                          </h3>
                          <div className="mt-3 bg-secondary text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                            <i className="fas fa-play text-2xl"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Casino Section */}
      <section id="live-casino" className="mt-16">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Mobile Layout for Live Casino */}
          <div className="block md:hidden">
            <h2 className="text-2xl font-black text-center mb-4 text-white">
              CANLI CASİNO
            </h2>
            <div className="grid grid-cols-3 gap-1">
              {liveCasinoGames.slice(0, 15).map((game) => (
                <div
                  key={game.id}
                  className="game-card group cursor-pointer aspect-[1.2/1]"
                  onClick={() => onGameClick(game.id)}
                >
                  <div className="relative h-full">
                    <img
                      src={game.imageUrl}
                      alt={game.name}
                      className="w-full h-full object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.src = `https://via.placeholder.com/280x220/333/fff?text=${game.name}`;
                      }}
                    />
                    
                    {/* Mobile Badges - Smaller */}
                    <div className="absolute top-0.5 right-0.5">
                      {game.isHot && (
                        <span className="bg-casino-red text-white text-xs font-bold px-0.5 py-0.5 rounded text-xs">
                          HOT
                        </span>
                      )}
                      {game.isNew && (
                        <span className="bg-casino-green text-white text-xs font-bold px-0.5 py-0.5 rounded text-xs">
                          YENİ
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mobile See All Button for Live Casino */}
            <div className="text-center mt-6">
              <button className="bg-secondary text-primary px-12 py-4 rounded-lg font-bold text-lg hover:bg-secondary/90 transition-colors">
                HEPSİNİ GÖR
              </button>
            </div>
          </div>

          {/* Desktop Layout for Live Casino */}
          <div className="hidden md:block">
            <h2 className="text-4xl font-black text-center mb-12 text-white">
              CANLI CASİNO
            </h2>
            <div className="flex gap-4">
            {/* Ice Fishing Image - Left Side */}
            <div className="hidden lg:block flex-shrink-0">
              <img 
                src="/images/ice-fishing-casibom.png" 
                alt="Ice Fishing Casibom" 
                className="h-full object-cover rounded-lg"
                style={{ height: '700px' }}
              />
            </div>
            
            {/* Live Casino Games Grid - Right Side */}
            <div className="flex flex-wrap gap-4 flex-1">
              {liveCasinoGames.map((game) => (
                <div
                  key={game.id}
                  className="game-card group cursor-pointer"
                  style={{ width: '280px', height: '220px' }}
                  onClick={() => onGameClick(game.id)}
                >
                  <div className="relative">
                    <img
                      src={game.imageUrl}
                      alt={game.name}
                      className="w-full h-full object-cover rounded-lg mb-2"
                      style={{ width: '280px', height: '220px' }}
                      onError={(e) => {
                        e.currentTarget.src = `https://via.placeholder.com/280x220/333/fff?text=${game.name}`;
                      }}
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-2 right-2 flex flex-col gap-1">
                      {game.isHot && (
                        <span className="bg-casino-red text-white text-xs font-bold px-2 py-1 rounded">
                          HOT
                        </span>
                      )}
                      {game.isNew && (
                        <span className="bg-casino-green text-white text-xs font-bold px-2 py-1 rounded">
                          YENİ
                        </span>
                      )}
                    </div>

                    {/* Game Name Overlay - Shows on Hover */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center p-3">
                      <div className="text-center">
                        <h3 className="text-white font-bold text-base leading-tight text-center">
                          {game.name}
                        </h3>
                        <div className="mt-3 bg-secondary text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                          <i className="fas fa-play text-2xl"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
}