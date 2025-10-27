
import React from 'react';
import WaitlistForm from './WaitlistForm';
import { Flame, Sparkles, Zap, Check, ArrowRight } from 'lucide-react';

const WaitlistCTA: React.FC = () => {
  const benefits = [
    "Early access to all features",
    "Priority support during onboarding",
    "Special launch pricing for early adopters",
    "Input into future feature development"
  ];
 

  
  return (
    <section id="waitlist" className="section-padding gradient-bg relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2">
        <Flame size={120} className="text-warmchats-flame opacity-10" />
      </div>
      <div className="absolute left-10 bottom-10">
        <Sparkles size={80} className="text-warmchats-primary opacity-10" />
      </div>
      <div className="absolute right-1/4 bottom-1/3">
        <Zap size={60} className="text-warmchats-flame opacity-10" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 max-w-5xl relative">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-6 md:p-8 lg:p-12">
              <div className="inline-flex items-center justify-center px-3 py-1 mb-4 md:mb-6 bg-warmchats-primary-light rounded-full">
                <Flame size={14} className="text-warmchats-flame mr-2 md:w-4 md:h-4" />
                <span className="text-xs md:text-sm font-semibold">Limited Spots Available</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Be First In Line</h2>
              <p className="text-lg md:text-xl text-gray-600 mb-4 md:mb-6">
                Join our waitlist to get early access and special launch pricing when we go live.
              </p>
              
              <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 md:gap-3">
                    <div className="bg-warmchats-primary-light rounded-full p-1">
                      <Check size={16} className="text-warmchats-primary md:w-4 md:h-4" />
                    </div>
                    <span className="text-sm md:text-base">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="mb-6">
                <WaitlistForm location="bottom-cta" showFlame={false} />
              </div>
              
              <p className="text-xs md:text-sm text-gray-500 flex items-center justify-start gap-2">
                <Flame size={14} className="text-warmchats-flame md:w-4 md:h-4" />
                <span>No spam, just product updates and launch information</span>
              </p>
            </div>
            
            <div className="md:w-1/2 bg-gradient-to-br from-warmchats-primary to-warmchats-primary-dark p-6 md:p-8 lg:p-12 text-white relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0">
                <Sparkles size={180} className="text-white opacity-10" />
              </div>
              <div className="absolute bottom-0 left-0">
                <Flame size={220} className="text-warmchats-flame opacity-10" />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Why Join Now?</h3>
                
                <div className="space-y-4 md:space-y-6">
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3 md:p-4">
                    <div className="flex items-center gap-2 md:gap-3 mb-2">
                      <Zap size={18} className="text-warmchats-flame md:w-5 md:h-5" />
                      <h4 className="font-semibold text-sm md:text-base">Early Adopter Perks</h4>
                    </div>
                    <p className="text-white text-opacity-90 text-xs md:text-sm">
                      Get lifetime discounted pricing only available during our initial launch phase.
                    </p>
                  </div>
                  
                  <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3 md:p-4">
                    <div className="flex items-center gap-2 md:gap-3 mb-2">
                      <Sparkles size={18} className="text-warmchats-flame md:w-5 md:h-5" />
                      <h4 className="font-semibold text-sm md:text-base">Advanced Features First</h4>
                    </div>
                    <p className="text-white text-opacity-90 text-xs md:text-sm">
                      Be among the first to access our most advanced AI outreach capabilities.
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 md:gap-3 mt-6 md:mt-8 flex-wrap">
                    <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                      <span className="font-bold text-xs md:text-sm">1</span>
                    </div>
                    <span className="text-white text-opacity-80 text-xs md:text-sm">Enter your email</span>
                    <ArrowRight className="text-white text-opacity-60" size={14} />
                    <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                      <span className="font-bold text-xs md:text-sm">2</span>
                    </div>
                    <span className="text-white text-opacity-80 text-xs md:text-sm">Get notified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistCTA;
