
import React from 'react';

const PHRASES = [
  "TAXA IMPERDÍVEL",
  "INCLUA O SEGURO AUTO NO FINANCIAMENTO",
  "FEIRÃO",
  "MEGA FEIRÃO",
  "FEIRÃO SEMINOVOS",
  "SEGURO AUTO",
  "FINANCIAMENTO DE CARROS",
  "FEIRÃO DE MOTO",
  "FINANCIAMENTO DE MOTO",
  "MEGA ESTOQUE",
  "CARROS E MOTOS"
];

export const TickerBanner: React.FC = () => {
  // We duplicate the list to ensure a seamless infinite scroll loop
  const displayPhrases = [...PHRASES, ...PHRASES, ...PHRASES];

  return (
    <div className="bg-[#f3f5f8] border-y border-gray-200 py-4 overflow-hidden relative w-full select-none z-20 shadow-sm">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); } /* Move 1/3 because we tripled the list */
        }
        .marquee-wrapper:hover .marquee-content {
          animation-play-state: paused;
        }
        .marquee-content {
          display: flex;
          width: max-content;
          animation: scroll 60s linear infinite;
        }
      `}</style>
      
      <div className="marquee-wrapper w-full">
        <div className="marquee-content flex gap-4 items-center pl-4">
          {displayPhrases.map((phrase, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 border border-brand-red/20 rounded-full px-6 py-1.5 whitespace-nowrap bg-white hover:bg-red-50 transition-colors shadow-sm"
            >
              <span className="text-brand-red font-bold text-xs md:text-sm uppercase tracking-wide">
                {phrase}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
