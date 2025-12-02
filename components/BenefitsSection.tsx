

import React from 'react';
import { ChevronRight, Car } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const BenefitsSection: React.FC = () => {
  const { content } = useContent();
  const { benefits } = content;

  return (
    <section id="novidades" className="bg-[#2D2D35] py-16 md:py-24 text-white font-sans overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-4">
        
        {/* Top Red Banner */}
        <div className="bg-brand-red rounded-xl p-4 flex flex-col md:flex-row items-center justify-center gap-2 mb-16 text-center shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center gap-2">
            <Car fill="white" size={24} />
            <span className="font-bold text-sm md:text-lg uppercase">
              {benefits.bannerText.split(' ').slice(0, 3).join(' ')} {/* Just guessing the split for bolding based on context, or just plain text */}
            </span>
          </div>
          <span className="text-sm md:text-base">
            {benefits.bannerText.split(' ').slice(3).join(' ')} 
            <a 
                href={benefits.bannerLink || '#'} 
                target={benefits.bannerLink?.startsWith('#') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="underline font-bold hover:text-red-100 ml-1"
            >
                Clique aqui
            </a>
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:w-5/12 relative">
            <h2 
                className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
                dangerouslySetInnerHTML={{ __html: benefits.mainTitle }}
            />
            <p className="text-gray-300 text-lg mb-12">
              {benefits.subTitle}
            </p>
            
            <div className="relative mt-8 lg:mt-0">
                {/* Decorative Elements mimicking the 3D icons */}
                <div className="absolute -top-12 right-0 lg:-right-8 bg-brand-red w-20 h-20 rounded-2xl rotate-12 flex items-center justify-center shadow-2xl z-10 animate-bounce">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-10 h-10 text-white" strokeWidth="2.5">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                
                {/* Main Car Image */}
                <img 
                  src={benefits.mainImage} 
                  alt="Carro em destaque" 
                  className="w-full relative z-0 rounded-lg shadow-2xl transform hover:scale-105 transition-duration-500"
                />
            </div>
          </div>

          {/* Right Content - Cards List */}
          <div className="lg:w-7/12 w-full flex flex-col gap-4">
            {benefits.items.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 md:p-5 flex items-start md:items-center gap-4 text-brand-dark shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="w-24 h-24 md:w-32 md:h-24 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    <img src={benefit.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                <div className="flex-1 flex flex-col items-start justify-center h-full">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-bold text-sm md:text-base">{benefit.title}</h3>
                    {benefit.tag && (
                      <span className="bg-gray-200 text-[10px] px-2 py-0.5 rounded text-gray-600 font-bold uppercase tracking-wider">
                        {benefit.tag}
                      </span>
                    )}
                  </div>
                  
                  <p 
                    className="text-xs md:text-sm text-gray-600 mb-3 leading-relaxed" 
                    dangerouslySetInnerHTML={{ __html: benefit.description }} 
                  />
                  
                  <a 
                    href={benefit.linkUrl || '#'} 
                    target={benefit.linkUrl?.startsWith('#') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="bg-brand-red text-white text-xs font-bold px-5 py-2 rounded-lg flex items-center gap-1 hover:bg-red-700 transition-colors shadow-md inline-flex"
                  >
                    Receber ofertas <ChevronRight size={14} strokeWidth={3} />
                  </a>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};