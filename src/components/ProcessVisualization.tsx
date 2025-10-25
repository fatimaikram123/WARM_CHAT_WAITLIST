import React from 'react';
import { Instagram, Mail, Linkedin, Sparkle, Play, ArrowRight, Bot, Flame } from 'lucide-react';

const ProcessVisualization: React.FC = () => {
  return (
    <section id="process" className="section-padding bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle mb-12 md:mb-16">
          Turn your outreach into conversations in just three simple steps
        </p>
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-12 relative">
          {/* Connecting gradient line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-warmchats-primary via-warmchats-flame to-warmchats-primary transform -translate-y-1/2 z-0"></div>
          
          {/* Step 1: Select Platform */}
          <div className="flex-1 w-full max-w-sm lg:max-w-none bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 relative z-10 hover:shadow-md transition-all transform hover:-translate-y-1">
            <div className="absolute -top-3 md:-top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-warmchats-primary to-warmchats-primary-dark text-white w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold shadow-md text-sm md:text-base">1</div>
            <h3 className="font-bold text-lg md:text-xl mb-3 md:mb-4 mt-3 md:mt-4 text-center">Select a Platform</h3>
            <div className="bg-warmchats-primary-light p-3 md:p-5 rounded-lg mb-3 md:mb-4">
              <div className="flex justify-center gap-3 md:gap-4">
                <div className="bg-white p-2 md:p-3 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:scale-105 cursor-pointer">
                  <Instagram size={24} className="text-warmchats-primary md:w-7 md:h-7" />
                </div>
                <div className="bg-white p-2 md:p-3 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:scale-105 cursor-pointer">
                  <Mail size={24} className="text-warmchats-primary md:w-7 md:h-7" />
                </div>
                <div className="bg-white p-2 md:p-3 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:scale-105 cursor-pointer">
                  <Linkedin size={24} className="text-warmchats-primary md:w-7 md:h-7" />
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-xs md:text-sm text-center">Choose your outreach channel from multiple platform options</p>
          </div>
          
          {/* Arrow 1 */}
          <div className="hidden lg:flex items-center justify-center z-20">
            <div className="bg-white p-2 rounded-full shadow-md">
              <ArrowRight size={24} className="text-warmchats-primary" />
            </div>
          </div>
          
          {/* Step 2: Enter Prompt */}
          <div className="flex-1 w-full max-w-sm lg:max-w-none bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 relative z-10 hover:shadow-md transition-all transform hover:-translate-y-1">
            <div className="absolute -top-3 md:-top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-warmchats-primary to-warmchats-flame text-white w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold shadow-md text-sm md:text-base">2</div>
            <h3 className="font-bold text-lg md:text-xl mb-3 md:mb-4 mt-3 md:mt-4 text-center">Enter a Prompt</h3>
            <div className="bg-warmchats-primary-light p-3 md:p-5 rounded-lg mb-3 md:mb-4">
              <div className="bg-white border border-gray-200 p-3 md:p-4 rounded-lg shadow-inner">
                <div className="flex items-center gap-2 mb-2">
                  <Bot size={16} className="text-warmchats-primary md:w-4 md:h-4" />
                  <p className="text-xs md:text-sm text-gray-700 font-medium">Write to John about our software...</p>
                </div>
                <div className="h-1.5 md:h-2 w-full bg-gray-100 rounded mt-2 md:mt-3"></div>
                <div className="h-1.5 md:h-2 w-3/4 bg-gray-100 rounded mt-1.5 md:mt-2"></div>
                <div className="flex justify-end mt-1.5 md:mt-2">
                  <div className="bg-warmchats-primary rounded-full p-0.5 md:p-1 opacity-70">
                    <Flame size={12} className="text-white md:w-3.5 md:h-3.5" />
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-xs md:text-sm text-center">Describe who you want to reach out to and your goal</p>
          </div>
          
          {/* Arrow 2 */}
          <div className="hidden lg:flex items-center justify-center z-20">
            <div className="bg-white p-2 rounded-full shadow-md">
              <ArrowRight size={24} className="text-warmchats-primary" />
            </div>
          </div>
          
          {/* Step 3: Generated Message */}
          <div className="flex-1 w-full max-w-sm lg:max-w-none bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 relative z-10 hover:shadow-md transition-all transform hover:-translate-y-1">
            <div className="absolute -top-3 md:-top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-warmchats-flame to-warmchats-primary text-white w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold shadow-md text-sm md:text-base">3</div>
            <h3 className="font-bold text-lg md:text-xl mb-3 md:mb-4 mt-3 md:mt-4 text-center">Generated Message</h3>
            <div className="bg-warmchats-primary-light p-3 md:p-5 rounded-lg mb-3 md:mb-4 relative">
              <div className="bg-white border border-warmchats-primary border-opacity-20 p-3 md:p-4 rounded-lg shadow-inner">
                <div className="flex items-center gap-2 mb-2 md:mb-3">
                  <Sparkle size={14} className="text-warmchats-flame md:w-4 md:h-4" />
                  <span className="text-xs font-medium text-warmchats-primary">AI-Generated</span>
                </div>
                <p className="text-xs md:text-sm">Hi John, I noticed your recent project launch and thought our software might help with scaling...</p>
                <div className="flex justify-end mt-1.5 md:mt-2">
                  <Sparkle size={16} className="text-warmchats-flame md:w-4 md:h-4" />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                <div className="bg-warmchats-primary bg-opacity-90 rounded-full p-2 md:p-3 transform hover:scale-110 transition-transform">
                  <Play size={24} className="text-white md:w-7 md:h-7" fill="white" />
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-xs md:text-sm text-center">Get a personalized message ready to send in seconds</p>
          </div>
        </div>
        
        {/* Action Button */}
        <div className="text-center mt-12 md:mt-16">
          <a href="#how-it-works" className="inline-flex items-center gap-2 bg-white border border-warmchats-primary text-warmchats-primary px-4 md:px-6 py-2 md:py-3 rounded-full hover:bg-warmchats-primary hover:text-white transition-colors shadow-sm text-sm md:text-base">
            <span>See how it works</span>
            <ArrowRight size={16} className="md:w-4 md:h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProcessVisualization;
