import React, { useState } from "react";
import {
  Flame,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const navigate = useNavigate();
  const scriptURL = import.meta.env.VITE_API_SCRIPT_URL;
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | "";
  }>({
    text: "",
    type: "",
  });

  const handleSubmit = async (leadType: "waitlist" | "free-trial") => {
    if (!email && leadType === "waitlist") {
      setMessage({ text: "Please enter your email.", type: "error" });
      return;
    }

    try {
      let successMessage = "";
      if (leadType === "waitlist")
        successMessage = "🎉 You're on the waitlist!";
      // if (leadType === "free-trial")
      //   successMessage = "🚀 Redirecting to signup page...";

      setMessage({ text: successMessage, type: "success" });

      const data = { email, Lead: leadType };

      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      setEmail("");
      if (leadType === "waitlist") navigate("/signup");
    } catch (error) {
      setMessage({ text: "Something went wrong. Try again later.", type: "error" });
    }
  };

  return (
    <section
      id="hero"
      className="relative pt-24 pb-16 md:pt-40 md:pb-28 overflow-hidden gradient-bg"
    >
      {/* Background Effects */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-warmchats-flame-light rounded-full blur-3xl opacity-30 -z-10 animate-pulse-gentle"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-warmchats-primary-light rounded-full blur-3xl opacity-30 -z-10"></div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center px-3 py-1 mb-4 bg-white/30 backdrop-blur-sm rounded-full border border-white/20 shadow-sm">
              <Flame size={16} className="text-warmchats-flame mr-2" />
              <span className="text-xs md:text-sm font-semibold">
                AI-Powered Outreach Platform
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent leading-tight">
              Turn Cold Outreach into Warm Conversations.
            </h1>

            <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              AI-personalized messages that help teams get up to 3× more replies across email, SMS, and socials.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full sm:w-80 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-warmchats-primary text-gray-700"
              />
              <a
                onClick={() => handleSubmit("waitlist")}
                className="w-full sm:w-auto bg-warmchats-primary text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-warmchats-primary-dark transition-all cursor-pointer"
              >
                Join Waitlist
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-4 px-2">
              <button
                onClick={() => handleSubmit("free-trial")}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-orange-500 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:opacity-90 transition-all"
              >
                Start 7-day free trial
              </button>
            </div>

            {message.text && (
              <div
                className={`text-sm font-medium mb-4 transition-all ${
                  message.type === "success"
                    ? "text-green-600"
                    : "text-orange-600"
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="flex justify-center lg:justify-start items-center text-sm text-gray-600 gap-2 mb-6">
              <CheckCircle size={16} className="text-green-500" />
              <span>No credit card required</span>
            </div>
          </div>
        </div>
      </div>
{/* 
      {/* 🔥 Floating Fire Chat Button */}
      {/* <div className="fixed bottom-6 right-6 flex flex-col items-center space-y-1 z-50">
        {!assistantOpen ? (
          <>
            <span className="text-xs text-gray-500 mb-1 animate-pulse">
              click to chat
            </span>
            <button
              onClick={() => setAssistantOpen(true)}
              className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-xl hover:scale-110 hover:rotate-3 transition-transform relative"
            >
              <Flame className="text-white w-7 h-7 animate-pulse" />
            </button>
            <div className="text-center mt-1">
              <div className="text-sm font-semibold text-gray-800">
                WarmChats Assistant
              </div>
              <div className="text-xs text-gray-500">Powered by AI</div>
            </div>
          </>
        ) : (
          <div className="w-80 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden relative animate-fadeIn">
            {/* Header */}
            {/* <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-2xl">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5" />
                <h3 className="font-semibold">WarmChats Assistant</h3>
              </div>
              <button
                onClick={() => setAssistantOpen(false)}
                className="text-white hover:opacity-80 transition"
              >
                ✕
              </button>
            </div>

            {/* Chat area */}
            {/* <div className="flex-1 overflow-y-auto px-4 py-3 bg-gray-50">
              <div className="flex items-start gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white text-sm font-bold">
                  A
                </div>
                <div className="bg-white border border-gray-200 p-3 rounded-xl shadow-sm text-gray-700 text-sm max-w-[80%]">
                  👋 Hi there! I’m your <b>WarmChats AI Assistant</b>.<br />
                  How can I help you today?
                </div>
              </div>

              <div className="flex items-start gap-2 justify-end mb-3">
                <div className="bg-orange-100 text-gray-800 p-3 rounded-xl text-sm shadow-sm max-w-[80%]">
                  Tell me more about WarmChats!
                </div>
              </div>
            </div>

            {/* Input */}
            {/* <div className="border-t bg-white p-3 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 text-sm border border-gray-300 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white hover:scale-105 transition">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>   */}
    </section>
  );
};

export default Hero;
