import MainLayout from "@/components/MainLayout";
import React, { useState } from "react";

const CreateOrganization: React.FC = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const token = localStorage.getItem("token");
  const API_BASE = import.meta.env.VITE_API_BASE;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const res = await fetch(`${API_BASE}/api/orgs/addorg`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(`✅ Organization "${name}" created successfully!`);
        setName("");
      } else {
        setSuccess(`❌ Error: ${data.message || "Failed to create org"}`);
      }
    } catch (err) {
      console.error(err);
      setSuccess("❌ Failed to create organization");
    } finally {
      setLoading(false);
    }
  };
  return (
    <MainLayout> 
    <div className="p-6 min-h-screen bg-gradient-to-br ">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Organization 🏢</h2>

        <form onSubmit={handleCreate} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter organization name"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition"
          >
            {loading ? "Creating..." : "Create Organization"}
          </button>
        </form>

        {success && (
          <p className="mt-4 text-center text-sm text-gray-700">{success}</p>
        )}
      </div>
    </div>
    </MainLayout>
  );
};


export default CreateOrganization;
