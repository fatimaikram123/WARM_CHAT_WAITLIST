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

  // ⬇️ Pagination States
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  // ⬇️ Sync incoming inbox
  const syncEmailsFromInbox = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/api/inbox/fetch/${userId}/${org_id}?page=${page}&limit=${limit}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch emails");
      const data = await res.json();
      toast.success(`Emails synced (${data.threads_checked} new).`);
      fetchEmails();
    } catch (err) {
      console.error(err);
      toast.error("Failed to sync inbox.");
    }
  };

  const handleSync = async () => {
    try {
      setIsSyncing(true);
      await syncEmailsFromInbox();
    } finally {
      setIsSyncing(false);
    }
  };

  // ⬇️ Fetch already-stored emails with pagination
  const fetchEmails = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/api/inbox/fetch/already/${userId}?page=${page}&limit=${limit}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch emails");

      const data = await res.json();

      // Set pagination
      setTotalPages(data.pages || 1);

      const formatted = (data.messages || []).map((m) => ({
        id: m.id,
        sender: m.sender || "Unknown",
        channel: m.channel || "email",
        subject: m.subject || "(No Subject)",
        preview: m.body?.slice(0, 60) || "",
        time: new Date(m.created_at || Date.now()).toLocaleString(),
        from: m.sender,
        thread_id: m.thread_id,
      }));

      setMessages(formatted);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load stored emails.");
    }
  };

  // ⬇️ Fetch on load + when page changes
  useEffect(() => {
    if (userId && token) fetchEmails();
  }, [userId, token, page]);
  // useEffect(() => {
  // const fetchInbox = async () => {
  //   if (userId && token) {
  //     await syncEmailsFromInbox();
  //   }
  // };

//   fetchInbox();
// }, [userId, token, page]);


  // ⬇️ Filter tabs
  const filteredMessages =
    activeTab === "All"
      ? messages
      : messages.filter((m) => {
          if (activeTab === "Email")
            return m.channel?.toLowerCase() === "email";
          if (activeTab === "SMS") return m.channel?.toLowerCase() === "sms";
          return true;
        });

  // ⬇️ Send reply
  const handleSend = async () => {
    if (!reply || !selected) return toast.error("Select a message first!");

    try {
      const res = await fetch(`${API_BASE}/api/inbox/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        body: JSON.stringify({
          user_id: userId,
          to: selected.from,
          subject: `Re: ${selected.subject}`,
          body: reply,
        }),
      });

      if (res.ok) {
        toast.success("Email sent!");
        setReply("");
        setAiReply("");
      } else toast.error("Failed to send.");
    } catch (err) {
      toast.error("Error while sending email.");
      console.error(err);
    }
  };

  // ⬇️ AI reply (fake)
  const handleGenerateAIReply = (msg) => {
    setSelected(msg);
    setLoading(true);
    setTimeout(() => {
      setAiReply(
        `Hey ${msg.sender}, I understand! Would you like help automating your outreach?`
      );
      setLoading(false);
    }, 1200);
  };

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-3">
        <h1 className="text-2xl font-bold text-gray-800">📬 Centralized Inbox</h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/connect-email")}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg"
          >
            Connect Account
          </button>

          <button
            onClick={() => navigate("/inbox/new")}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg"
          >
            <Send size={16} /> New Message
          </button>

          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg flex items-center gap-2"
          >
            {isSyncing ? (
              <>
                <RotateCw className="animate-spin" /> Syncing…
              </>
            ) : (
              <>
                <RotateCw /> Sync Email
              </>
            )}
          </button>
        </div>

        <Toaster position="top-right" />
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-4 border-b border-gray-200">
        {["All", "Email", "SMS"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium border-b-2 ${
              activeTab === tab
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-gray-600"
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
                className={`p-5 cursor-pointer hover:bg-orange-50`}
              >
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold">{msg.sender}</div>
                    <div className="text-sm text-gray-700">{msg.subject}</div>
                    <div className="text-xs text-gray-500">{msg.preview}</div>
                  </div>
                  <div className="text-xs text-gray-500">{msg.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-4 gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-gray-600">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* AI reply box */}
      {loading && (
        <div className="mt-6 bg-white p-4 rounded-xl border text-center text-gray-600">
          <Loader2 className="animate-spin w-5 h-5 inline-block mr-2" />
          Generating AI reply…
        </div>
      )}

      {aiReply && !loading && (
        <div className="mt-6 bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-semibold mb-2">
            <Sparkles className="inline w-5 h-5 text-orange-500 mr-1" />
            AI Reply
          </h3>

          <textarea
            className="w-full border rounded-lg p-3"
            rows={4}
            value={reply || aiReply}
            onChange={(e) => setReply(e.target.value)}
          />

          <div className="mt-4 flex gap-3">
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg"
            >
              <Send size={14} /> Send
            </button>
            <button
              onClick={() => setAiReply("")}
              className="px-4 py-2 border text-gray-700 rounded-lg"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
