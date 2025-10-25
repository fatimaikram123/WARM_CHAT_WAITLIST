import React, { useState } from "react";
import MainLayout from "../components/MainLayout";
import { Clock, Zap, MessageSquare, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";


const FollowUps: React.FC = () => {
  const [aiLite, setAiLite] = useState(true);
  const navigate = useNavigate();

  const automations = [
    {
      id: 1,
      title: "Send after 2 days",
      description: "Automatically send a follow-up 2 days after no response.",
      icon: <Clock className="w-5 h-5 text-orange-500" />,
    },
    {
      id: 2,
      title: "If not opened",
      description: "Trigger a polite reminder if the email wasn’t opened.",
      icon: <Mail className="w-5 h-5 text-orange-500" />,
    },
    {
      id: 3,
      title: "If replied",
      description: "Stop all follow-ups and mark contact as ‘Engaged’.",
      icon: <MessageSquare className="w-5 h-5 text-orange-500" />,
    },
    {
      id: 4,
      title: "AI Smart Reply Assist",
      description:
        "AI drafts the next follow-up using context, tone, and reply history.",
      icon: <Zap className="w-5 h-5 text-orange-500" />,
    },
  ];

  return (
    <MainLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            🤖 Smart Follow-Ups
          </h1>
          {/* <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium shadow hover:shadow-md transition">
            + Create Follow-Up Sequence
          </button> */}
                <button
            onClick={() => navigate("/create-followup")}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium shadow hover:shadow-md transition"
          >
            + Create Follow-Up Sequence
          </button>
        </div>

        {/* AI Mode Toggle */}
        <div className="flex items-center justify-between bg-white rounded-xl shadow-sm p-5 mb-6 border border-gray-100">
          <div>
            <h2 className="font-semibold text-gray-800">AI Lite Mode</h2>
            <p className="text-sm text-gray-500">
              When enabled, AI suggests simplified follow-up messages based on
              engagement level.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={aiLite}
              onChange={() => setAiLite(!aiLite)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-orange-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>

        {/* Automation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {automations.map((auto) => (
            <div
              key={auto.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-2">
                {auto.icon}
                <h3 className="font-semibold text-gray-800">{auto.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{auto.description}</p>
            </div>
          ))}
        </div>

        {/* Explanation Section */}
        <div className="mt-8 bg-orange-50 border border-orange-100 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            How Smart Follow-Ups Work 🚀
          </h2>
          <p className="text-gray-700 leading-relaxed">
            WarmChats’ Smart Follow-Up AI helps you re-engage prospects
            automatically. Based on recipient behavior — opens, clicks, or lack
            of response — it sends relevant follow-ups that sound natural, not
            robotic.
          </p>
          <ul className="mt-3 text-gray-700 list-disc list-inside space-y-1">
            <li>Detects if emails are opened or ignored.</li>
            <li>Pauses follow-ups when a reply is received.</li>
            <li>
              AI Lite mode drafts friendly, context-aware reminders without
              sounding pushy.
            </li>
            <li>
              For advanced users, Smart Follow-Up AI can fully automate tone and
              timing to maximize engagement.
            </li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
};

export default FollowUps;
