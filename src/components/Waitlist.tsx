import React, { useState } from "react";
import { Mail, User, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MainLayout from "./MainLayout";

const Waitlist: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const scriptURL = import.meta.env.VITE_API_SCRIPT_URL;

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Fake submit
  //   setTimeout(() => {
  //     setSubmitted(true);
  //   }, 800);
  // };
  
  
  
    const handleSubmit = async () => {
      if (!email) {
        setMessage({ text: "Please enter your email.", type: "error" });
        return;
      }
  
      try {
        let successMessage = "";
       successMessage = "🎉 You're on the waitlist!";
        setMessage({ text: successMessage, type: "success" });
  
        const data = { email, Lead: "waitlist" };
        await fetch(scriptURL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
  
        setEmail("");
        setSubmitted(true);
      } catch (error) {
        setMessage({ text: "Something went wrong. Try again later.", type: "error" });
      }
    };
  

  return (
    <MainLayout> 
    <div className="min-h-screen flex flex-col bg-gradient-to-b 0">
     

      {/* Header Section */}
      <div className="flex flex-col items-center justify-center text-center mt-16 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          🚀 Join the WarmChats Waitlist
        </h1>
        <p className="text-lg text-gray-600 max-w-xl">
          Be among the first to experience AI-powered outreach that turns cold leads into warm conversations.
        </p>
      </div>

      {/* Waitlist Form Card */}
      <div className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-orange-100">
          {!submitted ? (
            <>
              <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                Join our early access community 💬
              </h2>
              <div  className="space-y-5">
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="e.g. Sarah Khan"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 text-gray-400 w-4 h-4" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@company.com"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none text-sm"
                    />
                  </div>
                </div>

                <button
              
                  className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition"
                    onClick={() => handleSubmit()}
                >
                  Join Waitlist
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-10">
              <CheckCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                You’re on the list! 🎉
              </h3>
              <p className="text-gray-600 mb-6">
                Thanks for joining the WarmChats waitlist.  
                We’ll notify you as soon as early access opens.
              </p>
              <button
                onClick={() => navigate("/")}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium hover:shadow-md transition"
              >
                Back to Home
              </button>
            </div>
          )}
        </div>
      </div>

    
    </div>
    </MainLayout>
  );
};

export default Waitlist;
