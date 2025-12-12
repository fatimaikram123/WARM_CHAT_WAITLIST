import React, { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout";
import { Cloud, Download, Upload, CheckCircle2, Users } from "lucide-react";

export default function HubSpotIntegration() {
  const [connected, setConnected] = useState(false);
  const [contacts, setContacts] = useState<any[]>([]);
  const API_BASE = import.meta.env.VITE_API_BASE;
  const owner_id=localStorage.getItem("user_id") || "";
  const org_id=localStorage.getItem("org_id") || "";


  useEffect(() => {
    const checkConnection = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/crm/fetch-leads/${owner_id}/${org_id}`, {
          credentials: "include",
        });
        if (res.ok) setConnected(true);
      } catch (err) {
        setConnected(false);
      }
    };
    checkConnection();
  }, []);

  const handleConnect = () => {
    window.location.href = `${API_BASE}/api/crm/connect-hubspot`;
  };

  const handleImport = async () => {
    try {
     
      const res = await fetch(`${API_BASE}/api/crm/fetch-leads/${owner_id}/${org_id}`, {
        credentials: "include",
      });
      if (!res.ok) {
        alert("Please connect HubSpot first!");
        return;
      }

      const data = await res.json();
      setContacts(data.results || []);
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
          <p className="text-gray-700 mb-4 leading-relaxed">
            Connect your <strong>HubSpot CRM</strong> to sync contacts,
            engagement, and marketing data. Import leads directly and keep your
            CRM always updated.
          </p>

          {!connected ? (
            <button
              onClick={handleConnect}
              className="px-5 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-md transition"
            >
              Connect HubSpot
            </button>
          ) : (
            <div className="flex items-center gap-3 text-green-600 font-medium mt-2">
              <CheckCircle2 /> Connected to HubSpot Successfully!
            </div>
          )}

          {/* Import Button */}
          <div className="mt-8">
            <button
              onClick={handleImport}
              className="flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition w-full sm:w-auto"
            >
              <Download className="text-orange-500" /> Import Contacts from HubSpot
            </button>
          </div>

          {/* Contacts List */}
          {contacts.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <Users className="text-orange-500" /> Imported Contacts
              </h2>

              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((c) => (
                      <tr
                        key={c.id}
                        className="border-t hover:bg-gray-50 transition"
                      >
                        <td className="py-3 px-4">
                          {c.properties?.firstname || ""}{" "}
                          {c.properties?.lastname || ""}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {c.properties?.email || "—"}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {c.properties?.phone || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {contacts.length === 0 && connected && (
            <p className="mt-6 text-sm text-gray-500">
              No contacts imported yet. Click “Import Contacts from HubSpot”.
            </p>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
