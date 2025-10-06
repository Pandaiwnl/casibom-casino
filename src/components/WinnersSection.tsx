import { useState, useEffect } from 'react';

interface Winner {
  id: string;
  playerInitials: string;
  gameName: string;
  gameImageUrl: string;
  amount: number;
  createdAt: string;
}

export default function WinnersSection() {
  const [winners, setWinners] = useState<Winner[]>([]);

  const gameNames = [
    'Immortal 5',
    'Casibom Bonanza 1000', 
    'Diamond Plus Valentine\'s Edition',
    'Lucky Penny 2',
    'Sweet Bonanza Super Scatter',
    'Gates of Olympus 1000',
    'Chaos Crew 3',
    'Casibom Spinman',
    'Gate of Olympus Super Scatter',
    'Highway to Hell',
    'Supercharged Clovers Hold and Win',
    'Sword & Crown Bell Link'
  ];

  const gameImages = [
    '/images/sweetbonanzasuperscatter.png',
    '/images/gatesofolympus1000.png',
    '/images/chaos crew3.png',
    '/images/casibom spinman.png',
    '/images/gateofolympus superscatter.png',
    '/images/highwaytohell.png',
    '/images/supercharged clovers.hold and win power chance.png',
    '/images/sword&crown bell link.png',
    '/images/100powerhotgoldencoinslink.png',
    '/images/40extracrowngoldencoinslink.png',
    '/images/40powerhotgoldencoinslink.png',
    '/images/luck penny.png'
  ];

  const firstNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'Y', 'Z'];
  const lastNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'Y', 'Z'];

  const generateRandomWinners = () => {
    const newWinners: Winner[] = [];
    for (let i = 0; i < 6; i++) {
      const randomGameIndex = Math.floor(Math.random() * gameNames.length);
      const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const randomAmount = Math.floor(Math.random() * 50000) + 10000; // 10,000 - 60,000
      
      newWinners.push({
        id: `${i + 1}`,
        playerInitials: `${randomFirstName}.${randomLastName}.`,
        gameName: gameNames[randomGameIndex],
        gameImageUrl: gameImages[randomGameIndex],
        amount: randomAmount,
        createdAt: new Date().toISOString()
      });
    }
    return newWinners;
  };

  useEffect(() => {
    // Generate initial winners
    setWinners(generateRandomWinners());
    
    // Update winners every 5 seconds
    const interval = setInterval(() => {
      setWinners(generateRandomWinners());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <section className="py-12 bg-primary" id="winners">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-black text-center mb-6 md:mb-12 text-white">
          SON KAZANANLAR
        </h2>
        
        {/* Mobile Winners */}
        <div className="block md:hidden">
          <div className="bg-gray-800 rounded-lg p-4 mx-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                <img 
                  src="/images/blackjack-lobby.png" 
                  alt="Blackjack"
                  className="w-8 h-8 rounded"
                />
              </div>
              <div className="flex-1">
                <div className="text-white font-bold text-sm mb-1">
                  E. Ö.
                </div>
                <div className="text-white font-semibold text-xs">
                  Free Bet VIP Blackjack Live
                </div>
              </div>
              <div className="text-right">
                <div className="text-yellow-400 font-black text-lg">
                  40.000,00
                </div>
              </div>
              <div className="text-yellow-400">
                <i className="fas fa-arrow-right text-sm"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Winners */}
        <div className="hidden md:block">
          <div className="winners-container overflow-x-hidden relative">
            <div className="flex gap-4 auto-scroll">
              {/* Duplicate winners for seamless loop */}
              {[...winners, ...winners].map((winner, index) => (
                <div
                  key={`${winner.id}-${index}`}
                  className="bg-gray-800 rounded-lg p-4 min-w-[280px] flex-shrink-0 flex items-center space-x-4"
                >
                  <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                    <img 
                      src={winner.gameImageUrl} 
                      alt={winner.gameName}
                      className="w-8 h-8 rounded"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-bold text-sm mb-1">
                      {winner.playerInitials}
                    </div>
                    <div className="text-white font-semibold text-xs">
                      {winner.gameName}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-casino-blue font-black text-lg">
                      {formatAmount(winner.amount)}
                    </div>
                  </div>
                  <div className="text-secondary">
                    <i className="fas fa-arrow-right text-sm"></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

