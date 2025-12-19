import React, { useState, useEffect } from "react";
import { Send, Mail, MessageSquare, Wand2,FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MainLayout from "./MainLayout";
import toast, { Toaster } from "react-hot-toast";

// const personas = ["Sales Representative", "Support Agent", "Marketing Specialist"];
// const tones = ["Friendly", "Formal", "Casual", "Persuasive"];
const NewMessage = () => {
  const [channel, setChannel] = useState<"Email" | "SMS" | "">("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [senderName, setSenderName] = useState(localStorage.getItem("gmail_user_name") || "");
  const [tones, setTones] = useState([]);
  const [personas, setPersonas] = useState([]);

  const [leads, setLeads] = useState<any[]>([]);
  const [selectedLeadEmails, setSelectedLeadEmails] = useState<string[]>([]);
  const [selectedLeadIds, setSelectedLeadIds] = useState<number[]>([]);

  const [improvedMessage, setImprovedMessage] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loadingAI, setLoadingAI] = useState(false);

  const [selectedPersona, setSelectedPersona] = useState(personas[0]);
  const [selectedTone, setSelectedTone] = useState(tones[0]);

  const API_BASE = import.meta.env.VITE_API_BASE;
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");
  const org_id = localStorage.getItem("org_id");
   const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/leads/${org_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setLeads(data || []))
      .catch(() => console.log("Failed to load leads"));
  }, [API_BASE, org_id, token]);

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
  

  const handleImproveMessage = async () => {
    if (!message.trim()) return toast.error("Message cannot be empty!");

    setLoadingAI(true);
    setImprovedMessage("");
    setSuggestions([]);

    try {
      const res = await fetch(`${API_BASE}/ai/generate/improve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message,
          tone: selectedTone,
          persona: selectedPersona,
          channel: channel.toLowerCase(),
          lead_data: leads.filter((l) => selectedLeadEmails.includes(l.email)),
        }),
      });

      const data = await res.json();

      if (res.ok) {
         const aiMessage =
  Array.isArray(data.improved_message)
    ? data.improved_message.join("\n")
    : typeof data.improved_message === "string"
      ? data.improved_message
      : "";
        setMessage(aiMessage);
        setImprovedMessage(data.improved_message);
        setSuggestions(data.suggestions);
      } else {
        toast.error(data.error || "Failed to improve message");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error while improving message");
    }

    setLoadingAI(false);
  };

  const handleSend = async () => {
    if (!channel) return toast.error("Select a channel first.");
    if (!message.trim()) return toast.error("Message cannot be empty.");

    if (channel === "Email") {
      if (selectedLeadEmails.length === 0) return toast.error("Select at least one lead.");
      if (!subject.trim()) return toast.error("Subject is required.");
    }

    const payload = {
      user_id: userId,
      to: selectedLeadEmails,
      subject,
      body: message,
      sender_name: senderName,
      org_id,
      lead_ids: selectedLeadIds,
    };

    const res = await fetch(`${API_BASE}/inbox/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast.success("✅ Message sent successfully!");
      navigate("/inbox");
    } else {
      toast.error("❌ Failed to send message.");
    }
  };
  const handleSelectTemplate = (template: any) => {
  setMessage(template.content);
  if (channel === "Email" && !subject) {
    setSubject(template.title);
  }
  setShowTemplateDialog(false);
};
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [templateCategories, setTemplateCategories] = useState<any[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const fetchTemplates = async () => {
  setLoadingTemplates(true);
  try {
    const res = await fetch(
      `${API_BASE}/ai/fetch/templates-by-category?org_id=${org_id}`,
      { headers }
    );
    const data = await res.json();
    setTemplateCategories(data || []);
  } catch (e) {
    toast.error("Failed to load templates");
  }
  setLoadingTemplates(false);
};
  const handleOpenTemplateDialog = async () => {
  setShowTemplateDialog(true);
  if (templateCategories.length === 0) {
    await fetchTemplates();
  }
};


  return (
    <MainLayout>
      <Toaster position="top-right" />
      <div className="flex justify-center items-start min-h-screen bg-[#f8f9fb] pt-12 pb-20">
        <div className="w-full max-w-4xl bg-white p-10 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
            <Send className="text-orange-500" /> Create New Message
          </h1>

          {/* Channel Selector */}
          <div className="flex gap-5 mb-6">
            <button
              onClick={() => setChannel("Email")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition ${
                channel === "Email"
                  ? "border-orange-500 bg-orange-50 text-orange-600"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Mail size={18} /> Email
            </button>

            <button
              onClick={() => setChannel("SMS")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition ${
                channel === "SMS"
                  ? "border-orange-500 bg-orange-50 text-orange-600"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <MessageSquare size={18} /> SMS
            </button>
          </div>

          {/* Persona & Tone Box */}
          <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-2xl flex gap-4">
            <div className="flex flex-col w-1/2">
              <label className="text-gray-700 font-medium mb-1">Persona</label>
              <select
                value={selectedPersona}
                onChange={(e) => setSelectedPersona(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-300 focus:outline-none"
              >
            {personas.map(p => <option key={p.id} value={p.label}>{p.label}</option>)}
          
              </select>
            </div>

            <div className="flex flex-col w-1/2">
              <label className="text-gray-700 font-medium mb-1">Tone</label>
              <select
                value={selectedTone}
                onChange={(e) => setSelectedTone(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-300 focus:outline-none"
              >
              {tones.map(t => <option key={t.id} value={t.label}>{t.label}</option>)}

              </select>
            </div>
          </div>

          {/* Leads Selection */}
          {channel === "Email" && (
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Select Leads (Emails)</label>
              <div className="border rounded-xl p-4 max-h-64 overflow-y-auto bg-gray-50 space-y-2">
                {leads.length === 0 ? (
                  <p className="text-gray-500 text-sm">No leads found.</p>
                ) : (
                  leads.map((lead, idx) => (
                    <label key={idx} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedLeadEmails.includes(lead.email)}
                        onChange={() => handleCheckboxChange(lead.email, lead.id)}
                        className="h-5 w-5"
                      />
                      <span className="text-gray-800 font-medium">{lead.name} — {lead.email}</span>
                    </label>
                  ))
                )}
              </div>
              {selectedLeadEmails.length > 0 && (
                <p className="mt-2 text-sm text-orange-600 font-medium">Selected: {selectedLeadEmails.length} lead(s)</p>
              )}
            </div>
          )}

          {/* Subject */}
          {channel === "Email" && (
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Email subject..."
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>
          )}

          {/* Message Textarea + AI Button */}
          <div className="relative mb-2">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="Type your message..."
              className="w-full border border-gray-300 rounded-2xl px-4 py-3 pr-20 text-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            ></textarea>

            <div className="absolute top-3 right-3 flex  gap-1">
              <button
                onClick={handleImproveMessage}
                className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full shadow-md flex items-center justify-center"
                title="Improve Message"
              >
                {loadingAI ? (
                  <span className="animate-spin w-4 h-4 border-2 border-white rounded-full border-t-transparent"></span>
                ) : (
                  <Wand2 size={16} />
                )}
              </button>
                <button
                onClick={handleOpenTemplateDialog}
                className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full shadow-md flex items-center justify-center"
                title="Choose template"
              >
                  <FileText size={16} />
              
              </button>
            </div>
          </div>

          {/* AI Suggestion Pills */}
          {suggestions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {suggestions.map((s, index) => (
                <button
                  key={index}
                  onClick={() => setMessage(s)}
                  className="px-3 py-1 bg-orange-100 text-orange-700 border border-orange-300 rounded-full text-xs hover:bg-orange-200 transition"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Send Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className={`px-8 py-3 rounded-xl font-semibold text-white transition ${
                !message.trim() ? "bg-gray-300 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              <Send size={16} className="inline mr-1" /> Send
            </button>
          </div>
        </div>
      </div>
      {showTemplateDialog && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 relative">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Choose a Template
        </h2>
        <button
          onClick={() => setShowTemplateDialog(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      {loadingTemplates ? (
        <p className="text-gray-500">Loading templates...</p>
      ) : templateCategories.length === 0 ? (
        <p className="text-gray-500">No templates available.</p>
      ) : (
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {templateCategories.map((cat) => (
            <div key={cat.id}>
              <h3 className="font-semibold text-orange-600 mb-2">
                {cat.name}
              </h3>

              <div className="space-y-2">
                {cat.templates.map((tpl) => (
                  <div
                    key={tpl.id}
                    onClick={() => handleSelectTemplate(tpl)}
                    className="border rounded-lg p-3 cursor-pointer hover:bg-orange-50 transition"
                  >
                    <p className="font-medium text-gray-800">
                      {tpl.title}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {tpl.content.slice(0, 80)}...
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
)}

    </MainLayout>
  );
};

export default NewMessage;
