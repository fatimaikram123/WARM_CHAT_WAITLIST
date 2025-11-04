
import React from 'react';
import { Layers, FileText, PieChart, Sparkles, Puzzle, Shield } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Layers size={28} className="text-warmchats-primary" />,
      title: "Multi-Channel Support",
      description: "Write once, deliver anywhere - from email to social DMs. Seamlessly adapt your messages for different platforms while maintaining personalization."
    },
    {
      icon: <FileText size={28} className="text-warmchats-flame" />,
      title: "Custom Templates",
      description: "Create and save your favorite prompts and templates. Build a library of effective outreach approaches tailored to your specific needs."
    },
    {
      icon: <PieChart size={28} className="text-warmchats-primary" />,
      title: "Advanced Analytics",
      description: "Track performance and optimize your messaging with detailed insights. Understand what works and continuously improve your outreach strategies."
    },
    {
      icon: <Sparkles size={28} className="text-warmchats-flame" />,
      title: "AI Personalization",
      description: "Automatically include personal details and context that creates genuine connections. Move beyond basic mail merge to true personalization."
    },
    {
      icon: <Puzzle size={28} className="text-warmchats-primary" />,
      title: "Integrations",
      description: "Connect with your favorite CRM and email tools for a seamless workflow. Import contacts and export messages to your existing tech stack."
    },
    {
      icon: <Shield size={28} className="text-warmchats-flame" />,
      title: "Data Security",
      description: "Your contacts and messages stay private and secure with enterprise-grade encryption and privacy controls to protect sensitive information."
    }
  ];

  return (
    <section id="features" className="section-padding bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-0 w-80 h-80 bg-warmchats-primary-light rounded-full blur-3xl opacity-20 -z-10"></div>
      <div className="absolute bottom-40 right-0 w-96 h-96 bg-warmchats-flame-light rounded-full blur-3xl opacity-20 -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-4 bg-warmchats-primary-light bg-opacity-70 backdrop-blur-sm rounded-full shadow-sm">
            <Sparkles size={16} className="text-warmchats-primary mr-2" />
            <span className="text-sm font-semibold">Feature-Rich Platform</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-gray-600 text-lg">
            Everything you need to create engaging, personalized outreach at scale
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-100 p-4 md:p-6 rounded-xl hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                <div className={`bg-gradient-to-br ${index % 2 === 0 ? 'from-warmchats-primary-light to-white' : 'from-warmchats-flame-light to-white'} p-2 md:p-3 rounded-xl shadow-sm`}>
                  {React.cloneElement(feature.icon, { 
                    size: 24, 
                    className: `${feature.icon.props.className} md:w-7 md:h-7` 
                  })}
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm md:text-base">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Feature highlight */}
        <div className="mt-16 md:mt-20 bg-gradient-to-r from-warmchats-primary to-warmchats-primary-dark rounded-2xl shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 p-6 md:p-8 lg:p-12">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4">AI-Powered Message Generation</h3>
              <p className="text-white text-opacity-90 mb-4 md:mb-6 text-sm md:text-base">
                Our advanced AI understands context, tone, and purpose to create messages that sound authentically human and drive meaningful conversations.
              </p>
              <a href="/signup" className="inline-block bg-white text-warmchats-primary font-semibold px-4 md:px-6 py-2 md:py-3 rounded-full hover:shadow-lg transition-all transform hover:scale-105 text-sm md:text-base">
                Try It Now
              </a>
            </div>
            <div className="md:w-1/2 bg-white p-4 md:p-6 lg:p-8 m-3 md:m-4 lg:m-8 rounded-xl shadow-lg">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <Sparkles size={18} className="text-warmchats-flame md:w-5 md:h-5" />
                <span className="font-medium text-sm md:text-base">AI-Generated Sample</span>
              </div>
              <p className="text-gray-700 italic bg-gray-50 p-3 md:p-4 rounded-lg border border-gray-100 text-xs md:text-sm">
                "Hi Mark, I noticed you just published research on AI adoption in healthcare. As someone working to improve patient outcomes through technology, I'd love to discuss how our solution aligns with your findings on reducing administrative burden for clinicians."
              </p>
              <div className="mt-3 md:mt-4 flex justify-end">
                <span className="text-xs md:text-sm text-gray-500">Personalized based on recipient's recent work</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
