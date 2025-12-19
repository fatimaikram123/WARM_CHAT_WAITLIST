import React, { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import { useCRM } from "../context/CRMContext";

export default function Leads() {
  const { contacts, setContacts } = useCRM();
  const [loading, setLoading] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [showEditLeadModal, setShowEditLeadModal] = useState(false);
  const [editingLead, setEditingLead] = useState<any>(null);
  const [message, setMessage] = useState("");
   const [message2, setMessage2] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [leadToDelete, setLeadToDelete] = useState<number | null>(null);

  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    company: "",
    status: "New",
    phone: "",
    source: "",
    tags: "",
  });

  const token = localStorage.getItem("token");
  const API_BASE = import.meta.env.VITE_API_BASE;
  const org_id = localStorage.getItem("org_id");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${API_BASE}/leads/${org_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch leads");
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      setMessage("❌ Error fetching leads");
    } finally {
      setLoading(false);
    }
  };
   const handleDeleteLead = async (id: number) => {

    try {
      const res = await fetch(`${API_BASE}/leads/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(`❌ ${data.message || "Failed to delete lead"}`);
        return;
      }
      setMessage("✅ Lead deleted successfully");
      fetchLeads();
    } catch {
      setMessage("❌ Error deleting lead");
    }
  };

  const handleAddLead = async () => {
    setMessage("");
    try {
      const tagsArray = newLead.tags
        ? newLead.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [];
      const payload = {
        ...newLead,
        tags: tagsArray,
        org_id,
        owner_id: localStorage.getItem("user_id"),
      };

      const res = await fetch(`${API_BASE}/leads/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(`❌ ${data.message || "Failed to add lead"}`);
        return;
      }

      setMessage("✅ Lead added successfully");
      setShowAddLeadModal(false);
      setNewLead({
        name: "",
        email: "",
        company: "",
        status: "New",
        phone: "",
        source: "",
        tags: "",
      });
      fetchLeads();
    } catch {
      setMessage("❌ Error adding lead");
    }
  };

  const handleEditLead = (lead: any) => {
    setEditingLead({ ...lead, tags: lead.tags.join(", ") });
    setShowEditLeadModal(true);
  };

  const handleUpdateLead = async () => {
    setMessage("");
    try {
      const tagsArray = editingLead.tags
        ? editingLead.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [];

      const payload = { ...editingLead, tags: tagsArray };

      const res = await fetch(`${API_BASE}/leads/${editingLead.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(`❌ ${data.message || "Update failed"}`);
        return;
      }

      setMessage("✅ Lead updated successfully");
      setShowEditLeadModal(false);
      fetchLeads();
    } catch {
      setMessage("❌ Error updating lead");
    }
  };
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_BASE}/leads/import/${org_id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      setMessage2(data.message || "Upload completed");
      fetchLeads();
    } catch (error) {
      console.error("Error importing leads:", error);
      setMessage2("Error importing leads");
    }
  };

  const openFileDialog = () => {
    document.getElementById("csvUploadInput").click();
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">👥 Leads</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddLeadModal(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:shadow-md"
          >
            + Add Lead
          </button>
          <button
            onClick={() => setShowImportModal(true)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:shadow-md"
          >
            + Import Leads
          </button>

      {/* Message Display */}
      {message && (
        <div className="mt-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded text-sm text-gray-700">
          {message}
        </div>
      )}

        </div>
      </div>

      {message && (
        <p
          className={`mb-4 ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      {loading ? (
        <p>Loading leads...</p>
      ) : contacts.length === 0 ? (
        <p className="text-gray-500">No leads yet.</p>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-orange-50 text-gray-600">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Company</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Source</th>
                <th className="px-4 py-2">Tags</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((lead: any) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{lead.name}</td>
                  <td className="px-4 py-2">{lead.email}</td>
                  <td className="px-4 py-2">{lead.company}</td>
                  <td className="px-4 py-2">{lead.status}</td>
                  <td className="px-4 py-2">{lead.phone}</td>
                  <td className="px-4 py-2">{lead.source}</td>
                  <td className="px-4 py-2">{lead.tags.join(", ")}</td>
                  <td className="px-4 py-2 flex justify-center gap-2">
                <button
    onClick={() => handleEditLead(lead)}
    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
  >
    Edit
  </button>
  <button
     onClick={() => {
      setLeadToDelete(lead.id);
      setShowDeleteModal(true);
    }}
    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
  >
    Delete
  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ➕ Add Lead Modal */}
      {showAddLeadModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Add New Lead</h2>
            <div className="flex flex-col gap-3">
              {["name", "email", "company", "phone", "source", "tags"].map(
                (field) => (
                  <input
                    key={field}
                    type="text"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={newLead[field]}
                    onChange={(e) =>
                      setNewLead((prev) => ({
                        ...prev,
                        [field]: e.target.value,
                      }))
                    }
                    className="px-3 py-2 border rounded w-full"
                  />
                )
              )}
              <select
                value={newLead.status}
                onChange={(e) =>
                  setNewLead((prev) => ({ ...prev, status: e.target.value }))
                }
                className="px-3 py-2 border rounded w-full"
              >
                {["New", "Active", "Engaged", "Converted"].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => setShowAddLeadModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddLead}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Add Lead
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-white rounded-xl p-6 shadow-lg max-w-sm w-full text-center">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Are you sure you want to delete this lead?
      </h2>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setShowDeleteModal(false)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            handleDeleteLead(leadToDelete);
            setShowDeleteModal(false);
          }}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}


      {/* 📥 Import Leads Modal */}
      {showImportModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-white rounded-xl p-6 shadow-lg max-w-md w-full">
      <h2 className="text-lg font-semibold mb-4">📥 Import Leads</h2>
      <p className="text-gray-600 mb-4">You can import leads from:</p>

      {/* Message Display */}
      {message2 && (
        <p
          className={`mb-3 text-sm ${
            message2.includes("Error") ? "text-red-600" : "text-green-600"
          }`}
        >
          {message2}
        </p>
      )}

      <div className="flex flex-col gap-3">
        {/* Upload CSV File */}
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-lg p-4 hover:bg-blue-50 cursor-pointer">
          <span className="text-blue-600 font-medium">
            📄 Upload CSV File
          </span>
          <input
            type="file"
            accept=".csv,.xlsx"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>

        {/* Connect CRM */}
        <button
          onClick={() => alert("CRM Integration Coming Soon!")}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          🔗 Connect CRM (e.g., HubSpot, Salesforce)
        </button>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={() => {setMessage2("");
            setShowImportModal(false)}}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


      {/* ✏️ Edit Lead Modal */}
      {showEditLeadModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Edit Lead</h2>
            <div className="flex flex-col gap-3">
              {["name", "email", "company", "phone", "source", "tags"].map(
                (field) => (
                  <input
                    key={field}
                    type="text"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={editingLead[field]}
                    onChange={(e) =>
                      setEditingLead((prev: any) => ({
                        ...prev,
                        [field]: e.target.value,
                      }))
                    }
                    className="px-3 py-2 border rounded w-full"
                  />
                )
              )}
              <select
                value={editingLead.status}
                onChange={(e) =>
                  setEditingLead((prev: any) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
                className="px-3 py-2 border rounded w-full"
              >
                {["New", "Active", "Engaged", "Converted"].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => setShowEditLeadModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateLead}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Update
                </button>
                 
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
