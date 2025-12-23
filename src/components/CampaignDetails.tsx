import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../components/MainLayout";

const API_BASE = import.meta.env.VITE_API_BASE;

interface Campaign {
  id: number;
  name: string;
  channels: string[];
  message: string;
  sources: string[];
  leads: any[];
  created_at: string;
}

const CampaignDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!id || !token) return;

    const fetchCampaign = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/campaigns/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setCampaign(data);
      } catch (err) {
        console.error("Error fetching campaign:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id, token]);

  if (loading) return <MainLayout><p className="p-8 text-gray-500">Loading...</p></MainLayout>;

  if (!campaign) return <MainLayout><p className="p-8 text-red-500">Campaign not found.</p></MainLayout>;

  return (
    <MainLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">📈 {campaign.name}</h1>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="text-sm text-gray-700 mb-2">
            <strong>Channels:</strong> {campaign.channels.join(", ")}
          </div>
          <div className="text-sm text-gray-700 mb-2">
            <strong>Sources:</strong> {campaign.sources.join(", ")}
          </div>
          <div className="text-sm text-gray-700 mb-2">
            <strong>Leads:</strong> {campaign.leads.length}
          </div>
          <div className="text-sm text-gray-700 mb-2">
            <strong>Created At:</strong> {new Date(campaign.created_at).toLocaleString()}
          </div>
          <div className="text-sm text-gray-700 mb-2">
            <strong>Message:</strong>
            <div className="mt-1 p-2 bg-gray-50 rounded">{campaign.message}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="font-semibold text-gray-800">Leads</div>
            <div>{campaign.leads.length}</div>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="font-semibold text-gray-800">Channels</div>
            <div>{campaign.channels.join(", ")}</div>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="font-semibold text-gray-800">Sources</div>
            <div>{campaign.sources.join(", ")}</div>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="font-semibold text-gray-800">Status</div>
            <div>Running</div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CampaignDetails;
