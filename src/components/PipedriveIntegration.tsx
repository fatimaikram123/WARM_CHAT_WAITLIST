import React, { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout";
import { Share2, Download, Upload, CheckCircle2 } from "lucide-react";

export default function PipedriveIntegration() {
  const [connected, setConnected] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const API_BASE = import.meta.env.VITE_API_BASE;
  const orgId = localStorage.getItem("org_id"); // Replace with actual org ID
  const ownerId = localStorage.getItem("user_id"); 
  const localToken=localStorage.getItem("token")// Replace with actual owner ID

  useEffect(() => {
  const checkStatus = async () => {
    const res = await fetch(
      `${API_BASE}/api/crm/pipedrive/status/${orgId}`,
      { headers: { Authorization: `Bearer ${localToken}` } }
    );
    const data = await res.json();
    setConnected(data.connected);
  };
  checkStatus();
}, []);
const handleConnect = () => {
  window.location.href =
    `${API_BASE}/api/crm/connect-pipedrive?state=${orgId}`;
};
const fetchLeads = async () => {
  const res = await fetch(
    `${API_BASE}/api/crm/fetch-pipedrive-leads/${ownerId}/${orgId}`,
    {
      headers: { Authorization: `Bearer ${localToken}` },
    }
  );

  const data = await res.json();
  setLeads(data.leads || []);
};
  // ------------------ Handle OAuth token ------------------ //
  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   const accessToken = params.get("token");

  //   if (accessToken) {
  //     // Save token permanently
  //     localStorage.setItem("pipedrive_token", accessToken);
  //     localStorage.setItem("pipedrive_connected", "true");

  //     setToken(accessToken);
  //     setConnected(true);

  //     // Clean URL to remove token
  //     window.history.replaceState({}, document.title, window.location.pathname);
  //   } else {
  //     // Load token from localStorage if exists
  //     const savedToken = localStorage.getItem("pipedrive_token");
  //     const connectedStatus = localStorage.getItem("pipedrive_connected");

  //     if (savedToken) setToken(savedToken);
  //     if (connectedStatus === "true") setConnected(true);
  //   }
  // }, []);

  // // ------------------ Helpers ------------------ //
  // const handleConnect = () => {
  //   window.location.href = `${API_BASE}/api/crm/connect-pipedrive`;
  // };

  // // Append token to any URL
  // const appendToken = (url: string) => {
  //   if (!token) return url;
  //   const separator = url.includes("?") ? "&" : "?";
  //   return `${url}${separator}token=${token}`;
  // };

  // // Fetch leads from backend
  // const fetchLeads = async () => {
  //   if (!token) {
  //     alert("Connect Pipedrive first");
  //     return;
  //   }


  // ------------------ JSX ------------------ //
  return (
    <MainLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
          <Share2 className="text-orange-500" /> Pipedrive Integration
        </h1>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-gray-700 mb-4 leading-relaxed">
            Integrate with <strong>Pipedrive</strong> for effortless lead and
            deal synchronization. Keep campaigns, engagement metrics, and
            contacts fully aligned with your sales pipeline.
          </p>

          {!connected ? (
            <button
              onClick={handleConnect}
              className="px-5 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-md transition"
            >
              Connect Pipedrive Account
            </button>
          ) : (
            <div className="flex items-center gap-3 text-green-600 font-medium mt-2">
              <CheckCircle2 /> Connected to Pipedrive Successfully!
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              className="flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition"
              // onClick={() => {
              //   // Example: Navigate to some URL with token appended
              //   window.location.href = appendToken("/sync-deals");
              // }}
              onClick={fetchLeads}
            >
              <Upload className="text-orange-500" /> Sync Leads to Pipedrive
            </button>

            {/* <button
              onClick={fetchContacts}
              className="flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition"
            >
              <Download className="text-orange-500" /> Sync Contacts from
              Pipedrive
            </button> */}
          </div>

          {leads.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Recently Imported Leads
              </h2>

              <ul className="space-y-2">
                {leads.map((lead, i) => (
                  <li
                    key={i}
                    className="p-3 border rounded-lg bg-gray-50 text-gray-700"
                  >
                    <strong>{lead.name}</strong> — {lead.email}
                    {lead.phone ? ` — ${lead.phone}` : ""}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
