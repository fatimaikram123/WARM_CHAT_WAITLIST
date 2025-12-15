import React, { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";

interface Role {
  id: number;
  name: string;
}

interface Organization {
  id: number;
  name: string;
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const token = localStorage.getItem("token");
  const API_BASE = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchOrgs();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch(`${API_BASE}/api/auth/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to load users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Failed to load users." });
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/roles`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch roles");
      const data = await res.json();
      setRoles(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOrgs = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/orgs/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch organizations");
      const data = await res.json();
      setOrgs(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRoleChange = async (userId: number, newRole: string) => {
    setMessage(null);
    try {
      const res = await fetch(`${API_BASE}/api/auth/users/${userId}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update role");
      setMessage({ type: "success", text: data.message || "Role updated successfully." });
      fetchUsers();
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Failed to update role." });
    }
  };

  const handleOrgChange = async (userId: number, newOrgId: number) => {
    setMessage(null);
    try {
      const res = await fetch(`${API_BASE}/api/auth/users/${userId}/org`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ org_id: newOrgId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update organization");
      setMessage({ type: "success", text: data.message || "Organization updated successfully." });
      fetchUsers();
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Failed to update organization." });
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen p-4 sm:p-8 bg-gradient-to-br">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Users 👥</h2>

          {message && (
            <div
              className={`mb-4 p-3 rounded-md text-sm font-medium ${
                message.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}

          {loading ? (
            <p>Loading users...</p>
          ) : (
            <>
              {/* Table for large screens */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-[700px] border border-gray-200 rounded-lg table-auto">
                  <thead>
                    <tr className="bg-orange-100 text-left">
                      <th className="p-3">Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Role</th>
                      <th className="p-3">Organization</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-t">
                        <td className="p-3">{user.name}</td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3">
                          <select
                            value={user.role}
                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
                          >
                            {roles.map((r) => (
                              <option key={r.id} value={r.name}>
                                {r.name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="p-3">
                          <select
                            value={user.org_id}
                            onChange={(e) => handleOrgChange(user.id, Number(e.target.value))}
                            className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
                          >
                            {orgs.map((o) => (
                              <option key={o.id} value={o.id}>
                                {o.name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="p-3 text-gray-500 text-sm">Select role/org above</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Card layout for small screens */}
              <div className="lg:hidden space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="bg-white rounded-lg shadow p-4 border border-gray-200">
                    <div className="flex flex-col gap-2 mb-2">
                      <span className="font-semibold text-gray-700">Name:</span>
                      <span>{user.name}</span>
                    </div>
                    <div className="flex flex-col gap-2 mb-2">
                      <span className="font-semibold text-gray-700">Email:</span>
                      <span>{user.email}</span>
                    </div>
                    <div className="flex flex-col gap-2 mb-2">
                      <span className="font-semibold text-gray-700">Role:</span>
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
                      >
                        {roles.map((r) => (
                          <option key={r.id} value={r.name}>
                            {r.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2 mb-2">
                      <span className="font-semibold text-gray-700">Organization:</span>
                      <select
                        value={user.org_id}
                        onChange={(e) => handleOrgChange(user.id, Number(e.target.value))}
                        className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
                      >
                        {orgs.map((o) => (
                          <option key={o.id} value={o.id}>
                            {o.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="text-gray-500 text-sm mt-2">Select role/org above</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ManageUsers;
