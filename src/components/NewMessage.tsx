import React, { useState } from "react";
import { Send, Mail, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MainLayout from "./MainLayout";

const NewMessage = () => {
  const [channel, setChannel] = useState<"Email" | "SMS" | "">("");
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [senderName, setSenderName] = useState(localStorage.getItem("gmail_user_name") || "");

  const BASE_API = import.meta.env.VITE_API_BASE;
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");
  const org_id = localStorage.getItem("org_id");

  const navigate = useNavigate();

  const handleSend = async () => {
    if (!channel) return alert("Select a channel first.");
    if (!message.trim()) return alert("Message cannot be empty.");

    // Email specific validation
    if (channel === "Email") {
      if (!to.trim()) return alert("Recipient email is required.");
      if (!subject.trim()) return alert("Subject is required.");
    }

    const payload = {
      user_id: userId,
      to,
      subject,
      body: message,
      sender_name: senderName,
      org_id,
    };

    const res = await fetch(`${BASE_API}/api/inbox/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
         "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("✅ Email sent successfully!");
      navigate("/inbox");
    } else {
      alert("❌ Failed to send email.");
    }
  };

  return (
    <MainLayout> 
    <div className="flex justify-center items-start min-h-screen bg-[#f8f9fb] pt-10">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-md">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Send className="text-orange-500" /> Create New Message
        </h1>

        {/* Channel Selector */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setChannel("Email")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
              channel === "Email"
                ? "border-orange-500 bg-orange-50 text-orange-600"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Mail size={16} /> Email
          </button>

          <button
            onClick={() => setChannel("SMS")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
              channel === "SMS"
                ? "border-orange-500 bg-orange-50 text-orange-600"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <MessageSquare size={16} /> SMS
          </button>
        </div>

        {/* Email fields */}
        {channel === "Email" && (
          <>
            {/* To */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">To</label>
              <input
                type="email"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="recipient@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            {/* Subject */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Follow-up on lead"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            {/* Sender Name */}
            {/* <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Sender Name</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div> */}
          </>
        )}

        {/* Message */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Message</label>
          <textarea
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        {/* Send Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSend}
            disabled={!message}
            className={`px-6 py-2 rounded-lg font-medium text-white transition ${
              !message
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            <Send size={16} className="inline mr-1" /> Send
          </button>
        </div>
      </div>
    </div>
    </MainLayout>
  );
};

export default NewMessage;
