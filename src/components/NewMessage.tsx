import React, { useState, useEffect } from "react";
import { Send, Mail, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MainLayout from "./MainLayout";
import toast, { Toaster } from "react-hot-toast";

const NewMessage = () => {
  const [channel, setChannel] = useState<"Email" | "SMS" | "">("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [senderName, setSenderName] = useState(localStorage.getItem("gmail_user_name") || "");

  // Multi-select leads: now storing lead objects for id lookup
  const [leads, setLeads] = useState<any[]>([]);
  const [selectedLeadEmails, setSelectedLeadEmails] = useState<string[]>([]);
  const [selectedLeadIds, setSelectedLeadIds] = useState<number[]>([]);

  const BASE_API = import.meta.env.VITE_API_BASE;
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");
  const org_id = localStorage.getItem("org_id");

  const navigate = useNavigate();

  // Fetch leads list
  useEffect(() => {
    fetch(`${BASE_API}/api/leads/${org_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setLeads(data || []))
      .catch(() => console.log("Failed to load leads"));
  }, [BASE_API, org_id, token]);

  const handleCheckboxChange = (email: string, id: number) => {
    setSelectedLeadEmails((prev) =>
      prev.includes(email)
        ? prev.filter((e) => e !== email)
        : [...prev, email]
    );
    setSelectedLeadIds((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const handleSend = async () => {
    if (!channel) return toast.error("Select a channel first.");
    if (!message.trim()) return toast.error("Message cannot be empty.");

    // Email specific rules
    if (channel === "Email") {
      if (selectedLeadEmails.length === 0)
        return toast.error("Select at least one lead to send email.");
      if (!subject.trim()) return toast.error("Subject is required.");
    }

    const payload = {
      user_id: userId,
      to: selectedLeadEmails, // ARRAY OF EMAILS
      subject,
      body: message,
      sender_name: senderName,
      org_id,
      lead_ids: selectedLeadIds, // <-- ARRAY OF LEAD IDs sent to backend
    };

    const res = await fetch(`${BASE_API}/api/inbox/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast.success("✅ Email sent successfully!");
      navigate("/inbox");
    } else {
      toast.error("❌ Failed to send email.");
    
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-center items-start min-h-screen bg-[#f8f9fb] pt-10">
        <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-md">
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

          {/* Multi Select Leads for Email */}
          {channel === "Email" && (
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Select Leads (Emails)
              </label>

              <div className="border rounded-lg p-4 max-h-60 overflow-y-auto space-y-2">
                {leads.length === 0 ? (
                  <p className="text-gray-500 text-sm">No leads found.</p>
                ) : (
                  leads.map((lead, index) => (
                    <label key={index} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedLeadEmails.includes(lead.email)}
                        onChange={() => handleCheckboxChange(lead.email, lead.id)}
                        className="h-4 w-4"
                      />
                      <span className="text-gray-700">
                        {lead.name} — {lead.email}
                      </span>
                    </label>
                  ))
                )}
              </div>

              {selectedLeadEmails.length > 0 && (
                <p className="mt-2 text-sm text-orange-600">
                  Selected: {selectedLeadEmails.length} lead(s)
                </p>
              )}
            </div>
          )}

          {/* Subject */}
          {channel === "Email" && (
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Email subject..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
          )}

          {/* Message */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Message
            </label>
            <textarea
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
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