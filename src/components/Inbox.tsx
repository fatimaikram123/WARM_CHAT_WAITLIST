import React, { useState } from "react";
import MainLayout from "../components/MainLayout";
import { Mail, MessageSquare, Sparkles, Send, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom"; // add this import

export default function Inbox() {
  const [activeTab, setActiveTab] = useState("All");
  const [aiReply, setAiReply] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const messages = [
    {
      sender: "Ali Raza",
      channel: "Email",
      subject: "Follow-up on meeting",
      preview: "Sure, let’s catch up tomorrow morning!",
      time: "10:32 AM",
    },
    {
      sender: "Sarah Lee",
      channel: "SMS",
      subject: "WarmChats Demo Request",
      preview: "Can you share the pricing plan?",
      time: "Yesterday",
    },
    {
      sender: "David Smith",
      channel: "Email",
      subject: "Not interested right now",
      preview: "We’re pausing new tools this quarter.",
      time: "2 days ago",
    },
  ];

  const filteredMessages =
    activeTab === "All"
      ? messages
      : messages.filter((m) => m.channel === activeTab);

  const handleGenerateAIReply = (msg) => {
    setLoading(true);
    setTimeout(() => {
      setAiReply(
        `Hey ${msg.sender.split(" ")[0]}, totally understand! 😊 Just curious — would it make sense if I share how similar teams saved 5 hrs/week automating outreach with WarmChats?`
      );
      setLoading(false);
    }, 1800);
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-3">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          📬 Centralized Inbox
        </h1>
        {/* <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:shadow-md transition flex items-center gap-2">
          <Send size={16} /> New Message
        </button> */}
        <button
  onClick={() => navigate("/inbox/new")}
  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:shadow-md transition flex items-center gap-2"
>
  <Send size={16} /> New Message
</button>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-4 border-b border-gray-200">
        {["All", "Email", "SMS"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium border-b-2 transition ${
              activeTab === tab
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-gray-600 hover:text-orange-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search conversations..."
          className="w-full md:w-1/2 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Message List */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          {filteredMessages.map((msg, i) => (
            <div
              key={i}
              className="p-5 hover:bg-orange-50 transition cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800">
                      {msg.sender}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        msg.channel === "Email"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-green-50 text-green-600"
                      }`}
                    >
                      {msg.channel}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700">{msg.subject}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {msg.preview}
                  </div>
                </div>
                <div className="text-xs text-gray-500">{msg.time}</div>
              </div>

              {/* AI Smart Reply Button */}
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => handleGenerateAIReply(msg)}
                  className="text-sm text-orange-600 flex items-center gap-1 hover:underline"
                >
                  <Sparkles size={14} /> Generate Smart Reply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Reply Section */}
      {loading && (
        <div className="mt-6 bg-white p-4 rounded-xl border border-orange-100 text-center text-gray-600">
          <Loader2 className="animate-spin w-5 h-5 inline-block mr-2" />
          Generating AI reply suggestion...
        </div>
      )}

      {aiReply && !loading && (
        <div className="mt-6 bg-white p-6 rounded-2xl border border-orange-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Sparkles className="text-orange-500 w-5 h-5" /> AI Smart Reply
          </h3>
          <p className="text-gray-700 leading-relaxed">{aiReply}</p>

          <div className="mt-4 flex gap-3">
            <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm font-medium flex items-center gap-2">
              <Send size={14} /> Send
            </button>
            <button
              onClick={() => setAiReply("")}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
