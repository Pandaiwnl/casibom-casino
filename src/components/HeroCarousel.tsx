import { useState, useEffect } from "react";

interface HeroCarouselProps {
  onRegister: () => void;
  onPayment: () => void;
}

export default function HeroCarousel({ onPayment }: HeroCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const totalImages = 16; // 1.png to 16.png

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % totalImages);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative">
      <div className="relative h-[500px] lg:h-[600px] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat cursor-pointer"
          style={{
            backgroundImage: `url('/images/${currentImage + 1}.png')`,
            filter: 'brightness(1.1) contrast(1.2) saturate(1.3)'
          }}
          onClick={onPayment}
        ></div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 right-20 animate-float opacity-80">
          <i className="fas fa-dice text-6xl text-secondary"></i>
        </div>
        <div className="absolute bottom-20 right-40 animate-float-delayed opacity-70">
          <i className="fas fa-coins text-5xl text-secondary"></i>
        </div>
        <div className="absolute top-20 left-20 animate-float opacity-60">
          <i className="fas fa-spade text-4xl text-accent"></i>
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
          <div className="flex-1">
            <div className="space-y-4">
              {/* Empty space - no register button */}
            </div>
          </div>
          
          {/* Right Side Decorative Elements */}
          <div className="hidden lg:block flex-1 relative">
            <div className="absolute right-0 bottom-0 flex flex-col items-end space-y-4">
              <div className="w-32 h-32 bg-secondary/20 rounded-full flex items-center justify-center animate-float">
                <i className="fas fa-crown text-6xl text-secondary"></i>
              </div>
              <div className="w-24 h-24 bg-casino-green/20 rounded-full flex items-center justify-center animate-float-delayed">
                <i className="fas fa-gem text-4xl text-casino-green"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2" data-testid="carousel-indicators">
          {Array.from({ length: totalImages }).map((_, index) => (
            <div
              key={index}
              className={`carousel-dot ${index === currentImage ? 'active' : ''}`}
              onClick={() => setCurrentImage(index)}
              data-testid={`carousel-dot-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

