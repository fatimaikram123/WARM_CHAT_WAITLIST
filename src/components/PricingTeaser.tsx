
import React from 'react';
import { Coins } from 'lucide-react';

const PricingTeaser: React.FC = () => {
  return (
    <section id="pricing" className="section-padding bg-warmchats-primary text-white">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="flex flex-col md:flex-row items-center justify-between bg-white bg-opacity-10 rounded-xl p-6 md:p-8 lg:p-12 backdrop-blur-sm">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <div className="mb-2 md:mb-3 flex justify-center md:justify-start">
              <Coins size={24} className="text-warmchats-flame md:w-8 md:h-8" />
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2">Affordable plans for startups and pros</h2>
            <p className="text-white text-opacity-80 text-sm md:text-base">
              Choose the perfect plan for your team's outreach needs
            </p>
          </div>
          
          <a 
            href="#waitlist" 
            className="px-4 md:px-6 py-2 md:py-3 rounded-full bg-white text-warmchats-primary font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm md:text-base"
          >
            See Plans
          </a>
        </div>
      </div>
    </section>
  );
};

export default PricingTeaser;
