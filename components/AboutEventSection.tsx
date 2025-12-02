
import React from 'react';
import { useContent } from '../context/ContentContext';
import { AboutFeatureCard } from '../types';

export const AboutEventSection: React.FC = () => {
  const { content } = useContent();
  const { about } = content;

  return (
    <section id="mega-feirao" className="bg-white py-16 md:py-24 scroll-mt-20">
      <div className="container mx-auto px-4">
        
        {/* Header Graphic Placeholder - or Custom Image */}
        <div className="flex justify-center mb-16">
          {about.topImage ? (
             <img 
               src={about.topImage} 
               alt="Logo Mega Feirão" 
               className="max-w-full h-auto max-h-60 md:max-h-80 object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
             />
          ) : (
            <div className="relative group cursor-default select-none">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-brand-red blur-[50px] opacity-20 rounded-full scale-150"></div>
              
              {/* Main Badge */}
              <div className="relative bg-gradient-to-b from-[#E11D2B] to-[#b3000c] px-12 py-6 rounded-3xl shadow-[0_20px_50px_rgba(225,29,43,0.3)] border-b-8 border-[#8a0009] transform -rotate-1 hover:rotate-0 transition-transform duration-500 z-10">
                  <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter text-white drop-shadow-sm text-center uppercase" style={{ textShadow: '4px 4px 0px #8a0009' }}>
                      {about.mainTitle}
                  </h2>
                  
                  {/* Partner Lockup Pill (Santander + Webmotors) */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-6 md:px-8 py-3 rounded-2xl shadow-xl border-b-4 border-gray-100 flex items-center gap-4 md:gap-6 whitespace-nowrap z-20">
                      
                      {/* Santander */}
                      <div className="flex items-center gap-2">
                          <svg viewBox="0 0 50 50" fill="currentColor" className="w-6 h-6 md:w-8 md:h-8 text-[#EC0000]">
                             <path d="M25 0C11.193 0 0 11.193 0 25s11.193 25 25 25 25-11.193 25-25S38.807 0 25 0zm0 45C13.972 45 5 36.028 5 25S13.972 5 25 5s20 8.972 20 20-8.972 20-20 20z"/>
                             <path d="M22 12c-4 0-6 3-6 6s3 5 4 6c.7.7 0 2-1 2-2 0-3-2-3-3 0-1-1-1-1-1s-1 1-1 2c0 3 3 5 5 5 3.5 0 6-2.5 6-6 0-3-3-4-4-5-.7-.7 0-2 1-2 1.5 0 2.5 1.5 2.5 2.5 0 1 1 1 1 1s1-1 1-2c0-3-3-5-5-5z"/>
                             <path d="M30 15c-1 0-1.5.5-2 1.5-.5-1-1-1.5-2-1.5-1.5 0-2.5 1.5-2.5 2.5 0 1 1 1 1 1s1-1 1-2c0-1 1-2 1-2 .5 0 1 .5 1.5 1.5.5 1 1.5 1 2 0 .5-1 1-1.5 1-1.5s.5.5 1 1.5c.5 1 1.5 1 2 0 .5-1 1-1.5 1.5-1.5s.5 1 .5 2c0 1 1 1 1 1s1-1 1-2c0-2.5-2-3.5-3.5-3.5z"/>
                             <path d="M25 38c3.5 0 6-2 6-5s-2-5-5-5-5 2.5-5 5 2.5 5 4 5zm0-8c2 0 3 1.5 3 3s-1 3-3 3-3-1.5-3-3 1-3 3-3z"/>
                          </svg>
                          <span className="text-[#EC0000] font-bold text-lg md:text-2xl tracking-tighter">Santander</span>
                      </div>

                      {/* Divider */}
                      <div className="w-px h-6 md:h-8 bg-gray-300"></div>

                      {/* Webmotors */}
                      <div className="flex items-center gap-2">
                          <div className="w-6 h-6 md:w-8 md:h-8 bg-[#E11D2B] rounded-md md:rounded-lg flex items-center justify-center text-white p-1">
                              {/* Shifter Icon */}
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                                  <path d="M5 4h3v6h3V4h2v6h3V4h3v16h-3v-6h-3v6h-2v-6H8v6H5V4z" />
                              </svg>
                          </div>
                          <span className="text-black font-bold text-lg md:text-2xl tracking-tighter lowercase">webmotors</span>
                      </div>

                  </div>

                  {/* Decorative floating icons */}
                  <div className="absolute -left-6 -top-4 bg-white p-2 rounded-full shadow-lg border-2 border-red-100 animate-bounce delay-100 hidden md:block">
                      <span className="text-2xl font-black text-brand-red">%</span>
                  </div>
                  <div className="absolute -right-8 top-1/2 bg-brand-red p-3 rounded-xl shadow-lg border-2 border-red-800 rotate-12 hidden md:block">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="w-6 h-6"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 13h-2v-6h2v6zm0-8h-2V7h2v1z" fill="white"/></svg>
                  </div>
              </div>
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className="max-w-4xl mx-auto mb-20 mt-28 md:mt-24">
             <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-brand-dark mb-8 text-center leading-tight">
                {about.heading}
            </h2>
            <div className="space-y-6 text-gray-600 text-sm md:text-lg leading-relaxed text-justify md:text-left font-medium">
                <p>{about.descriptionP1}</p>
                <p>{about.descriptionP2}</p>
            </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.featureCards?.map((card, index) => (
                <FeatureCard 
                    key={index}
                    image={card.image}
                    title={card.title}
                    subtitle={card.subtitle}
                    badge={card.badge}
                    linkUrl={card.linkUrl}
                />
            ))}
        </div>
      </div>
    </section>
  )
}

interface FeatureCardProps {
  image: string;
  title: string;
  subtitle: string;
  badge?: boolean;
  linkUrl?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ image, title, subtitle, badge, linkUrl }) => {
    const CardContent = () => (
        <div className={`bg-red-50 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer border border-red-100 flex flex-col h-full ${linkUrl ? 'hover:border-brand-red' : ''}`}>
            <div className="h-40 overflow-hidden relative">
                <div className="absolute inset-0 bg-brand-red opacity-0 group-hover:opacity-10 transition-opacity z-10 duration-300"></div>
                <img src={image} alt={title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                {badge && (
                    <div className="absolute top-3 right-3 bg-brand-red text-white p-1.5 rounded-full shadow-lg z-20">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </div>
                )}
            </div>
            <div className="p-5 text-center flex-grow flex flex-col justify-center bg-gradient-to-b from-red-50 to-white">
                <h3 className="font-black text-sm text-brand-dark uppercase tracking-wide mb-1.5">{title}</h3>
                <div className="text-gray-600 text-xs font-medium">
                    {subtitle.includes('aqui') ? (
                         <span>{subtitle.replace('aqui', '')} <span className="font-bold underline text-brand-red">aqui</span></span>
                    ) : (
                        subtitle
                    )}
                </div>
            </div>
        </div>
    );

    if (linkUrl && linkUrl !== '#') {
        return (
            <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
                <CardContent />
            </a>
        );
    }

    return <CardContent />;
}
