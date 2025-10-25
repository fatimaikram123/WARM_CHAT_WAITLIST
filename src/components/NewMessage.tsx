import React, { useState } from "react";
import MainLayout from "../components/MainLayout";
import { Send, Users, Mail, MessageSquare } from "lucide-react";

const NewMessage: React.FC = () => {
  const [channel, setChannel] = useState<"Email" | "SMS" | "">("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    alert(`✅ Message sent via ${channel}!`);
    setChannel("");
    setSubject("");
    setMessage("");
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
          <Send className="text-orange-500" /> New Message
        </h1>

        {/* Channel Selection */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Select Channel
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => setChannel("Email")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                channel === "Email"
                  ? "border-orange-500 bg-orange-50 text-orange-600"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Mail size={16} /> Email
            </button>
            <button
              onClick={() => setChannel("SMS")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                channel === "SMS"
                  ? "border-orange-500 bg-orange-50 text-orange-600"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <MessageSquare size={16} /> SMS
            </button>
          </div>
        </div>

        {/* Subject (for Email only) */}
        {channel === "Email" && (
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Subject
            </label>
            <input
              type="text"
              placeholder="e.g. Quick follow-up on our chat"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
        )}

        {/* Message Body */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Message
          </label>
          <textarea
            rows={6}
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>

        {/* Send Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSend}
            disabled={!channel || !message}
            className={`px-6 py-2 rounded-lg font-medium text-white transition ${
              !channel || !message
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-md"
            }`}
          >
            <Send size={16} className="inline mr-1" /> Send Message
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default NewMessage;
