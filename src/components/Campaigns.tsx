import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../components/MainLayout";
import { useNavigate } from "react-router-dom";
import { Play, Pause, CheckCircle, ChevronDown } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE;

interface Campaign {
  id: number;
  name: string;
  channels: string[];
  message: string;
  sources: string[];
  leads: any[];
  created_at: string;
  replies: number;
  messages_sent_30d: number;
  status: "Running" | "Paused" | "Completed";
}

export default function Campaigns() {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  const orgId = localStorage.getItem("org_id");
  const token = localStorage.getItem("token");

  /* ---------------- CLOSE DROPDOWN ON OUTSIDE CLICK ---------------- */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    if (!orgId || !token) return;

    const fetchCampaigns = async () => {
      try {
        const res = await fetch(`${API_BASE}/campaigns/org/${orgId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setCampaigns(data);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [orgId, token]);

  /* ---------------- FILTER & SORT ---------------- */
  const filteredCampaigns = campaigns.filter((c) =>
    filterStatus ? c.status === filterStatus : true
  );

  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    if (sortKey === "replies") return b.replies - a.replies;
    if (sortKey === "messages_sent")
      return b.messages_sent_30d - a.messages_sent_30d;
    return 0;
  });

  /* ---------------- STATS ---------------- */
  const totalMessages = campaigns.reduce(
    (acc, c) => acc + (c.messages_sent_30d || 0),
    0
  );
  const totalReplies = campaigns.reduce(
    (acc, c) => acc + (c.replies || 0),
    0
  );
  const replyRate =
    totalMessages > 0
      ? ((totalReplies / totalMessages) * 100).toFixed(1)
      : "0";

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">📢 Campaigns</h1>

        {/* NEW CAMPAIGN DROPDOWN */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpenDropdown((v) => !v)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition"
          >
            + New Campaign
            <ChevronDown size={16} />
          </button>

          {openDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-50">
              <DropdownItem
                label="➕ New Campaign"
                onClick={() => navigate("/campaigns/new")}
              />
              <DropdownItem
                label="📄 From Template"
                onClick={() => navigate("/campaigns/templates")}
              />
              <DropdownItem
                label="⭐ Duplicate Best Campaign"
                onClick={() => alert("Duplicate best campaign")}
              />
            </div>
          )}
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Stat title="Active Campaigns" value={campaigns.length} />
        <Stat title="Messages Sent (30d)" value={totalMessages} />
        <Stat title="Replies" value={totalReplies} />
        <Stat title="Reply Rate" value={`${replyRate}%`} />
      </div>

      {/* FILTERS */}
      <div className="flex gap-4 mb-4">
        <select
          className="border rounded px-3 py-1"
          value={filterStatus || ""}
          onChange={(e) => setFilterStatus(e.target.value || null)}
        >
          <option value="">All Status</option>
          <option value="Running">Running</option>
          <option value="Paused">Paused</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          className="border rounded px-3 py-1"
          value={sortKey || ""}
          onChange={(e) => setSortKey(e.target.value || null)}
        >
          <option value="">Sort by</option>
          <option value="replies">Replies</option>
          <option value="messages_sent">Messages Sent (30d)</option>
        </select>
      </div>

      {/* TABLE */}
      {loading ? (
        <p className="text-gray-500">Loading campaigns...</p>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-orange-50 text-gray-600 text-sm">
              <tr>
                <th className="text-left px-5 py-3">Campaign</th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="text-left px-5 py-3">Replies</th>
                <th className="text-left px-5 py-3">
                  Messages Sent (30d)
                </th>
                <th className="text-left px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedCampaigns.map((c) => (
                <tr key={c.id} className="group hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium">{c.name}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-5 py-3">{c.replies}</td>
                  <td className="px-5 py-3">{c.messages_sent_30d}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-4">
                      <ActionButton
                        label="▶ / ⏸"
                        color="text-green-600"
                        onClick={() => alert("Resume / Pause")}
                      />
                      <ActionButton
                        label="📊 View"
                        color="text-purple-600"
                        onClick={() => navigate(`/campaigns/${c.id}`)}
                      />
                      <ActionButton
                        label="📋 Duplicate"
                        color="text-gray-600"
                        onClick={() => alert("Duplicate")}
                      />
                    </div>
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

/* ---------------- COMPONENTS ---------------- */

function DropdownItem({ label, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-2 hover:bg-orange-50 text-sm"
    >
      {label}
    </button>
  );
}

function Stat({ title, value }: any) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg text-center">
      <div className="text-xs text-gray-500">{title}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}

function StatusBadge({ status }: any) {
  const styles =
    status === "Running"
      ? "bg-green-100 text-green-600"
      : status === "Paused"
      ? "bg-yellow-100 text-yellow-600"
      : "bg-gray-100 text-gray-600";

  return (
    <span className={`px-3 py-1 text-xs rounded-full ${styles}`}>
      {status}
    </span>
  );
}

function ActionButton({ label, color, onClick }: any) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`font-medium ${color} hover:underline`}
    >
      {label}
    </button>
  );
}
