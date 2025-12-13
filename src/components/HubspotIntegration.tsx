import React, { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout";
import { Cloud, Download, CheckCircle2 } from "lucide-react";

export default function HubSpotIntegration() {
  const [connected, setConnected] = useState(false);
  const [contacts, setContacts] = useState<any[]>([]);
  const API_BASE = import.meta.env.VITE_API_BASE;
  const owner_id = localStorage.getItem("user_id") || "";
  const org_id = localStorage.getItem("org_id") || "";
  const authToken = localStorage.getItem("token");

  // ---------------- Check HubSpot connection ----------------
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/crm/hubspot/status/${org_id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await res.json();
        setConnected(data.connected);
      } catch (err) {
        console.error("Error checking HubSpot connection:", err);
        setConnected(false);
      }
    };
    checkConnection();
  }, []);

  // ---------------- Connect HubSpot ----------------
  const handleConnect = () => {
    window.location.href = `${API_BASE}/api/crm/connect-hubspot?state=${org_id}`;
  };

  // ---------------- Sync Leads ----------------
  const handleSync = async () => {
    if (!connected) {
      alert("Please connect HubSpot first!");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/crm/fetch-leads/${owner_id}/${org_id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("HubSpot fetch error:", err);
        alert(err.error || "Failed to sync HubSpot leads");
        return;
      }

      const data = await res.json();
      console.log("Fetched contacts from HubSpot:", data.leads);

      // Map leads to ensure name and phone exist
      const formatted = (data.leads || []).map((c: any) => ({
        name: c.name || "—",
        email: c.email || "—",
        phone: c.phone || "—",
      }));

      setContacts(formatted);

      if (formatted.length > 0) {
        alert(`${formatted.length} HubSpot leads imported successfully!`);
      } else {
        alert("No new leads found from HubSpot.");
      }
    } catch (error) {
      console.error(error);
      alert("Error fetching contacts");
    }
  };

  return (
    <MainLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
          <Cloud className="text-orange-500" /> HubSpot Integration
        </h1>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-gray-700 mb-6 leading-relaxed">
            Integrate with <strong>HubSpot</strong> for effortless contact and lead synchronization. Keep campaigns, engagement metrics, and CRM data fully aligned with your sales pipeline.
          </p>

          {!connected ? (
            <button
              onClick={handleConnect}
              className="block px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-md transition"
            >
              Connect HubSpot Account
            </button>
          ) : (
            <div className="flex items-center gap-3 text-green-600 font-medium mb-4">
              <CheckCircle2 /> Connected to HubSpot Successfully!
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleSync}
              className="w-full max-w-xl flex items-center justify-center gap-2 border border-gray-300 py-4 rounded-2xl hover:bg-gray-50 transition"
            >
              <Download className="text-orange-500" />
              <span className="font-medium">Sync Leads from HubSpot</span>
            </button>
          </div>

          {contacts.length > 0 && (
            <div className="mt-10">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center">
                Recently Imported Leads
              </h2>

              <ul className="space-y-2 max-w-xl mx-auto">
                {contacts.map((c, index) => (
                  <li
                    key={c.email || index}
                    className="p-3 border rounded-lg bg-gray-50 text-gray-700"
                  >
                    <strong>{c.name}</strong> — {c.email} {c.phone !== "—" ? ` — ${c.phone}` : ""}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {contacts.length === 0 && connected && (
            <p className="mt-6 text-sm text-gray-500 text-center">
              No leads imported yet. Click “Sync Leads from HubSpot”.
            </p>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
