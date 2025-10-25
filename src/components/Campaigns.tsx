import React from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";

export default function Campaigns() {
  const navigate = useNavigate();

  const campaigns = [
    { id: 1, name: "Startup Outreach", status: "Running", sent: 1200, openRate: "48%", replies: 112 },
    { id: 2, name: "Agency Leads Q3", status: "Paused", sent: 950, openRate: "52%", replies: 89 },
    { id: 3, name: "Product Updates", status: "Completed", sent: 600, openRate: "40%", replies: 45 },
  ];

  return (
    <MainLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">📢 Campaigns</h1>
        <button
          onClick={() => navigate("/campaigns/new")}
          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:shadow-md transition"
        >
          + New Campaign
        </button>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-orange-50 text-gray-600 text-sm">
            <tr>
              <th className="text-left py-3 px-5">Name</th>
              <th className="text-left py-3 px-5">Status</th>
              <th className="text-left py-3 px-5">Sent</th>
              <th className="text-left py-3 px-5">Open Rate</th>
              <th className="text-left py-3 px-5">Replies</th>
              <th className="text-left py-3 px-5 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 transition">
                <td className="py-3 px-5 font-medium text-gray-800">{c.name}</td>
                <td className="py-3 px-5">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      c.status === "Running"
                        ? "bg-green-50 text-green-600"
                        : c.status === "Paused"
                        ? "bg-yellow-50 text-yellow-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="py-3 px-5 text-gray-700">{c.sent}</td>
                <td className="py-3 px-5 text-gray-700">{c.openRate}</td>
                <td className="py-3 px-5 text-gray-700">{c.replies}</td>
                <td className="py-3 px-5 text-center">
                  <button
                    onClick={() => navigate(`/campaigns/${c.id}`)}
                    className="text-sm text-orange-500 hover:underline font-medium"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}
