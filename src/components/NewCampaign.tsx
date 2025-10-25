import React, { useState } from "react";
import MainLayout from "./MainLayout";
import { Sparkles, Send, Users, ChevronDown } from "lucide-react";

const NewCampaign: React.FC = () => {
  const [step, setStep] = useState(1);
  const [campaignName, setCampaignName] = useState("");
  const [channel, setChannel] = useState<"Email" | "SMS" | "">("");
  const [aiMessage, setAiMessage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleGenerateAI = () => {
    setAiMessage(
      `Hi {{name}}, 👋  
We noticed your company {{company}} might benefit from our product.  
Would you like to schedule a quick chat this week?  
Best,  
WarmChats Team`
    );
  };

  return (
    <MainLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
          <Send className="text-orange-500" /> Create New Campaign
        </h1>

        <div className="bg-white rounded-2xl shadow-sm p-6 max-w-3xl mx-auto">
          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`flex-1 h-1 mx-1 rounded-full ${
                  step >= n ? "bg-orange-500" : "bg-gray-200"
                }`}
              ></div>
            ))}
          </div>

          {/* Step 1 — Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Campaign Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Product Launch Outreach"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Channel Type
                </label>
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="flex items-center justify-between w-full border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50"
                >
                  {channel || "Select Channel"}
                  <ChevronDown size={16} className="text-gray-500" />
                </button>

                {showDropdown && (
                  <div className="mt-2 border border-gray-200 rounded-lg shadow bg-white">
                    <button
                      onClick={() => {
                        setChannel("Email");
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-orange-50"
                    >
                      Email
                    </button>
                    <button
                      onClick={() => {
                        setChannel("SMS");
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-orange-50"
                    >
                      SMS
                    </button>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  disabled={!campaignName || !channel}
                  onClick={() => setStep(2)}
                  className={`px-6 py-2 rounded-lg text-white font-medium transition ${
                    !campaignName || !channel
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-md"
                  }`}
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Step 2 — Audience Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-3">
                <Users className="text-orange-500" />
                <h2 className="text-lg font-semibold text-gray-800">
                  Select Audience
                </h2>
              </div>
              <p className="text-sm text-gray-600">
                Choose which imported contacts or CRM leads to include in this
                campaign.
              </p>

              <ul className="border rounded-lg divide-y">
                <li className="px-4 py-2 flex justify-between">
                  <span>Imported Leads (HubSpot)</span>
                  <span className="text-gray-500 text-sm">1,200 Contacts</span>
                </li>
                <li className="px-4 py-2 flex justify-between">
                  <span>Salesforce Contacts</span>
                  <span className="text-gray-500 text-sm">950 Contacts</span>
                </li>
                <li className="px-4 py-2 flex justify-between">
                  <span>Pipedrive Leads</span>
                  <span className="text-gray-500 text-sm">730 Contacts</span>
                </li>
              </ul>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:shadow-md"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Step 3 — AI Message Creation */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="text-orange-500" />
                <h2 className="text-lg font-semibold text-gray-800">
                  AI Message Builder
                </h2>
              </div>
              <p className="text-sm text-gray-600">
                Let AI draft your first message using your brand tone and lead
                context.
              </p>

              <textarea
                rows={6}
                placeholder="Click 'Generate with AI' to start..."
                value={aiMessage}
                onChange={(e) => setAiMessage(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />

              <button
                onClick={handleGenerateAI}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-orange-500 text-orange-600 font-medium hover:bg-orange-50 transition"
              >
                <Sparkles size={18} /> Generate with AI
              </button>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  ← Back
                </button>
                <button
                  onClick={() => alert("Campaign Created!")}
                  className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:shadow-md"
                >
                  ✅ Save Campaign
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default NewCampaign;
