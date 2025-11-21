import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import MainLayout from "./MainLayout";

interface ThreadLead {
  thread_id: number;
  subject: string;
  lead_id: number;
  lead_name: string;
  lead_email: string;
  created_at: string;
}

const LeadThreadPage: React.FC = () => {
  const [data, setData] = useState<ThreadLead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = import.meta.env.VITE_API_BASE;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/inbox/thread/leads`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch threads");
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, []);

  if (loading) return <p>Loading threads...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <MainLayout>
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">📩 Lead Threads</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-orange-50 text-gray-600">
              <tr>
                <th className="px-4 py-2">Thread ID</th>
                <th className="px-4 py-2">Subject</th>
                <th className="px-4 py-2">Lead Name</th>
                <th className="px-4 py-2">Lead Email</th>
                <th className="px-4 py-2">Created At</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item.thread_id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{item.thread_id}</td>
                  <td className="px-4 py-2">{item.subject}</td>
                  <td className="px-4 py-2">{item.lead_name}</td>
                  <td className="px-4 py-2">{item.lead_email}</td>
                  <td className="px-4 py-2">
                    {format(new Date(item.created_at), "yyyy-MM-dd HH:mm")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default LeadThreadPage;
