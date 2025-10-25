import React, { useState } from "react";
import MainLayout from "../components/MainLayout";
import { Cloud, Download, Upload, CheckCircle2 } from "lucide-react";

export default function SalesforceIntegration() {
  const [connected, setConnected] = useState(false);

  return (
    <MainLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
          <Cloud className="text-orange-500" /> Salesforce Integration
        </h1>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-gray-700 mb-4 leading-relaxed">
            Connect your <strong>Salesforce CRM</strong> to automatically sync
            prospects, campaigns, and engagement data. Enable real-time
            automation triggers and keep your Salesforce pipeline up to date.
          </p>

          {!connected ? (
            <button
              onClick={() => setConnected(true)}
              className="px-5 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-md transition"
            >
              Connect Salesforce
            </button>
          ) : (
            <div className="flex items-center gap-3 text-green-600 font-medium mt-2">
              <CheckCircle2 /> Connected to Salesforce Successfully!
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition">
              <Upload className="text-orange-500" /> Export Leads to Salesforce
            </button>
            <button className="flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition">
              <Download className="text-orange-500" /> Import Leads from Salesforce
            </button>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-500">
              All contacts stay bidirectionally synced — update once, reflect
              everywhere.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
