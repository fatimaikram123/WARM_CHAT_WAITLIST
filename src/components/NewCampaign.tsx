import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "./MainLayout";
import { Send, Users, Mail, MessageSquare, Save, CheckCircle } from "lucide-react";

type Channel = "Email" | "SMS";
type Source = "hubspot" | "salesforce" | "pipedrive" | "added";

const API_BASE = import.meta.env.VITE_API_BASE;

interface Lead {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  source?: string;
  selected?: boolean;
}

interface AiResponse {
  intent: string;
  message: string[];
  suggestions: string[];
}

const NewCampaign: React.FC = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [campaignName, setCampaignName] = useState("");
  const [channels, setChannels] = useState<Channel[]>([]);
  const [aiMessage, setAiMessage] = useState("");
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sources, setSources] = useState<Source[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const token = localStorage.getItem("token");
  const orgId = localStorage.getItem("org_id");
  const ownerId = localStorage.getItem("user_id");

  const toggleChannel = (channel: Channel) => {
    setChannels((prev) =>
      prev.includes(channel)
        ? prev.filter((c) => c !== channel)
        : [...prev, channel]
    );
  };

  const toggleSource = (source: Source) => {
    setSources((prev) =>
      prev.includes(source)
        ? prev.filter((s) => s !== source)
        : [...prev, source]
    );
  };

  const handleGenerateAI = async () => {
    if (!token || !orgId) return;
    const selectedLeads = leads.filter((l) => l.selected);
    if (selectedLeads.length === 0) {
      alert("Please select at least one lead for AI generation.");
      return;
    }
    try {
      setAiMessage("Generating AI message...");
      setAiSuggestions([]);
      const res = await fetch(`${API_BASE}/ai/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          prompt: "Create a personalized outreach message",
          tone: "Friendly",
          persona: "Sales Representative",
          channel: channels.includes("Email") ? "email" : "sms",
          lead_data: selectedLeads,
        }),
      });
      if (!res.ok) throw new Error("AI generation failed");
      const data = await res.json();
      const response: AiResponse = data.response;
      const mainMessage = Array.isArray(response.message) ? response.message[0] : response.message;
      setAiMessage(mainMessage || "");
      setAiSuggestions(response.suggestions || []);
    } catch (err) {
      console.error(err);
      alert("Failed to generate AI message");
      setAiMessage("");
      setAiSuggestions([]);
    }
  };

  const fetchLeads = async () => {
    if (!token || !orgId || !ownerId) return;
    setLoadingLeads(true);
    let collected: Lead[] = [];
    for (const src of sources) {
      try {
        let res;
        if (src === "added") {
          res = await fetch(`${API_BASE}/leads/${orgId}`, { headers: { Authorization: `Bearer ${token}` } });
        } else if (src === "hubspot") {
          res = await fetch(`${API_BASE}/api/crm/fetch-leads/${ownerId}/${orgId}`, { headers: { Authorization: `Bearer ${token}` } });
        } else if (src === "pipedrive") {
          res = await fetch(`${API_BASE}/api/crm/fetch-pipedrive-leads/${ownerId}/${orgId}`, { headers: { Authorization: `Bearer ${token}` } });
        } else if (src === "salesforce") {
          res = await fetch(`${API_BASE}/api/crm/fetch-salesforce-leads/${ownerId}/${orgId}`, { headers: { Authorization: `Bearer ${token}` } });
        }
        const data = await res.json();
        const newLeads = Array.isArray(data) ? data : data.leads || [];
        collected = [
          ...collected,
          ...newLeads.map((l: any) => ({
            ...l,
            selected: l.selected || false,
            source: l.source || src,
          })),
        ];
      } catch (error) {
        console.error(error);
      }
    }
    setLeads(collected);
    setLoadingLeads(false);
  };

  useEffect(() => {
    if (step === 2 && sources.length > 0) fetchLeads();
  }, [step, sources]);

  const saveCampaign = async () => {
    if (!aiMessage.trim() || saving) return;
    const selectedLeads = leads.filter((l) => l.selected);
    const leadSources = Array.from(new Set(selectedLeads.map((l) => l.source).filter(Boolean)));

    try {
      setSaving(true);
      const res = await fetch(`${API_BASE}/campaigns/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: campaignName,
          channels,
          message: aiMessage,
          sources: leadSources,
          leads: selectedLeads,
          orgId,
          ownerId,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create campaign");

      // Show modal popup
      setShowSuccessPopup(true);
    } catch (err) {
      alert("Failed to create campaign");
    } finally {
      setSaving(false);
    }
  };

  const sourceLabel = () => sources.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(", ");
  const channelLabel = channels.length === 2 ? "Email + SMS" : channels[0];

  return (
    <MainLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
          <Send className="text-orange-500" /> Create New Campaign
        </h1>

        {/* Success Modal Popup */}
        {showSuccessPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 flex flex-col items-center">
              <CheckCircle className="text-green-500 w-12 h-12 mb-4" />
              <h2 className="text-lg font-semibold mb-2">Campaign Created Successfully!</h2>
              <p className="text-sm text-gray-600 mb-4">
                Your campaign has been created and is ready to use.
              </p>
              <button
                onClick={() => navigate(`/campaigns`)}
                className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium"
              >
                Go to Campaigns
              </button>
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-sm p-6 max-w-3xl mx-auto">
          {/* Step indicators */}
          <div className="flex items-center justify-between mb-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className={`flex-1 h-1 mx-1 rounded-full ${step >= n ? "bg-orange-500" : "bg-gray-200"}`} />
            ))}
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <input
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="Campaign Name"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => toggleChannel("Email")}
                  className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${channels.includes("Email") ? "bg-orange-500 text-white border-orange-500" : "border-gray-300"}`}
                >
                  <Mail size={18} /> Email
                </button>
                <button
                  onClick={() => toggleChannel("SMS")}
                  className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${channels.includes("SMS") ? "bg-orange-500 text-white border-orange-500" : "border-gray-300"}`}
                >
                  <MessageSquare size={18} /> SMS
                </button>
              </div>
              <div className="flex justify-end">
                <button
                  disabled={!campaignName || channels.length === 0}
                  onClick={() => setStep(2)}
                  className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Users className="text-orange-500" />
                <h2 className="text-lg font-semibold">Select Audience</h2>
              </div>

              <ul className="border rounded-lg divide-y">
                {[
                  { key: "added", label: "Already Added Leads" },
                  { key: "hubspot", label: "Imported Leads (HubSpot)" },
                  { key: "salesforce", label: "Salesforce Contacts" },
                  { key: "pipedrive", label: "Pipedrive Leads" },
                ].map((s) => (
                  <li
                    key={s.key}
                    onClick={() => toggleSource(s.key as Source)}
                    className={`px-4 py-3 flex justify-between cursor-pointer ${sources.includes(s.key as Source) ? "bg-orange-50" : ""}`}
                  >
                    <span>{s.label}</span>
                    {sources.includes(s.key as Source) && "✓"}
                  </li>
                ))}
              </ul>

              <div className="border rounded-lg p-4 max-h-60 overflow-y-auto">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium">Leads ({leads.length})</p>
                  <button
                    className="text-xs text-orange-500 underline"
                    onClick={() => {
                      const allSelected = leads.every((l) => l.selected);
                      setLeads((prev) =>
                        prev.map((l) => ({ ...l, selected: !allSelected }))
                      );
                    }}
                  >
                    {leads.every((l) => l.selected) ? "Deselect All" : "Select All"}
                  </button>
                </div>
                {loadingLeads ? (
                  <p className="text-sm text-gray-500">Loading...</p>
                ) : (
                  <ul className="divide-y text-sm">
                    {leads.map((l, i) => (
                      <li
                        key={i}
                        className="py-2 flex justify-between items-center cursor-pointer"
                        onClick={() => {
                          setLeads((prev) =>
                            prev.map((lead) =>
                              lead.id === l.id ? { ...lead, selected: !lead.selected } : lead
                            )
                          );
                        }}
                      >
                        <span>{l.name} ({l.email}) - {l.source}</span>
                        <input type="checkbox" checked={l.selected || false} readOnly />
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep(1)} className="px-6 py-2 border rounded-lg">← Back</button>
                <button
                  disabled={leads.filter((l) => l.selected).length === 0}
                  onClick={() => setStep(3)}
                  className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="border rounded-lg px-4 py-3 text-sm bg-gray-50">
                <div><strong>Sending to:</strong> {sourceLabel()}</div>
                <div><strong>Channel:</strong> {channelLabel}</div>
                <div><strong>Contacts:</strong> {leads.filter((l) => l.selected).length}</div>
              </div>

              <textarea
                rows={6}
                value={aiMessage}
                onChange={(e) => setAiMessage(e.target.value)}
                placeholder={`Hi {{lead_first_name}}, this is {{agent_name}}.\n\nI wanted to reach out because…`}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
              />

              <button
                onClick={handleGenerateAI}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium"
              >
                ✨ Generate Message
              </button>

              <div className="flex justify-between pt-2">
                <button onClick={() => setStep(2)} className="px-6 py-2 border rounded-lg">← Back</button>
                <button
                  disabled={!aiMessage.trim()}
                  onClick={saveCampaign}
                  className={`px-6 py-2 rounded-lg text-white flex items-center gap-2 ${aiMessage.trim() ? "bg-gradient-to-r from-orange-500 to-orange-600" : "bg-gray-300 cursor-not-allowed"}`}
                >
                  <Save size={18} /> Save Campaign
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default NewCampaign;
