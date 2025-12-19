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
  const [selectedLeadEmails, setSelectedLeadEmails] = useState<string[]>([]);
  const [selectedLeadIds, setSelectedLeadIds] = useState<number[]>([]);
  

  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [aiReply, setAiReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
    const [tones, setTones] = useState([]);
    const [personas, setPersonas] = useState([]);
  

  // ⬇️ Pagination States
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };


  // -------------------------------
  // Fire-and-forget /fetch API background
  // -------------------------------
  const backgroundFetchAllPages = () => {
    let currentPage = 1;

    const fetchPage = () => {
      fetch(
        `${API_BASE}/inbox/fetch/${userId}/${org_id}?page=${currentPage}&limit=${limit}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        

          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Background fetch page", currentPage, data);

          if (currentPage < data.totalPages) {
            currentPage++;
            fetchPage();
          }
        })
        .catch((err) => {
          console.error("Background fetch error:", err);
        });
    };

    fetchPage(); // Start fetching all pages
  };

  // ⬇️ Fetch already-stored emails with pagination
  const fetchEmails = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/inbox/fetch/already/${userId}?page=${page}&limit=${limit}`,
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
        is_unread: m.is_unread || false,
      }));

      setMessages(formatted);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load stored emails.");
    }
  };

  // ⬇️ Run the background fetch once on first load
  // useEffect(() => {
  //   if (userId && token) {
  //     backgroundFetchAllPages();
  //   }


  // }, [userId, token]);

  // ⬇️ Auto-refresh ALL pages every 1 minute
  useEffect(() => {
    if (!userId || !token) return;

    const interval = setInterval(() => {
      console.log("Auto refresh running: fetching all inbox pages...");
      backgroundFetchAllPages();
      fetchEmails()
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [userId, token]);

  // ⬇️ Fetch local stored emails whenever page changes
  useEffect(() => {
    if (userId && token) fetchEmails();
  }, [userId, token, page]);

  // ⬇️ Filter tabs
  const filteredMessages =
    activeTab === "All"
      ? messages
      : messages.filter((m) => {
          if (activeTab === "Email") return m.channel?.toLowerCase() === "email";
          if (activeTab === "SMS") return m.channel?.toLowerCase() === "sms";
          return true;
        });

         const handleCheckboxChange = (email: string, id: number) => {
            setSelectedLeadEmails((prev) =>
              prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
            );
            setSelectedLeadIds((prev) =>
              prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
            );
          };
          
            const fetchAll = async () => {
              try {
                const [
                
                  toneRes,
                  personaRes,
                ] = await Promise.all([
              
                  fetch(`${API_BASE}/ai/tones`, { headers }).then(r => r.json()),
                  fetch(`${API_BASE}/ai/personas`, { headers }).then(r => r.json()),
                ]);
          
                setTones(toneRes);
                setPersonas(personaRes);
              } catch (e) {
                console.error(e);
              }
            };
          
            useEffect(() => {
              fetchAll();
            }, []);

  // ⬇️ Send reply
  const handleSend = async () => {
    if (!reply || !selected) return toast.error("Select a message first!");

    try {
      const res = await fetch(`${API_BASE}/inbox/send`, {
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
                className={`p-5 cursor-pointer hover:bg-orange-100 ${
                  msg.is_unread ? "bg-orange-100 font-semibold" : "bg-white"
                }`}
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

      {/* AI Reply UI */}
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
