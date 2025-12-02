import React, { useMemo } from 'react';
import { PartnerCard } from './PartnerCard';
import { useContent } from '../context/ContentContext';

export const PartnerGrid: React.FC = () => {
  const { content } = useContent();
  const partners = content.partners;

  // Logic to process partners based on configuration
  const shuffledPartners = useMemo(() => {
    // Create a shallow copy to avoid mutating context
    let partnersList = [...partners];

    if (content.partnersConfig?.autoHighlight) {
      // 1. Shuffle the list completely first
      // This ensures that WHICH partners get selected for the 60% quota is random
      partnersList.sort(() => Math.random() - 0.5);

      // 2. Calculate the specific quota (60% of total)
      const total = partnersList.length;
      const quota = Math.round(total * 0.6);

      // 3. Assign 'featured' status to the first N items (quota) and remove from others
      partnersList = partnersList.map((p, index) => ({
        ...p,
        featured: index < quota
      }));

      // The list is already shuffled from step 1, so we return it as is.
    } else {
      // Manual Mode: Just shuffle the display order, but respect the 'featured' flag set in Admin
      partnersList.sort(() => Math.random() - 0.5);
    }

    return partnersList;
  }, [partners, content.partnersConfig?.autoHighlight]); 

  return (
    <section id="parceiros" className="bg-brand-gray py-20 relative scroll-mt-20">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-brand-dark mb-4 uppercase">
            Nossas Lojas <span className="text-brand-red">Parceiras</span>
          </h2>
          <div className="h-1 w-24 bg-brand-red mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Encontre o carro dos seus sonhos nas melhores lojas da região. 
            Negocie diretamente pelo WhatsApp com condições exclusivas do Feirão.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shuffledPartners.map((partner, index) => (
            <PartnerCard key={partner.id} partner={partner} index={index} />
          ))}
          {shuffledPartners.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-400">
                Nenhuma loja cadastrada no momento.
            </div>
          )}
        </div>

      </div>
    </section>
  );
};