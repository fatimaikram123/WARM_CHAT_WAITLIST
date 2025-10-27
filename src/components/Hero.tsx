import React from 'react';
import { Flame, ArrowRight, Bot, PenTool, Sparkles, CheckCircle } from 'lucide-react';

const Hero: React.FC = () => {
  const handleScrollToWaitlist = () => {
    const section = document.getElementById("waitlist");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-24 pb-16 md:pt-40 md:pb-28 overflow-hidden gradient-bg">
      {/* Decorative background */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-warmchats-flame-light rounded-full blur-3xl opacity-30 -z-10 animate-pulse-gentle"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-warmchats-primary-light rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute top-1/3 left-1/2 w-96 h-96 bg-warmchats-primary-light rounded-full blur-3xl opacity-20 -z-10 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-warmchats-flame-light rounded-full blur-3xl opacity-20 -z-10 animate-pulse-gentle animation-delay-500"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          {/* Left content */}
          <div className="flex-1">
            {/* Tagline */}
            <div className="inline-flex items-center justify-center lg:justify-start px-3 py-1 mb-4 bg-white/30 backdrop-blur-sm rounded-full border border-white/20 shadow-sm">
              <Flame size={16} className="text-warmchats-flame mr-2" />
              <span className="text-xs md:text-sm font-semibold">AI-Powered Outreach Platform</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent leading-tight">
              Turn Cold Outreach into Warm Conversations.
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Our AI-powered platform helps you send hyper-personalized messages in seconds across multiple channels — increasing your response rates by 300%.
            </p>

            {/* Email Input */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full sm:w-80 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-warmchats-primary text-gray-700"
              />
              <button
                onClick={handleScrollToWaitlist}
                className="w-full sm:w-auto bg-warmchats-primary text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-warmchats-primary-dark transition-all"
              >
                Join Waitlist
              </button>
            </div>

            {/* Buttons Section */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-6 px-2">
              <button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-orange-500 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:opacity-90 transition-all">
                Start 7-day free trial
              </button>

              <button className="w-full sm:w-auto border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-purple-50 transition-all">
                Schedule a Demo
              </button>
            </div>

            {/* No Credit Card Text */}
            <div className="flex justify-center lg:justify-start items-center text-sm text-gray-600 gap-2 mb-6">
              <CheckCircle size={16} className="text-green-500" />
              <span>No credit card required</span>
            </div>

            {/* Highlights */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 items-center">
              <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
                <Flame size={14} className="text-warmchats-flame" />
                <span className="text-xs md:text-sm text-gray-700 font-medium">Early access launching soon</span>
              </div>
              <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
                <Bot size={14} className="text-warmchats-primary" />
                <span className="text-xs md:text-sm text-gray-700 font-medium">AI-powered messaging</span>
              </div>
              <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
                <PenTool size={14} className="text-warmchats-flame" />
                <span className="text-xs md:text-sm text-gray-700 font-medium">Deeply personalized</span>
              </div>
            </div>
          </div>

          {/* Right content (illustration) */}
          <div className="flex-1 max-w-lg relative">
            <div className="absolute -left-6 md:-left-10 -top-6 md:-top-10 w-16 md:w-20 h-16 md:h-20 bg-warmchats-primary-light rounded-full opacity-60 animate-float"></div>
            <div className="absolute -right-4 md:-right-8 bottom-6 md:bottom-10 w-12 md:w-16 h-12 md:h-16 bg-warmchats-flame-light rounded-full opacity-60 animate-float animation-delay-500"></div>

            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-50">
              {/* Header */}
              <div className="bg-gradient-to-r from-warmchats-primary to-warmchats-primary-dark p-4 text-white">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-white bg-opacity-20 rounded-full">
                    <Flame size={20} />
                  </div>
                  <div>
                    <div className="text-sm md:text-lg font-bold">WarmChats Assistant</div>
                    <div className="text-xs text-white text-opacity-80">Powered by AI</div>
                  </div>
                </div>
              </div>

              {/* Chat example */}
              <div className="p-4 md:p-6">
                <div className="border border-gray-100 bg-gray-50 p-3 rounded-lg mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <PenTool size={14} className="text-gray-500" />
                    <span className="text-xs font-medium text-gray-500">Your prompt</span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600">
                    Write a personalized message to Sarah about our marketing software, mentioning her recent article on growth marketing.
                  </p>
                </div>

                <div className="border border-warmchats-primary-light p-4 rounded-lg bg-warmchats-primary-light bg-opacity-10 shadow-inner">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot size={14} className="text-warmchats-primary" />
                    <span className="text-xs font-medium text-warmchats-primary">AI-Generated Response</span>
                    <Sparkles size={14} className="text-warmchats-flame ml-auto" />
                  </div>
                  <p className="text-xs md:text-sm leading-relaxed">
                    Hi Sarah,<br /><br />
                    I just read your insightful article on growth marketing strategies for SaaS startups...
                  </p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <button className="flex items-center gap-1 px-3 py-2 text-xs text-warmchats-primary font-medium hover:bg-warmchats-primary-light hover:bg-opacity-20 rounded-lg transition-all">
                    <Bot size={14} />
                    Regenerate
                  </button>
                  <button className="flex items-center gap-1 px-3 py-2 text-xs text-white font-medium bg-warmchats-primary rounded-lg hover:bg-warmchats-primary-dark transition-all">
                    <ArrowRight size={14} />
                    Copy & Send
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
