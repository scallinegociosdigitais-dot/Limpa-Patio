import React from 'react';
import { ShieldCheck, Percent, Zap } from 'lucide-react';

export const InfoSection: React.FC = () => {
  return (
    <section className="bg-white py-16 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <div className="flex flex-col items-center text-center p-4">
            <div className="bg-red-50 p-4 rounded-full text-brand-red mb-4">
              <Percent size={32} />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-800">Taxas Imperdíveis</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Condições especiais de financiamento negociadas exclusivamente para o período do feirão.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="bg-red-50 p-4 rounded-full text-brand-red mb-4">
              <ShieldCheck size={32} />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-800">Compra Segura</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Todas as lojas parceiras são verificadas para garantir a segurança e procedência do seu novo veículo.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="bg-red-50 p-4 rounded-full text-brand-red mb-4">
              <Zap size={32} />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-800">Aprovação Rápida</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Sistema integrado com financeiras para análise de crédito e aprovação na hora.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};