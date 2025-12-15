import React, { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout";
import {
  Share2,
  Upload,
  CheckCircle2,
  LogOut,
  Loader2,
} from "lucide-react";
import toast,{Toaster} from "react-hot-toast";

export default function PipedriveIntegration() {
  const [connected, setConnected] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔹 dialog + disconnect loading
  const [showDisconnectDialog, setShowDisconnectDialog] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE;
  const orgId = localStorage.getItem("org_id");
  const ownerId = localStorage.getItem("user_id");
  const authToken = localStorage.getItem("token");

  // ---------------- Check connection ----------------
  const checkStatus = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/api/crm/pipedrive/status/${orgId}`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      const data = await res.json();
      setConnected(data.connected);
    } catch {
      setConnected(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("connected") === "true") {
      toast.success("Pipedrive connected successfully");
      setConnected(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      checkStatus();
    }
  }, []);

  // ---------------- Connect ----------------
  const handleConnect = () => {
    window.location.href = `${API_BASE}/api/crm/connect-pipedrive?state=${orgId}`;
  };

  // ---------------- Disconnect ----------------
  const handleDisconnect = async () => {
    try {
      setDisconnecting(true);

      await fetch(
        `${API_BASE}/api/crm/disconnect-pipedrive/${orgId}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      setConnected(false);
      setLeads([]);
      setShowDisconnectDialog(false);
      toast.success("Pipedrive disconnected successfully");
    } catch {
      toast.error("Failed to disconnect Pipedrive");
    } finally {
      setDisconnecting(false);
    }
  };

  // ---------------- Sync Leads ----------------
  const fetchLeads = async () => {
    if (!connected) {
      toast.error("Please connect Pipedrive first");
      return;
    }

    setLoading(true);
    setLeads([]);

    try {
      const res = await fetch(
        `${API_BASE}/api/crm/fetch-pipedrive-leads/${ownerId}/${orgId}`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      if (!res.ok) {
        toast.error("Failed to sync Pipedrive leads");
        return;
      }

      const data = await res.json();
      setLeads(data.leads || []);

      if ((data.leads || []).length > 0) {
        toast.success(`${data.leads.length} Pipedrive leads imported`);
      } else {
       toast.success("No new leads found from Pipedrive.");
      }
    } catch {
      toast.error("Error syncing leads");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="p-8">
          <Toaster position="top-right" />
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
          <Share2 className="text-orange-500" /> Pipedrive Integration
        </h1>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-gray-700 mb-6 leading-relaxed">
            Integrate with <strong>Pipedrive</strong> for effortless lead
            synchronization.
          </p>

          {!connected ? (
            <button
              onClick={handleConnect}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-md transition"
            >
              Connect Pipedrive Account
            </button>
          ) : (
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <CheckCircle2 /> Connected to Pipedrive
              </div>

              <button
                onClick={() => setShowDisconnectDialog(true)}
                className="flex items-center gap-2 px-4 py-2 border border-red-400 text-red-600 rounded-xl hover:bg-red-50 transition"
              >
                <LogOut size={18} />
                Disconnect
              </button>
            </div>
          )}

          <div className="mt-6 flex ">
            <button
              onClick={fetchLeads}
              disabled={!connected || loading}
              className={`w-full max-w-xl flex items-center justify-center gap-2 py-4 rounded-2xl transition
                ${
                  loading
                    ? "bg-gray-200 cursor-not-allowed"
                    : "border border-gray-300 hover:bg-gray-50"
                }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin text-orange-500" />
                  Syncing Pipedrive Leads...
                </>
              ) : (
                <>
                  <Upload className="text-orange-500" />
                  Sync Leads from Pipedrive
                </>
              )}
            </button>
          </div>

          {leads.length > 0 && (
            <div className="mt-10">
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
                    {lead.phone && ` — ${lead.phone}`}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!loading && connected && leads.length === 0 && (
            <p className="mt-6 text-sm text-gray-500 text-center">
              No leads imported yet. Click “Sync Leads from Pipedrive”.
            </p>
          )}
        </div>
      </div>

      {/* ================= Disconnect Confirmation Dialog ================= */}
      {showDisconnectDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Disconnect Pipedrive
            </h3>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to disconnect Pipedrive?  
              This will stop syncing leads until you reconnect.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDisconnectDialog(false)}
                disabled={disconnecting}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={handleDisconnect}
                disabled={disconnecting}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
              >
                {disconnecting ? "Disconnecting..." : "Disconnect"}
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
