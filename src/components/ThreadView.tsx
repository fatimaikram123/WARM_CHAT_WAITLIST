import React, { useEffect, useState } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { ArrowLeft, Send, Wand2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function ThreadView() {
  const { thread_id } = useParams();
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE;
  const token = localStorage.getItem("token");
  const user_email = localStorage.getItem("gmail_email_id"); 
  const gmail_user_name = localStorage.getItem("gmail_user_name");

  const user_id = localStorage.getItem("user_id");
  const org_id = localStorage.getItem("org_id");

  const [thread, setThread] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [reply, setReply] = useState("");
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [leads, setLeads] = useState([]);
  const [selectedLeadEmails, setSelectedLeadEmails] = useState([]);
  const [selectedLeadIds, setSelectedLeadIds] = useState([]);
  const limit = 100;
  const [aiSuggestions, setAiSuggestions] = useState([]);


  // AI states
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiTone, setAiTone] = useState("Friendly");
  const [aiPersona, setAiPersona] = useState("Sales Representative");
  const [aiChannel, setAiChannel] = useState("email");

  // -------------------- Auto-fetch interval --------------------
  useEffect(() => {
    if (!thread_id || !user_id || !org_id) return;

    const interval = setInterval(() => {
      fetch(`${API_BASE}/api/inbox/thread/fetch/${user_id}/${org_id}/${thread_id}`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(() => fetchThread(true))
        .catch(err => console.log("Auto-fetch error:", err));
    }, 30000);

    return () => clearInterval(interval);
  }, [thread_id, user_id, org_id]);

  // -------------------- Fetch leads --------------------
  useEffect(() => {
    fetch(`${API_BASE}/api/leads/${org_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setLeads(data || []))
      .catch(() => console.log("Failed to load leads"));
  }, [API_BASE, org_id, token]);

  // -------------------- Fetch thread messages --------------------
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
      }
    } catch (error) {
      console.error("❌ Failed to load thread:", error);
      toast.error("Failed to load thread!");
    }
  };

  useEffect(() => {
    fetchThread(true);
  }, [thread_id]);

  // -------------------- Preselect leads --------------------
  useEffect(() => {
    if (!thread || leads.length === 0) return;

    const uniqueEmails = Array.from(
      new Set(
        (conversation || [])
          .filter(msg => msg.direction === "inbound")
          .map(msg => msg.sender_email?.trim())
          .filter(email => email && email !== user_email)
      )
    );

    const leadIdsFromThread = thread.lead_ids || [];

    const matchedLeadIds = leads
      .filter(lead => uniqueEmails.includes(lead.email) || leadIdsFromThread.includes(lead.id))
      .map(lead => lead.id);

    const matchedLeadEmails = leads
      .filter(lead => matchedLeadIds.includes(lead.id))
      .map(lead => lead.email);

    setSelectedLeadIds(matchedLeadIds);
    setSelectedLeadEmails(matchedLeadEmails);
  }, [thread, conversation, leads]);

  const handleLeadCheckboxChange = (email, id) => {
    setSelectedLeadEmails(prev =>
      prev.includes(email) ? prev.filter(e => e !== email) : [...prev, email]
    );
    setSelectedLeadIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // -------------------- Send reply --------------------
  const handleReply = async () => {
    if (!reply.trim() || selectedLeadEmails.length === 0) {
      toast.error("Please enter a message and select at least one lead!");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/inbox/send/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        body: JSON.stringify({
          thread_id,
          body: reply,
          to: selectedLeadEmails,
          user_id,
          subject: thread.subject,
          sender_name: gmail_user_name,
          org_id,
          lead_ids: selectedLeadIds
        }),
      });

      if (res.ok) {
        toast.success("Reply sent successfully!");
        setConversation(prev => [
          ...prev,
          {
            direction: "outbound",
            message: reply,
            sender: "You",
            sender_email: user_email,
            sender_name: gmail_user_name,
            sent_time: new Date().toISOString(),
          },
        ]);
        setReply("");
      } else {
        toast.error("Failed to send reply!");
      }
    } catch (err) {
      console.error("❌ Reply failed:", err);
      toast.error("Failed to send reply!");
    }
  };
const handleGenerateAI = async () => {
  if (selectedLeadEmails.length === 0) {
    toast.error("Please select at least one lead for AI generation!");
    return;
  }

  setLoadingAI(true);
  try {
    const lead_data = leads
      .filter(lead => selectedLeadIds.includes(lead.id))
      .map(lead => ({
        id: lead.id,
        name: lead.name,
        email: lead.email,
        company: lead.company,
        role: lead.role
      }));

    const res = await fetch(`${API_BASE}/api/ai/generate/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conversation,
        tone: aiTone,
        persona: aiPersona,
        channel: aiChannel,
        lead_data,
        num_messages: 5
      }),
    });

    const data = await res.json();
    const ai = data.response;
    const aiMessage =
  Array.isArray(ai.message)
    ? ai.message.join("\n")
    : typeof ai.message === "string"
      ? ai.message
      : "";

setReply(aiMessage);
    setAiSuggestions(ai.reply_suggestions || []);
    
  } catch (err) {
    console.error(err);
    toast.error("❌ Failed to generate AI reply");
  }
  setLoadingAI(false);
};

  // -------------------- Generate AI reply --------------------
  // const handleGenerateAI = async () => {
  //   if (selectedLeadEmails.length === 0) {
  //     toast.error("Please select at least one lead for AI generation!");
  //     return;
  //   }

  //   setLoadingAI(true);
  //   try {
  //     const lead_data = leads
  //       .filter(lead => selectedLeadIds.includes(lead.id))
  //       .map(lead => ({
  //         id: lead.id,
  //         name: lead.name,
  //         email: lead.email,
  //         company: lead.company,
  //         role: lead.role
  //       }));

  //     const prompt = reply || conversation[conversation.length - 1]?.message || "";

  //     const res = await fetch(`${API_BASE}/api/ai/generate`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         prompt,
  //         tone: aiTone,
  //         persona: aiPersona,
  //         channel: aiChannel,
  //         lead_data
  //       }),
  //     });

  //     const data = await res.json();
  //     const ai = data.response;

  //     setReply(`${ai.message}\n\n💬 Reply Suggestions:\n• ${ai.reply_suggestions[0]}\n• ${ai.reply_suggestions[1]}\n• ${ai.reply_suggestions[2]}\nIntent: ${ai.intent}`);
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("❌ Failed to generate AI reply");
  //   }
  //   setLoadingAI(false);
  // };

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
          <h2 className="text-xl font-semibold text-gray-800 mb-6">{thread.subject}</h2>

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

          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {conversation.length === 0 ? (
              <div className="text-center text-gray-400">No messages yet</div>
            ) : (
              conversation.map((msg, i) => (
                <div key={i} data-lov-id={msg.id}>
                  <div className={`flex ${msg.direction === "outbound" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[75%] rounded-2xl p-3 shadow-sm ${msg.direction === "outbound" ? "bg-orange-500 text-white rounded-br-none" : "bg-gray-100 text-gray-800 rounded-bl-none"}`}>
                      <div className="text-xs font-semibold mb-1 opacity-80">
                        {`${msg.sender_name}<${msg.sender_email}>` || (msg.direction === "outbound" ? "You" : msg.sender)}
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

          {/* Reply Box with Leads */}
          <div className="mt-6 border-t border-gray-200 pt-4 space-y-4">
            {/* Leads Selection */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Select Leads to Reply</label>
              <div className="border rounded-lg p-4 max-h-40 overflow-y-auto space-y-2">
                {leads.length === 0 ? (
                  <p className="text-gray-500 text-sm">No leads found.</p>
                ) : (
                  leads.map(lead => (
                    <label key={lead.id} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedLeadEmails.includes(lead.email)}
                        onChange={() => handleLeadCheckboxChange(lead.email, lead.id)}
                        className="h-4 w-4"
                      />
                      <span className="text-gray-700">{lead.name} — {lead.email}</span>
                    </label>
                  ))
                )}
              </div>
            </div>

            {/* AI Options */}
            <div className="flex items-center gap-2 mb-2">
              <select
                value={aiTone}
                onChange={(e) => setAiTone(e.target.value)}
                className="border rounded p-2 text-sm"
              >
                <option>Friendly</option>
                <option>Professional</option>
                <option>Formal</option>
                <option>Casual</option>
                <option>Persuasive</option>
                <option>Informative</option>
                <option>Empathetic</option>
              </select>

              <select
                value={aiPersona}
                onChange={(e) => setAiPersona(e.target.value)}
                className="border rounded p-2 text-sm"
              >
                <option>Sales Representative</option>
                <option>Customer Support</option>
                <option>Technical Specialist</option>
                <option>Marketing Expert</option>
                <option>Product Manager</option>
              </select>
            </div>

            {/* Reply textarea with AI button */}
            {/* Reply textarea with AI button */}
<div className="relative">
  <textarea
    value={reply}
    onChange={(e) => setReply(e.target.value)}
    className="w-full border border-gray-300 rounded-lg p-3 pr-20 text-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
    rows={3}
    placeholder="Type your reply..."
  ></textarea>

  {/* AI Button */}
  <div className="absolute top-2 right-2 flex items-center gap-1">
    <button
      onClick={handleGenerateAI}
      className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full shadow-md flex items-center justify-center"
      title="Generate AI Reply"
    >
      {loadingAI ? (
        <span className="animate-spin w-4 h-4 border-2 border-white rounded-full border-t-transparent"></span>
      ) : (
        <Wand2 size={16} />
      )}
    </button>
  </div>
</div>

{/* ⭐ AI SUGGESTION TAG PILLS (paste this ) */}
{aiSuggestions.length > 0 && (
  <div className="flex flex-wrap gap-2 mt-3">
    {aiSuggestions.map((s, index) => (
      <button
        key={index}
        onClick={() => setReply(s)}
        className="
          px-3 py-1 
          bg-orange-100 
          text-orange-700 
          border border-orange-300 
          rounded-full 
          text-xs 
          hover:bg-orange-200 
          transition
        "
      >
        {s}
      </button>
    ))}
  </div>
)}

{/* Send Reply Button */}



            {/* Send Reply Button */}
            <button
              onClick={handleReply}
              className={`mt-3 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:shadow-md transition-all
                ${(!reply.trim() || selectedLeadEmails.length === 0) ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={!reply.trim() || selectedLeadEmails.length === 0}
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
