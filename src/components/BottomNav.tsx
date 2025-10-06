import React from "react";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[#141414] border-t border-gray-800 flex justify-between items-center px-4 py-2 md:hidden z-50" style={{ position: 'fixed !important', bottom: '0 !important' }}>
      {/* SPOR */}
      <a
        href="#sports"
        className="flex flex-col items-center justify-center text-white hover:text-yellow-400 transition"
      >
        <img src="/icons/sport.svg" alt="Spor" className="w-6 h-6 mb-1" />
        <span className="text-xs font-semibold">SPOR</span>
      </a>

      {/* CASINO */}
      <a
        href="#casino"
        className="flex flex-col items-center justify-center text-white hover:text-yellow-400 transition"
      >
        <img src="/icons/casino.svg" alt="Casino" className="w-6 h-6 mb-1" />
        <span className="text-xs font-semibold">CASINO</span>
      </a>

      {/* CANLI DESTEK */}
      <a
        href="#support"
        className="flex flex-col items-center justify-center text-green-400 hover:text-green-300 transition"
      >
        <img src="/icons/support.svg" alt="Canlı Destek" className="w-6 h-6 mb-1" style={{ filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)' }} />
        <span className="text-xs font-semibold text-green-400">CANLI DESTEK</span>
      </a>

      {/* CANLI CASİNO */}
      <a
        href="#livecasino"
        className="flex flex-col items-center justify-center text-white hover:text-yellow-400 transition"
      >
        <img src="/icons/livecasino.svg" alt="Canlı Casino" className="w-6 h-6 mb-1" />
        <span className="text-xs font-semibold">CANLI CASİNO</span>
      </a>

      {/* MENÜ */}
      <button
        className="flex flex-col items-center justify-center text-white hover:text-yellow-400 transition"
      >
        <img src="/icons/menu.svg" alt="Menü" className="w-6 h-6 mb-1" />
        <span className="text-xs font-semibold">MENÜ</span>
      </button>
    </nav>
  );
}
