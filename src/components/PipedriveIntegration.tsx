import React, { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout";
import { Share2, Download, Upload, CheckCircle2 } from "lucide-react";

export default function PipedriveIntegration() {
  const API_BASE = import.meta.env.VITE_API_BASE;

  // 🔐 TOKENS (SEPARATED)
  const appToken = localStorage.getItem("token"); // YOUR backend auth
  const [pipedriveToken, setPipedriveToken] = useState<string | null>(null);

  const [connected, setConnected] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const orgId = localStorage.getItem("org_id");
  const ownerId = localStorage.getItem("user_id");

  // ------------------ Handle Pipedrive OAuth ------------------ //
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const oauthToken = params.get("token");

    if (oauthToken) {
      localStorage.setItem("pipedrive_token", oauthToken);
      localStorage.setItem("pipedrive_connected", "true");

      setPipedriveToken(oauthToken);
      setConnected(true);

      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }

    const saved = localStorage.getItem("pipedrive_token");
    if (saved) {
      setPipedriveToken(saved);
      setConnected(true);
    }
  }, []);

  // ------------------ Connect OAuth ------------------ //
  const handleConnect = () => {
    window.location.href = `${API_BASE}/api/crm/connect-pipedrive`;
  };

  // ------------------ Import ------------------ //
  const importFromPipedrive = async (type: "leads" | "contacts") => {
    if (!connected) {
      alert("Connect Pipedrive first");
      return;
    }

    setLoading(true);
    setItems([]);

    try {
      const res = await fetch(
        `${API_BASE}/api/crm/fetch-pipedrive-${type}/${ownerId}/${orgId}`,
        {
          headers: {
            // 🔐 YOUR BACKEND AUTH ONLY
            Authorization: `Bearer ${appToken}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Import failed");

      setItems(data[type]);
      alert(`Pipedrive ${type} imported successfully`);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ------------------ JSX ------------------ //
  return (
    <MainLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <Share2 className="text-orange-500" /> Pipedrive Integration
        </h1>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          {!connected ? (
            <button
              onClick={handleConnect}
              className="px-5 py-2 bg-orange-500 text-white rounded-lg font-semibold"
            >
              Connect Pipedrive Account
            </button>
          ) : (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle2 /> Pipedrive Connected
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button className="border py-3 rounded-xl">
              <Upload className="inline mr-2 text-orange-500" />
              Sync Deals
            </button>

            <button
              disabled={loading}
              onClick={() => importFromPipedrive("contacts")}
              className="border py-3 rounded-xl"
            >
              <Download className="inline mr-2 text-orange-500" />
              Import Contacts
            </button>

            <button
              disabled={loading}
              onClick={() => importFromPipedrive("leads")}
              className="border py-3 rounded-xl"
            >
              <Download className="inline mr-2 text-orange-500" />
              Import Leads
            </button>
          </div>

          {items.length > 0 && (
            <ul className="mt-6 space-y-2">
              {items.map((i, idx) => (
                <li key={idx} className="p-3 border rounded bg-gray-50">
                  <strong>{i.name}</strong> — {i.email}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
