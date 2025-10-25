import React, { useEffect } from "react";
import MainLayout from "../components/MainLayout";
import { useCRM } from "../context/CRMContext";

export default function Leads() {
  const { contacts, setContacts } = useCRM();

  // ✅ Load sample leads on first visit (only if no CRM data)
  useEffect(() => {
    if (contacts.length === 0) {
      setContacts([
        {
          name: "Maria Khan",
          email: "maria@startup.com",
          company: "StartupX",
          status: "Active",
        },
        {
          name: "John Smith",
          email: "john@agency.com",
          company: "AgencyHub",
          status: "Converted",
        },
        {
          name: "Fatima Malik",
          email: "fatima@techflow.io",
          company: "TechFlow",
          status: "Engaged",
        },
        {
          name: "David Chen",
          email: "david@globex.com",
          company: "Globex Corp",
          status: "New",
        },
      ]);
    }
  }, [contacts, setContacts]);

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">👥 Leads</h1>
        <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:shadow-md transition">
          + Import More Leads
        </button>
      </div>

      {contacts.length === 0 ? (
        <p className="text-gray-500">
          No leads yet. Connect your CRM to import contacts.
        </p>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-orange-50 text-gray-600 text-sm">
              <tr>
                <th className="text-left py-3 px-5">Name</th>
                <th className="text-left py-3 px-5">Email</th>
                <th className="text-left py-3 px-5">Company</th>
                <th className="text-left py-3 px-5">Status</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((lead, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-5 font-medium text-gray-800">
                    {lead.name}
                  </td>
                  <td className="py-3 px-5 text-gray-700">{lead.email}</td>
                  <td className="py-3 px-5 text-gray-700">{lead.company}</td>
                  <td className="py-3 px-5">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        lead.status === "Active"
                          ? "bg-green-50 text-green-600"
                          : lead.status === "Converted"
                          ? "bg-blue-50 text-blue-600"
                          : lead.status === "Engaged"
                          ? "bg-yellow-50 text-yellow-600"
                          : "bg-gray-50 text-gray-500"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </MainLayout>
  );
}
