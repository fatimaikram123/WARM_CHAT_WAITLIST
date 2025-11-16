import MainLayout from "@/components/MainLayout";
import React, { useEffect, useState } from "react";

const OrganizationList: React.FC = () => {
  const [orgs, setOrgs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [newOrgName, setNewOrgName] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const token = localStorage.getItem("token");
  const API_BASE = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    fetchOrgs();
  }, []);

  const fetchOrgs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/orgs/all`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch organizations");

      const data = await res.json();
      setOrgs(data);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to fetch organizations." });
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrg = async () => {
    if (!newOrgName) return;

    setMessage(null);
    try {
      const res = await fetch(`${API_BASE}/api/orgs/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newOrgName,user_id: localStorage.getItem("user_id") }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add organization");

      setMessage({ type: "success", text: data.message });
      setNewOrgName("");
      fetchOrgs();
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to add organization." });
    }
  };

  const handleUpdateOrg = async (orgId: number, updatedName: string) => {
    if (!updatedName) return;

    setMessage(null);
    try {
      const res = await fetch(`${API_BASE}/api/orgs/${orgId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: updatedName }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update organization");

      setMessage({ type: "success", text: data.message });
      fetchOrgs();
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to update organization." });
    }
  };

  return (
    <MainLayout>
      <div className="p-6 min-h-screen bg-gradient-to-br ">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Organizations 🏢</h2>

          {message && (
            <div
              className={`mb-4 p-3 rounded-md text-sm font-medium ${
                message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Add Organization */}
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="New Organization Name"
              value={newOrgName}
              onChange={(e) => setNewOrgName(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 mr-2 flex-1"
            />
            <button
              onClick={handleAddOrg}
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
              Add Organization
            </button>
          </div>

          {loading ? (
            <p>Loading organizations...</p>
          ) : orgs.length === 0 ? (
            <p className="text-gray-500">No organizations found.</p>
          ) : (
            <table className="w-full border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-orange-100 text-left">
                  <th className="p-3">Name</th>
                  <th className="p-3">ID</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {orgs.map((org) => (
                  <tr key={org.id} className="border-t">
                    <td className="p-3">
                      <input
                        type="text"
                        defaultValue={org.name}
                        onBlur={(e) => handleUpdateOrg(org.id, e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="p-3 text-gray-500">{org.id}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleUpdateOrg(org.id, org.name)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default OrganizationList;
