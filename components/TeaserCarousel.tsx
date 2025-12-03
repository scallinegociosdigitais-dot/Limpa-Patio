
import React, { useState, useEffect, useRef } from 'react';
import { useContent } from '../context/ContentContext';

// Custom Car Key Icon Component
const CarKeyFloating = () => (
  <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-xl" style={{ filter: 'drop-shadow(0px 10px 5px rgba(0,0,0,0.3))' }}>
    {/* Key Blade (Metal) */}
    <path d="M30 40 L30 20 L40 20 L40 40 Z" fill="#d1d5db" />
    <path d="M40 25 L45 25 L45 35 L40 35 Z" fill="#9ca3af" />
    
    {/* Key Fob Body (Plastic) */}
    <rect x="20" y="40" width="40" height="55" rx="10" fill="#1f2937" />
    
    {/* Buttons */}
    <circle cx="40" cy="55" r="4" fill="#ef4444" className="animate-pulse" /> {/* Panic/Lock Button - Red */}
    <rect x="30" y="65" width="20" height="4" rx="2" fill="#4b5563" />
    <rect x="30" y="75" width="20" height="4" rx="2" fill="#4b5563" />
    
    {/* Key Ring Hole */}
    <circle cx="40" cy="88" r="3" fill="#111827" />
    
    {/* Shine Reflection */}
    <path d="M25 45 Q 30 45 30 90 L 22 85 Q 22 45 25 45" fill="white" opacity="0.1" />
  </svg>
);

export const TeaserCarousel: React.FC = () => {
  const { content } = useContent();
  const { teaser } = content;
  const items = teaser?.items || [];
  
  // State for the carousel logic
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [cardWidth, setCardWidth] = useState(320); // Default, will update via ref
  const cardRef = useRef<HTMLDivElement>(null);
  
  // We clone the items to create the infinite loop illusion
  // [Real Items] + [Clones of start]
  const extendedItems = items.length > 0 ? [...items, ...items] : [];

  // 1. Measure Card Width on Mount/Resize
  useEffect(() => {
    const updateWidth = () => {
      if (cardRef.current) {
        // Width + Gap (padding-x is handled in wrapper, margin handled here)
        setCardWidth(cardRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [items]);

  // 2. The Loop Logic (Slide -> Wait 2s -> Slide)
  useEffect(() => {
    if (items.length === 0) return;

    const interval = setInterval(() => {
      handleNext();
    }, 2500); // 2000ms pause + 500ms transition time approx

    return () => clearInterval(interval);
  }, [currentIndex, items.length]);

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
        // If we are at the end of the real items (entering the clone zone)
        // We let it slide to the first clone, then snap back
        return prev + 1;
    });
  };

  // 3. Handle the "Instant Snap Back" (Infinite Loop)
  useEffect(() => {
    // If we've reached the start of the cloned set (index === items.length)
    if (currentIndex === items.length) {
      // Wait for the transition to finish (500ms), then snap back to 0 without animation
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 500); // Match this with the CSS duration-500

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, items.length]);


  if (!teaser) return null;

  return (
    <section className="bg-[#1A1A1A] py-12 overflow-hidden border-b border-gray-800">
      
      {/* Animation Styles */}
      <style>{`
        @keyframes float-key {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        .animate-float-key {
          animation: float-key 3s ease-in-out infinite;
        }
      `}</style>

      <div className="container mx-auto px-4 text-center mb-10">
         <h2 className="text-2xl md:text-4xl font-black text-white mb-2">{teaser.sectionTitle}</h2>
         <p className="text-gray-400 font-medium">Esses preços só serão liberados durante o Feirão</p>
      </div>

      <div className="relative w-full overflow-hidden">
         
         {items.length === 0 ? (
            <div className="text-center text-gray-600 py-8 italic">
                Nenhuma oferta cadastrada no teaser.
            </div>
         ) : (
             /* Track Container */
             <div 
                className="flex items-center"
                style={{
                    transform: `translateX(-${currentIndex * cardWidth}px)`,
                    transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
                }}
             >
                {extendedItems.map((item, index) => (
                    /* Wrapper to enforce width */
                    <div 
                        key={index} 
                        ref={index === 0 ? cardRef : null}
                        className="flex-shrink-0 px-3"
                        style={{ width: window.innerWidth < 768 ? '300px' : '340px' }} // 280+20 or 320+20 approx
                    >
                        <div className="bg-white rounded-2xl overflow-hidden shadow-lg relative group w-full transform hover:scale-[1.02] transition-transform duration-300">
                            
                            {/* Floating Key Graphic */}
                            <div className="absolute -top-2 -right-2 z-20 animate-float-key pointer-events-none" style={{ animationDelay: `${index * 0.5}s` }}>
                                <CarKeyFloating />
                            </div>

                            {/* Tag */}
                            <div className="absolute top-3 left-3 bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-md z-10 shadow-md">
                                {item.tag}
                            </div>
                            
                            {/* Image */}
                            <div className="h-40 overflow-hidden bg-gray-100">
                                <img 
                                    src={item.image} 
                                    alt="Carro Teaser" 
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            
                            {/* Content */}
                            <div className="p-4 relative text-left">
                                {/* Watermark/Icon in BG */}
                                <div className="absolute right-2 top-2 opacity-10 pointer-events-none">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 13h-2v-6h2v6zm0-8h-2V7h2v1z"/></svg>
                                </div>

                                {/* CHANGED: Use conditionText or default */}
                                <p className="text-gray-500 text-xs font-bold uppercase mb-1">
                                    {item.conditionText || "CONDIÇÃO IMPERDÍVEL"}
                                </p>
                                
                                {/* Blurred Price */}
                                <div className="mb-4 relative w-fit">
                                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 select-none blur-[6px]">
                                        {item.pricePlaceholder || 'R$ 00.000'}
                                    </span>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-[10px] font-bold text-brand-red bg-white/90 px-1 rounded shadow-sm">
                                            Em breve
                                        </span>
                                    </div>
                                </div>
                                
                                {/* Button */}
                                <button className="w-full bg-[#333] text-white text-sm font-bold py-3 rounded-lg hover:bg-brand-red transition-colors flex items-center justify-center gap-1">
                                    {item.buttonText}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
             </div>
         )}
         
         {/* Gradient Fades for Focus Effect */}
         <div className="absolute top-0 left-0 h-full w-4 md:w-32 bg-gradient-to-r from-[#1A1A1A] to-transparent z-10 pointer-events-none"></div>
         <div className="absolute top-0 right-0 h-full w-4 md:w-32 bg-gradient-to-l from-[#1A1A1A] to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  );
};
