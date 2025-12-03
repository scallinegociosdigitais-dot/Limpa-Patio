import React, { useEffect, useState } from 'react';
import { ArrowDown, Play } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const HeroVideo: React.FC = () => {
  const { content } = useContent();
  const { hero } = content;
  const [origin, setOrigin] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  // Capture origin on mount to satisfy YouTube API security requirements
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  // Helper to extract YouTube ID from various URL formats
  const getYouTubeId = (url: string) => {
    if (!url) return '';
    const cleanUrl = url.trim();
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = cleanUrl.match(regExp);
    return (match && match[2].length === 11) ? match[2] : cleanUrl;
  };

  const videoId = getYouTubeId(hero.videoId);
  
  // Determine thumbnail: Custom background OR Youtube Default
  const thumbnailUrl = hero.backgroundImage 
    ? hero.backgroundImage 
    : videoId 
      ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` 
      : '';

  return (
    <section 
      id="video" 
      // REDUCED PADDING: pt-12->pt-6, pb-24->pb-8 to show ticker above fold
      className="relative pt-6 pb-8 overflow-hidden bg-gradient-to-b from-brand-red to-[#b9121e]"
    >
      
      {/* Background decoration (visible if no custom image is used for the section background itself) */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        
        {/* REDUCED MARGINS AND FONT SIZES */}
        <div className="mb-4 max-w-3xl">
          <h1 
            className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-2 leading-tight drop-shadow-md text-white"
            dangerouslySetInnerHTML={{ __html: hero.title }}
          />
          <p className="text-base md:text-lg text-white/90 font-medium">
            {hero.subtitle}
          </p>
        </div>

        {/* Video Container with Facade Pattern */}
        {videoId ? (
          <div className="w-full max-w-4xl bg-black rounded-2xl shadow-2xl overflow-hidden border-4 border-white/20 relative aspect-video group transform transition-transform duration-500">
            
            {isPlaying ? (
              <iframe 
                className="w-full h-full relative z-10"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&modestbranding=1&playsinline=1&origin=${origin}`}
                title="Vídeo do Feirão"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
            ) : (
              /* Facade: Static Image + Play Button (Loads instantly) */
              <button 
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 w-full h-full flex items-center justify-center bg-black group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                aria-label="Reproduzir vídeo"
              >
                {thumbnailUrl && (
                  <img 
                    src={thumbnailUrl} 
                    alt="Capa do Vídeo" 
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                    loading="eager"
                  />
                )}
                
                {/* Play Button Overlay */}
                <div className="relative z-20 w-16 h-16 md:w-20 md:h-20 bg-brand-red/90 rounded-full flex items-center justify-center pl-1 shadow-[0_0_30px_rgba(225,29,43,0.6)] group-hover:scale-110 transition-transform duration-300">
                   <Play fill="white" className="text-white w-8 h-8 md:w-10 md:h-10" />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
              </button>
            )}

          </div>
        ) : (
          <div className="w-full max-w-4xl bg-black/20 text-white rounded-2xl h-48 md:h-64 flex items-center justify-center border-2 border-dashed border-white/30">
            <p>Insira um link válido do YouTube no painel</p>
          </div>
        )}

        {/* CTA Button Block - REDUCED MARGIN: mt-10 -> mt-6 */}
        <div className="mt-6 transform hover:scale-105 transition-transform duration-300">
          <button 
            onClick={() => document.getElementById('parceiros')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative inline-flex items-center justify-center px-6 py-3 bg-white text-brand-red font-black text-base md:text-lg rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] transition-all overflow-hidden"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-brand-dark rounded-full group-hover:w-72 group-hover:h-72 opacity-10"></span>
            <span className="relative flex items-center gap-2">
              {hero.ctaText}
              <ArrowDown className="animate-bounce w-5 h-5" />
            </span>
          </button>
          <p className="mt-2 text-xs md:text-sm text-white/80 font-medium">
            {hero.ctaSubtext}
          </p>
        </div>

      </div>
    </section>
  );
};