
import React from 'react';
import { Zap, Target, Globe, Users } from 'lucide-react';

const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: <Zap size={32} className="text-warmchats-flame" />,
      title: "Fast AI Message Generation",
      description: "Generate personalized messages in seconds, not hours. Speed up your outreach workflows dramatically."
    },
    {
      icon: <Target size={32} className="text-warmchats-primary" />,
      title: "Hyper-Personalization",
      description: "Create messages that resonate with each recipient by automatically including relevant details and context."
    },
    {
      icon: <Globe size={32} className="text-warmchats-flame" />,
      title: "Platform Flexibility",
      description: "Seamlessly create content for emails, LinkedIn, Facebook, WhatsApp, Instagram, and more from one place."
    },
    {
      icon: <Users size={32} className="text-warmchats-primary" />,
      title: "Team Collaboration & Analytics",
      description: "Share templates, track performance, and optimize your outreach strategies with built-in analytics."
    }
  ];

  return (
    <section id="benefits" className="section-padding bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-warmchats-primary-light rounded-full blur-3xl opacity-30 -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-warmchats-flame-light rounded-full blur-3xl opacity-20 -z-10 transform -translate-x-1/4 translate-y-1/4"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-4 bg-white bg-opacity-70 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
            <Zap size={16} className="text-warmchats-flame mr-2" />
            <span className="text-sm font-semibold">Why Choose WarmChats</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Benefits That Set Us Apart</h2>
          <p className="text-gray-600 text-lg">
            Our AI-powered platform provides unique advantages for your outreach strategy
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-8 md:mt-12">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-50 transform hover:-translate-y-1"
            >
              <div className="inline-block bg-gradient-to-br from-warmchats-primary-light to-white p-2 md:p-3 rounded-2xl shadow-sm mb-4 md:mb-6">
                <div className="bg-white p-1.5 md:p-2 rounded-xl shadow-inner">
                  {React.cloneElement(benefit.icon, { 
                    size: 24, 
                    className: `${benefit.icon.props.className} md:w-8 md:h-8` 
                  })}
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{benefit.title}</h3>
              <p className="text-gray-600 text-sm md:text-base">{benefit.description}</p>
            </div>
          ))}
        </div>
        
        {/* Statistics Section */}
        <div className="mt-16 md:mt-20 bg-white rounded-2xl shadow-sm border border-gray-50 p-6 md:p-8 lg:p-10">
          <div className="grid sm:grid-cols-3 gap-6 md:gap-10">
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-warmchats-primary mb-1 md:mb-2">3x</div>
              <p className="text-gray-600 text-sm md:text-base">Higher response rates compared to traditional outreach</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-warmchats-flame mb-1 md:mb-2">85%</div>
              <p className="text-gray-600 text-sm md:text-base">Time saved on creating personalized messages</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-warmchats-primary mb-1 md:mb-2">24/7</div>
              <p className="text-gray-600 text-sm md:text-base">AI assistance for your outreach campaigns</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
