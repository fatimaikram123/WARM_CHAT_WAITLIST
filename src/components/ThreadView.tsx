import React, { useEffect, useState } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { ArrowLeft, Send } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function ThreadView() {
  const { thread_id } = useParams();
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE;
  const token = localStorage.getItem("token");
  const user_email = localStorage.getItem("user_email"); 

  const [thread, setThread] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [reply, setReply] = useState("");
  const [toEmails, setToEmails] = useState(""); 
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 20;

  const user_id = localStorage.getItem("user_id");
  const org_id = localStorage.getItem("org_id");

  // Fetch thread messages with pagination
  const fetchThread = async (reset = false) => {
    try {
      const res = await fetch(`${API_BASE}/api/inbox/thread/${thread_id}/${user_id}?limit=${limit}&offset=${reset ? 0 : offset}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone
        },
      });
      const data = await res.json();
      if (data.success) {
        if (reset) {
          setConversation(data.conversation || []);
          setThread(data.thread);
          setOffset(data.conversation.length);
        } else {
          setConversation(prev => [...data.conversation, ...prev]);
          setOffset(prev => prev + data.conversation.length);
        }
        setHasMore(data.has_more);

        // Prepopulate 'To' field with unique emails
        const uniqueEmails = Array.from(
          new Set([
            ...(data.conversation || [])
              .filter(msg => msg.direction === "inbound")
              .map(msg => msg.sender_email?.trim())
              .filter(email => email && email !== user_email),
            ...(data.thread.reply_email || []).map(email => email?.trim())
          ])
        );
        setToEmails(uniqueEmails.join(", "));
      }
    } catch (error) {
      console.error("❌ Failed to load thread:", error);
      toast.error("Failed to load thread!");
    }
  };

  useEffect(() => {
    fetchThread(true); // Fetch latest 20 on mount
  }, [thread_id]);

  const handleReply = async () => {
    if (!reply.trim() || !toEmails.trim()) {
      toast.error("Please enter a message and recipient email(s)!");
      return;
    }

    const replyEmails = toEmails.split(",").map(e => e.trim()).filter(e => e);

    try {
      const res = await fetch(`${API_BASE}/api/inbox/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        body: JSON.stringify({
          thread_id,
          body: reply,
          to: replyEmails,
          user_id,
          subject: thread.subject,
          sender_name: thread.user_name,
          org_id
        }),
      });

      if (res.ok) {
        toast.success("Reply sent successfully!");
        setReply("");

        // Optimistically update conversation UI
        setConversation(prev => [
          ...prev,
          {
            direction: "outbound",
            message: reply,
            sender: "You",
            sender_email: user_email,
            sent_time: new Date().toISOString(),
          },
        ]);
      } else {
        toast.error("Failed to send reply!");
      }
    } catch (err) {
      console.error("❌ Reply failed:", err);
      toast.error("Failed to send reply!");
    }
  };

  return (
    <MainLayout>
      <Toaster position="top-right" reverseOrder={false} />

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-4"
      >
        <ArrowLeft size={18} /> Back
      </button>

      {thread ? (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {thread.subject}
          </h2>

          {/* Load previous button */}
          {hasMore && (
            <div className="text-center mb-2">
              <button
                onClick={() => fetchThread(false)}
                className="px-3 py-1 text-sm text-blue-600 hover:underline"
              >
                Load previous messages
              </button>
            </div>
          )}

          {/* Chat layout */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {conversation.length === 0 ? (
              <div className="text-center text-gray-400">No messages yet</div>
            ) : (
              conversation.map((msg, i) => (
                <div key={i} data-lov-id={msg.id}>
                  <div className={`flex ${msg.direction === "outbound" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[75%] rounded-2xl p-3 shadow-sm ${
                      msg.direction === "outbound"
                        ? "bg-orange-500 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}>
                      <div className="text-xs font-semibold mb-1 opacity-80">
                        {msg.sender || (msg.direction === "outbound" ? "You" : msg.sender)}
                      </div>

                      <div className="text-sm whitespace-pre-line break-words">{msg.message}</div>

                      <div className="text-[11px] text-gray-500 mt-1 text-right">
                        {new Date(msg.sent_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Reply Box */}
          <div className="mt-6 border-t border-gray-200 pt-4 space-y-2">
            <input
              type="text"
              value={toEmails}
              onChange={(e) => setToEmails(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="To: comma separated emails"
            />
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              rows={3}
              placeholder="Type your reply..."
            ></textarea>
            <button
              onClick={handleReply}
              className="mt-3 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:shadow-md transition-all"
            >
              <Send size={14} /> Send Reply
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">Loading conversation...</div>
      )}
    </MainLayout>
  );
}
