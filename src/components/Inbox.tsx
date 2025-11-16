import React, { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout";
import {
  Mail,
  MessageSquare,
  Sparkles,
  Send,
  Loader2,
  RotateCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Inbox() {
  const API_BASE = import.meta.env.VITE_API_BASE;
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  const org_id = localStorage.getItem("org_id");

  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [aiReply, setAiReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  const navigate = useNavigate();

  // ✅ Sync emails (fetch new from IMAP)
  const syncEmailsFromInbox = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/api/inbox/fetch/${userId}/${org_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch emails");

      const data = await res.json();
      const fetched_count = data.fetched_count;
      fetchEmails();

      toast.success(`Emails synced successfully (${fetched_count} new).`);
    } catch (err) {
      console.error("❌ Error fetching inbox:", err);
      toast.error("Failed to fetch inbox emails.");
    }
  };

  // ✅ Sync button handler
  const handleSync = async () => {
    try {
      setIsSyncing(true);
      await syncEmailsFromInbox();
    } catch (error) {
      console.error("Sync failed:", error);
      toast.error("Failed to sync emails.");
    } finally {
      setIsSyncing(false);
    }
  };

  // ✅ Fetch stored emails
  const fetchEmails = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/api/inbox/fetch/already/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
             "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch emails");

      const data = await res.json();
      const formatted = (data.messages || []).map((m) => ({
        id: m.id,
        sender: m.sender || m.from || "Unknown",
        channel: m.channel || "email",
        subject: m.subject || "(No Subject)",
        preview: m.snippet || m.body?.slice(0, 60) || "",
        time: new Date(m.created_at || m.date || Date.now()).toLocaleString(),
        from: m.from,
        thread_id: m.thread_id,
      }));

      setMessages(formatted);
    } catch (err) {
      console.error("❌ Error fetching inbox:", err);
      toast.error("Failed to load stored emails.");
    }
  };

  // ✅ Fetch already stored emails on mount
  useEffect(() => {
    if (userId && token) fetchEmails();
  }, [userId, token, API_BASE]);

  // ✅ Filter by tab
  const filteredMessages =
    activeTab === "All"
      ? messages
      : messages.filter((m) => {
          if (activeTab === "Email") return m.channel?.toLowerCase() === "email";
          if (activeTab === "SMS") return m.channel?.toLowerCase() === "sms";
          return true;
        });

  // ✅ Send reply via API
  const handleSend = async () => {
    if (!reply || !selected) {
      toast.error("Please select a message and enter a reply.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/inbox/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
           "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        body: JSON.stringify({
          user_id: userId,
          to: selected.from,
          subject: `Re: ${selected.subject}`,
          body: reply,
        }),
      });

      if (res.ok) {
        toast.success("✅ Email sent successfully!");
        setReply("");
        setAiReply("");
      } else {
        toast.error("❌ Failed to send email.");
      }
    } catch (err) {
      console.error("❌ Error sending email:", err);
      toast.error("Error while sending email.");
    }
  };

  // ✅ Generate AI Smart Reply
  const handleGenerateAIReply = (msg) => {
    setSelected(msg);
    setLoading(true);
    setTimeout(() => {
      setAiReply(
        `Hey ${msg.sender.split(" ")[0]}, totally understand! 😊 Just curious — would it make sense if I share how similar teams saved 5 hrs/week automating outreach with WarmChats?`
      );
      setLoading(false);
      toast.success("AI smart reply generated!");
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-3">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          📬 Centralized Inbox
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/connect-email")}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:shadow-md transition flex items-center gap-2"
          >
            Connect Account
          </button>

          <button
            onClick={() => navigate("/inbox/new")}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:shadow-md transition flex items-center gap-2"
          >
            <Send size={16} /> New Message
          </button>

          <button
            onClick={handleSync}
            disabled={isSyncing}
            className={`px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:shadow-md transition flex items-center gap-2 ${
              isSyncing ? "opacity-80 cursor-not-allowed" : ""
            }`}
          >
            {isSyncing ? (
              <>
                <RotateCw size={18} className="animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <RotateCw size={18} />
                Sync Email
              </>
            )}
          </button>
        </div>

        <Toaster position="top-right" reverseOrder={false} />
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

      {/* Message List */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {filteredMessages.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No messages yet.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredMessages.map((msg, i) => (
              <div
                key={i}
                onClick={() => {
                  setSelected(msg);
                  navigate(`/inbox/thread/${msg.thread_id}`);
                }}
                className={`p-5 transition cursor-pointer
                  ${
                    msg.channel === "email"
                      ? "hover:bg-pink-100"
                      : "hover:bg-white"
                  } 
                  ${selected?.id === msg.id ? "bg-orange-50" : "bg-white"}
                `}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800">
                        {msg.sender}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          msg.channel === "email"
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
              </div>
            ))}
          </div>
        )}
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
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700"
            rows={4}
            value={reply || aiReply}
            onChange={(e) => setReply(e.target.value)}
          />
          <div className="mt-4 flex gap-3">
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm font-medium flex items-center gap-2"
            >
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
