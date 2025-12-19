import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import MainLayout from "./MainLayout";

interface Lead {
  id: number;
  name: string;
  email: string;
}

interface ThreadGroup {
  thread_id: number;
  thread_subject: string;
  created_at: string;
  leads: {
    lead_id: number;
    lead_name: string;
    lead_email: string;
  }[];
}

const LeadThreadPage: React.FC = () => {
  const [threads, setThreads] = useState<ThreadGroup[]>([]);
  const [allLeads, setAllLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = import.meta.env.VITE_API_BASE;
  const org_id = localStorage.getItem("org_id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const threadsRes = await fetch(`${API_BASE}/inbox/thread/leads`, {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        });

        const leadsRes = await fetch(`${API_BASE}/leads/${org_id}`, {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        });

        if (!threadsRes.ok || !leadsRes.ok) throw new Error("Failed to fetch data");

        const threadsJson = await threadsRes.json();
        const leadsJson = await leadsRes.json();

        setThreads(threadsJson);
        setAllLeads(leadsJson);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <MainLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">📩 Lead Threads</h1>

        {/* Loading / Error / Threads */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white shadow-sm rounded-xl p-5 border border-gray-200 animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-10 bg-gray-200 rounded w-full"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : threads.length === 0 ? (
          <p className="text-gray-500">No threads found.</p>
        ) : (
          <div className="space-y-6">
            {threads.map((thread) => {
              const assignedLeadIds = new Set(thread.leads.map((l) => l.lead_id));

              return (
                <div
                  key={thread.thread_id}
                  className="bg-white shadow-sm rounded-xl p-5 border border-gray-200"
                >
                  {/* Thread Header */}
                  <div className="pb-3 mb-4 border-b">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Thread #{thread.thread_id}: {thread.thread_subject}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Created: {format(new Date(thread.created_at), "yyyy-MM-dd HH:mm")}
                    </p>
                  </div>

                  {/* Leads Section */}
                  <h3 className="font-semibold text-gray-700 mb-3">
                    Select Leads for this Thread
                  </h3>

                  <div className="space-y-2">
                    {allLeads.map((lead) => (
                      <label
                        key={lead.id}
                        className="flex items-center gap-3 p-2 border rounded-lg hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          checked={assignedLeadIds.has(lead.id)}
                          readOnly
                          className="w-4 h-4"
                        />
                        <div>
                          <p className="font-medium text-gray-800">{lead.name}</p>
                          <p className="text-sm text-gray-500">{lead.email}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default LeadThreadPage;
