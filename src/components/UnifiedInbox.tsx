import React, { useState, useEffect } from "react";
import { Send } from "lucide-react";
import InboxThread from "./InboxThread";
import MainLayout from "./MainLayout";
import { useNavigate } from "react-router-dom";

export default function UnifiedInbox() {
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("token"); // ✅ Get token from localStorage
  const API_BASE = import.meta.env.VITE_API_BASE;

  const [messages, setMessages] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [reply, setReply] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch emails with Authorization header
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/inbox/fetch/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ Token added
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch emails");
        }

        const data = await res.json();
        setMessages(data || []);
      } catch (err) {
        console.error("Error fetching inbox:", err);
      }
    };

    if (userId && token) fetchEmails();
  }, [userId, token, API_BASE]);

  // ✅ Send email with Authorization header
  const handleSend = async () => {
    if (!reply || !selected) return;

    try {
      const res = await fetch(`${API_BASE}/api/inbox/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Token added
        },
        body: JSON.stringify({
          user_id: userId,
          to: selected.from,
          subject: `Re: ${selected.subject}`,
          body: reply,
        }),
      });

      if (res.ok) {
        alert("Email sent successfully!");
        setReply("");
      } else {
        alert("Failed to send email");
      }
    } catch (err) {
      console.error("Error sending email:", err);
    }
  };

  return (
    <MainLayout>
      {/* Connect Account Button */}
      <button
        onClick={() => navigate("/connect-email")}
        className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 mb-3 ml-3"
      >
        Connect Account
      </button>

      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-80 border-r bg-white overflow-y-auto">
          <div className="p-4 font-semibold border-b">Unified Inbox</div>
          {messages.map((m, i) => (
            <div
              key={i}
              onClick={() => setSelected(m)}
              className={`p-3 border-b cursor-pointer ${
                selected?.subject === m.subject ? "bg-orange-100" : ""
              }`}
            >
              <p className="font-medium text-gray-800 truncate">
                {m.subject || "(No Subject)"}
              </p>
              <p className="text-sm text-gray-500 truncate">{m.body}</p>
              <span className="text-xs text-gray-400">{m.from}</span>
            </div>
          ))}
        </div>

        {/* Main Thread */}
        <div className="flex-1 flex flex-col">
          {selected ? (
            <>
              <InboxThread selected={selected} />
              <div className="p-3 border-t flex items-center bg-white gap-2">
                <input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Write a reply..."
                  className="flex-1 border rounded-full px-4 py-2 focus:ring-2 focus:ring-orange-400"
                />
                <button
                  onClick={handleSend}
                  className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600"
                >
                  <Send size={16} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              Select a message
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
