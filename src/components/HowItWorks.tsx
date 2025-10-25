
import React from 'react';
import { Flame, PenTool, Copy, Send } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <PenTool size={28} className="text-warmchats-primary" />,
      title: "Enter Prompts",
      description: "Provide a few details about your target audience and message goals."
    },
    {
      icon: <Flame size={28} className="text-warmchats-flame" />,
      title: "AI Generates",
      description: "Our AI instantly crafts personalized messages for any platform."
    },
    {
      icon: <Copy size={28} className="text-warmchats-primary" />,
      title: "Copy & Send",
      description: "Review, tweak if needed, and send across multiple channels."
    }
  ];

  return (
    <section id="how-it-works" className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">How WarmChats Works</h2>
        <p className="section-subtitle">
          Turn cold outreach into meaningful conversations in three simple steps
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mt-12 md:mt-16">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative flex flex-col items-center text-center"
            >
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gray-200"></div>
              )}
              
              {/* Step number */}
              <div className="bg-white border-2 border-warmchats-primary text-warmchats-primary font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4 md:mb-6 relative z-10 text-sm md:text-base">
                {index + 1}
              </div>
              
              {/* Icon */}
              <div className="bg-white border border-gray-100 shadow-lg rounded-full p-3 md:p-5 mb-4 md:mb-6 relative z-10">
                {React.cloneElement(step.icon, { 
                  size: 24, 
                  className: `${step.icon.props.className} md:w-7 md:h-7` 
                })}
              </div>
              
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{step.title}</h3>
              <p className="text-gray-600 text-sm md:text-base">{step.description}</p>
              
              {/* Illustration */}
              <div className="mt-6 md:mt-8 bg-gray-50 p-3 md:p-4 rounded-lg w-full">
                {index === 0 && (
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                    <PenTool size={14} className="md:w-4 md:h-4" />
                    <span>"Write to John about our software..."</span>
                  </div>
                )}
                
                {index === 1 && (
                  <div className="flex flex-col gap-1">
                    <div className="h-1.5 md:h-2 w-3/4 bg-warmchats-primary-light rounded"></div>
                    <div className="h-1.5 md:h-2 w-full bg-warmchats-primary-light rounded"></div>
                    <div className="h-1.5 md:h-2 w-5/6 bg-warmchats-primary-light rounded"></div>
                    <div className="h-1.5 md:h-2 w-2/3 bg-warmchats-primary-light rounded"></div>
                    <Flame size={14} className="text-warmchats-flame mt-2 self-end md:w-4 md:h-4" />
                  </div>
                )}
                
                {index === 2 && (
                  <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-600">
                    <Send size={14} className="md:w-4 md:h-4" />
                    <span className="text-warmchats-primary font-medium">Message sent!</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
