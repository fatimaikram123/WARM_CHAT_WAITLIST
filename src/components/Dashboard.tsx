import React from "react";
import MainLayout from "../components/MainLayout";
import Topbar from "../components/Topbar";
import StatsCard from "../components/StatsCard";
import { useCRM } from "../context/CRMContext";

const Dashboard: React.FC = () => {
  const { contacts, deals, connectedCRMs } = useCRM();

  // Top Row Metrics
  const activeConversations = 16;
  const hotLeads = 5;
  const appointmentsBooked = 3;
  const estimatedCommission = 24000;

  // AI & Automation Metrics
  const messagesWritten = 124;
  const followUpsSent = 320;
  const leadsAnswered = 58;
  const avgResponseTime = "< 60 sec";

  // Today's Focus
  const pendingLeads = 3;

  // Active Follow-Ups with Commission Potential
  const activeFollowUps = [
    {
      type: "Open House",
      address: "123 Main St",
      replies: 18,
      hotLeads: 4,
      appointments: 2,
      estCommission: 12500,
    },
    {
      type: "Buyer",
      address: "456 Oak Ave",
      replies: 12,
      hotLeads: 3,
      appointments: 1,
      estCommission: 9800,
    },
    {
      type: "Seller",
      address: "789 Pine Rd",
      replies: 9,
      hotLeads: 2,
      appointments: 1,
      estCommission: 15200,
    },
  ];

  return (
    <MainLayout>
      <Topbar />

      <main className="p-6 lg:p-8 space-y-8 bg-gray-50 min-h-screen">
        {/* Top Row Metrics */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Dashboard Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="💬 Active Conversations"
              value={<span className="font-bold">{activeConversations}</span>}
              subtitle="people texting back"
            />
            <StatsCard
              title="🔥 Hot Leads (WarmScore™ 70+)"
              value={<span className="font-bold">{hotLeads}</span>}
              subtitle="ready-to-talk buyers/sellers"
            />
            <StatsCard
              title="📅 Appointments Booked (Last 30 Days)"
              value={<span className="font-bold">{appointmentsBooked}</span>}
              subtitle="showings / calls set"
            />
            <StatsCard
              title="💰 Estimated Commission Pipeline"
              value={
                <span className="font-bold text-green-600">
                  ${estimatedCommission.toLocaleString()}
                </span>
              }
              subtitle="potential GCI"
            />
          </div>
        </section>

        {/* Performance + AI */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Performance Dashboard
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Conversations → Appointments → Deals
            </p>

            <div className="w-full h-44 flex items-center">
              <svg viewBox="0 0 300 80" className="w-full h-full">
                <defs>
                  <linearGradient id="grad" x1="0" x2="1">
                    <stop offset="0%" stopColor="#FF7A3D" />
                    <stop offset="100%" stopColor="#FFB57E" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 60 C30 40 60 30 90 25 C120 20 150 30 180 20 C210 10 240 25 270 20 L300 20"
                  stroke="#FF7A3D"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4 text-sm font-medium">
              <div>📩 Messages Sent</div>
              <div>💬 Conversations Started</div>
              <div>🔥 Hot Leads Created</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">
              AI & Automation Value
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between">
                <span>✍️ Messages Written</span>
                <span className="font-semibold">{messagesWritten}</span>
              </li>
              <li className="flex justify-between">
                <span>🔁 Follow-Ups Sent</span>
                <span className="font-semibold">{followUpsSent}</span>
              </li>
              <li className="flex justify-between">
                <span>🤖 Leads Answered</span>
                <span className="font-semibold">{leadsAnswered}</span>
              </li>
              <li className="flex justify-between">
                <span>⚡ Avg Response</span>
                <span className="font-semibold">{avgResponseTime}</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Active Follow-Ups */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-5">
            <h3 className="text-lg font-semibold mb-4">
              Active Follow-Ups
            </h3>

            <table className="w-full text-sm text-gray-700">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left">Campaign</th>
                  <th>Replies</th>
                  <th>Hot Leads</th>
                  <th>Appointments</th>
                </tr>
              </thead>
              <tbody>
                {activeFollowUps.map((c, idx) => (
                  <tr key={idx} className="border-b last:border-0">
                    <td className="py-3">
                      <div className="font-medium">
                        {c.type} – {c.address}
                      </div>
                      <div className="text-sm text-green-600 font-semibold">
                        💰 Est. Commission Potential: $
                        {c.estCommission.toLocaleString()}
                      </div>
                    </td>
                    <td>{c.replies}</td>
                    <td>{c.hotLeads}</td>
                    <td>{c.appointments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-red-500">
              <h3 className="font-semibold mb-2">⚠️ Needs Attention</h3>
              <p className="text-sm text-gray-600 mb-4">
                3 leads haven’t been followed up in 48 hours
              </p>
              <button className="w-full py-2 rounded-lg bg-orange-500 text-white font-semibold mb-2">
                Text Now
              </button>
              <button className="w-full py-2 rounded-lg border">
                Call Now
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-semibold mb-2">🚀 Popular Follow-Ups</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  Buyer Lead
                  <button className="text-orange-500 font-medium">Start</button>
                </li>
                <li className="flex justify-between">
                  Open House Visitor
                  <button className="text-orange-500 font-medium">Start</button>
                </li>
                <li className="flex justify-between">
                  Seller Lead
                  <button className="text-orange-500 font-medium">Start</button>
                </li>
                <li className="flex justify-between">
                  Old Leads Revival
                  <button className="text-orange-500 font-medium">Start</button>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default Dashboard;
