import React, { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout";
import { Cloud, 
  Upload,
  CheckCircle2,
  LogOut,
  Loader2} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function HubSpotIntegration() {
  const [connected, setConnected] = useState(false);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔹 dialog + disconnect loading
  const [showDisconnectDialog, setShowDisconnectDialog] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE;
  const owner_id = localStorage.getItem("user_id") || "";
  const org_id = localStorage.getItem("org_id") || "";
  const authToken = localStorage.getItem("token");

  // ---------------- Check HubSpot connection ----------------
  const checkConnection = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/api/crm/hubspot/status/${org_id}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      const data = await res.json();
      setConnected(data.connected);
    } catch (err) {
      console.error(err);
      setConnected(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  // ---------------- Connect HubSpot ----------------
  const handleConnect = () => {
    window.location.href = `${API_BASE}/api/crm/connect-hubspot?state=${org_id}`;
  };

  // ---------------- Disconnect HubSpot ----------------
  const handleDisconnect = async () => {
    try {
      setDisconnecting(true);

      await fetch(
        `${API_BASE}/api/crm/disconnect-hubspot/${org_id}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      setConnected(false);
      setContacts([]);
      setShowDisconnectDialog(false);
      toast.success("HubSpot disconnected successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to disconnect HubSpot");
    } finally {
      setDisconnecting(false);
    }
  };

  // ---------------- Sync Leads ----------------
  const handleSync = async () => {
    if (!connected) {
      toast.error("Please connect HubSpot first!");
      return;
    }

    setLoading(true);
    setContacts([]);

    try {
      const res = await fetch(
        `${API_BASE}/api/crm/fetch-leads/${owner_id}/${org_id}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.error || "Failed to sync HubSpot leads");
        return;
      }

      const data = await res.json();

      const formatted = (data.leads || []).map((c: any) => ({
        name: c.name || "—",
        email: c.email || "—",
        phone: c.phone || "—",
      }));

      setContacts(formatted);

      if (formatted.length > 0) {
        toast.success(`${formatted.length} HubSpot leads imported successfully!`);
      } else {
        toast.success("No new leads found from HubSpot.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching contacts");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
          <Cloud className="text-orange-500" /> HubSpot Integration
        </h1>
          <Toaster position="top-right" />

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-gray-700 mb-6 leading-relaxed">
            Integrate with <strong>HubSpot</strong> for effortless contact and
            lead synchronization.
          </p>

          {!connected ? (
            <button
              onClick={handleConnect}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-md transition"
            >
              Connect HubSpot Account
            </button>
          ) : (
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <CheckCircle2 /> Connected to HubSpot
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
              onClick={handleSync}
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
                  Sync Leads from Hubspot
                </>
              )}
            </button>
            {/* <button
              onClick={handleSync}
              disabled={!connected || loading}
              className={`w-full max-w-xl flex items-center justify-center gap-2 py-4 rounded-2xl transition
                ${
                  loading
                    ? "bg-gray-200 cursor-not-allowed"
                    : "border border-gray-300 hover:bg-gray-50"
                }`}
            >
              <Download className="text-orange-500" />
              <span className="font-medium">
                {loading ? "Syncing HubSpot Leads..." : "Sync Leads from HubSpot"}
              </span>
            </button> */}
          </div>

          {loading && (
            <p className="mt-4 text-sm text-gray-500 text-center">
              Please wait, syncing leads from HubSpot…
            </p>
          )}
        </div>
      </div>

      {/* ================= Disconnect Confirmation Dialog ================= */}
      {showDisconnectDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Disconnect HubSpot
            </h3>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to disconnect HubSpot?  
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
