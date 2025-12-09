import React, { useState } from "react";
import { Flame, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | "";
  }>({
    text: "",
    type: "",
  });

  const navigate = useNavigate();
  const scriptURL = import.meta.env.VITE_API_SCRIPT_URL;

  const handleSubmit = async (leadType: "waitlist" | "free-trial") => {
    if (!email && leadType === "waitlist") {
      setMessage({ text: "Please enter your email.", type: "error" });
      return;
    }

    try {
      let successMessage = "";
      if (leadType === "waitlist")
        successMessage = "🎉 You're on the waitlist!";

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
      className="relative pt-24 pb-16 md:pt-40 md:pb-28 overflow-hidden"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
      >
        <source src="/animated-bg.mp4" type="video/mp4" />
      </video>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
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

            <p className="text-lg md:text-xl text-gray-100 mb-6 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              AI-personalized messages that help teams get up to 3× more replies across email, SMS, and socials.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
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

            <div className="flex justify-center lg:justify-start items-center text-sm text-gray-100 gap-2 mb-6">
              <CheckCircle size={16} className="text-green-500" />
              <span>No credit card required</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
