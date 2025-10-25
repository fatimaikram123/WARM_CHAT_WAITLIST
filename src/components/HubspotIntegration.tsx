import React, { useState } from "react";
import MainLayout from "../components/MainLayout";
import { Plug, CheckCircle2, Download, Upload } from "lucide-react";
import { useCRM } from "../context/CRMContext";

export default function HubSpotIntegration() {
  const [connected, setConnected] = useState(false);
  const { importFromCRM } = useCRM();

  const handleImport = () => {
    importFromCRM("HubSpot");
    alert("Contacts and deals imported from HubSpot!");
  };

  return (
    <MainLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
          <Plug className="text-orange-500" /> HubSpot Integration
        </h1>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-gray-700 mb-4">
            Connect your <strong>HubSpot CRM</strong> for bidirectional sync of contacts, deals, and campaign data.
          </p>

          {!connected ? (
            <button
              onClick={() => setConnected(true)}
              className="px-5 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-md transition"
            >
              Connect HubSpot Account
            </button>
          ) : (
            <div className="flex items-center gap-3 text-green-600 font-medium mt-2">
              <CheckCircle2 /> Connected to HubSpot Successfully!
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={handleImport}
              className="flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition"
            >
              <Download className="text-orange-500" /> Import Contacts & Deals
            </button>
            <button className="flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition">
              <Upload className="text-orange-500" /> Sync Back to HubSpot
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
