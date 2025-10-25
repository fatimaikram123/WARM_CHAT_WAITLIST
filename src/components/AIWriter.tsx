import React, { useState } from "react";
import MainLayout from "../components/MainLayout";
import {
  Brain,
  Sparkles,
  MessageSquareText,
  CheckCircle2,
  Loader2,
  Wand2,
  Bot,
  SendHorizonal,
  TrendingUp,
  BarChart3,
  Star,
  MailCheck,
  ThumbsUp,
  ThumbsDown,
  Activity,
  RefreshCw,
} from "lucide-react";

export default function AIWriter() {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("Friendly");
  const [persona, setPersona] = useState("Sales Representative");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setLoading(true);

    setTimeout(() => {
      setResponse(
        `💬 **Persona:** ${persona}\n🎯 **Tone:** ${tone}\n\n✨ *AI-Generated Outreach Copy:*\n\n"Hey there 👋, I noticed you’re exploring ways to improve your outreach. We’ve helped dozens of ${persona.toLowerCase()}s boost reply rates by 35%. Would you be open to a quick chat this week?"\n\n🤖 *AI Follow-up Draft (Understands Tone + Intent)*\n**Customer:** “Not interested.”\n**AI Suggests:** “Totally fine — quick question though: would it make sense if I share how others saved 5hrs/week automating replies?”\n\n🧠 *Brand Tone Match:* 93% (auto-learned from sent emails)\n📈 *Engagement Prediction:* +22% higher replies\n🔥 *WarmScore™:* 86/100`
      );
      setLoading(false);
    }, 1800);
  };

  return (
    <MainLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <Brain className="w-7 h-7 text-orange-500" /> AI Outreach Intelligence
            </h1>
            <p className="text-gray-600 mt-1">
              Understand tone, generate 2-way replies, score leads, sync with CRMs, and analyze engagement — all in one place.
            </p>
          </div>
          <button
            onClick={handleGenerate}
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow hover:shadow-md font-semibold transition"
          >
            <Sparkles size={18} /> Generate Smart Copy
          </button>
        </div>

        {/* Persona & Tone Selectors */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                👤 Choose Persona
              </label>
              <select
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              >
                <option>Sales Representative</option>
                <option>Marketing Specialist</option>
                <option>Recruiter</option>
                <option>Founder / CEO</option>
                <option>Customer Success Manager</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                🎙️ Select Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              >
                <option>Friendly</option>
                <option>Professional</option>
                <option>Confident</option>
                <option>Empathetic</option>
                <option>Playful</option>
              </select>
            </div>
          </div>

          {/* Prompt Input */}
          <div className="mt-6">
            <label className="block text-gray-700 font-medium mb-2">
              ✍️ Message Idea or Context
            </label>
            <textarea
              rows={4}
              placeholder="e.g. Follow up after demo, handle objection, or re-engage old lead..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 outline-none resize-none text-gray-800"
            ></textarea>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" /> Thinking...
                </>
              ) : (
                <>
                  <Wand2 size={18} /> Generate Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* AI Response + Insights */}
        {response && (
          <>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              {/* Main AI Response */}
              <div className="md:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-orange-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Bot className="text-orange-500 w-5 h-5" /> AI Draft
                </h2>
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {response}
                </div>
              </div>

              {/* Insights */}
              <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="text-orange-500 w-5 h-5" /> Smart Insights
                </h3>
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li>🤖 Understands tone & drafts natural responses.</li>
                  <li>🗣️ Turns “Not interested” into engagement opportunities.</li>
                  <li>📊 Tracks tone-based reply outcomes.</li>
                  <li>🔥 WarmScore™: AI ranks every lead 0–100.</li>
                  <li>🔄 CRM Sync: Salesforce, HubSpot, Pipedrive, Dynamics, Close, Zoho.</li>
                </ul>
              </div>
            </div>

            {/* WarmAnalytics Dashboard */}
            <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <BarChart3 className="text-orange-500 w-5 h-5" /> WarmAnalytics™ Dashboard
              </h3>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-100 flex flex-col items-center">
                  <ThumbsUp className="text-green-500 w-6 h-6 mb-1" />
                  <span className="font-bold text-lg text-gray-800">64%</span>
                  <p className="text-sm text-gray-600">Positive Replies</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100 flex flex-col items-center">
                  <Activity className="text-yellow-500 w-6 h-6 mb-1" />
                  <span className="font-bold text-lg text-gray-800">23%</span>
                  <p className="text-sm text-gray-600">Neutral Replies</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-100 flex flex-col items-center">
                  <ThumbsDown className="text-red-500 w-6 h-6 mb-1" />
                  <span className="font-bold text-lg text-gray-800">13%</span>
                  <p className="text-sm text-gray-600">Negative Replies</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 flex flex-col items-center">
                  <Star className="text-blue-500 w-6 h-6 mb-1" />
                  <span className="font-bold text-lg text-gray-800">WarmScore™ 86</span>
                  <p className="text-sm text-gray-600">Lead Engagement Index</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 text-sm text-gray-600">
                <span className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-full">
                  <RefreshCw className="w-4 h-4 text-orange-500" /> CRM Sync: Active
                </span>
                <span className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-full">
                  <MailCheck className="w-4 h-4 text-green-500" /> Brand Tone: Learned
                </span>
                <span className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-full">
                  <TrendingUp className="w-4 h-4 text-blue-500" /> Engagement Rising
                </span>
              </div>
            </div>
          </>
        )}

        {!response && !loading && (
          <div className="flex flex-col items-center justify-center mt-16 text-center text-gray-500">
            <Brain className="w-12 h-12 text-orange-400 mb-3" />
            <p className="text-lg font-medium">
              Start by entering a message idea — your AI assistant will write,
              analyze, and score your outreach.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
