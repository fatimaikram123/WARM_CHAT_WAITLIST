import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Send } from "lucide-react";

interface Message {
  id: number;
  sender_id: number | null;
  body: string;
  direction: string;
  created_at: string;
  subject: string;
}

const ThreadPage: React.FC = () => {
  const { thread_id } = useParams<{ thread_id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [subject, setSubject] = useState("");
  const API_BASE = import.meta.env.VITE_API_BASE;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(`${API_BASE}/api/inbox/thread/${thread_id}`, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMessages(data.messages || []);
      if (data.messages?.length > 0) setSubject(data.messages[0].subject);
    };
    fetchMessages();
  }, [thread_id]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    await fetch(`${API_BASE}/api/inbox/thread/send/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        thread_id,
        sender_id: 1,
        body: newMessage,
        subject: subject || "No Subject",
      }),
    });
    setNewMessage("");
    const reload = await fetch(`${API_BASE}/api/inbox/thread/${thread_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const updated = await reload.json();
    setMessages(updated.messages || []);
  };

  return (
    <div className="flex flex-col h-screen bg-[#f9fafb]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white shadow-sm border-b">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{subject || "No Subject"}</h2>
          <p className="text-xs text-gray-500">Thread #{thread_id}</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.direction === "outbound" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-lg p-3 rounded-2xl shadow-sm ${
                msg.direction === "outbound"
                  ? "bg-orange-100 text-right rounded-br-none"
                  : "bg-white border rounded-bl-none"
              }`}
            >
              <p className="text-gray-800">{msg.body}</p>
              <span className="text-xs text-gray-400 block mt-1">
                {new Date(msg.created_at).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-white flex items-center space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Message..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          onClick={handleSend}
          className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 flex items-center gap-1"
        >
          <Send size={16} /> Send
        </button>
      </div>
    </div>
  );
};

export default ThreadPage;
