import React from "react";
import MainLayout from "../components/MainLayout";
import Topbar from "../components/Topbar";
import StatsCard from "../components/StatsCard";
import CampaignList from "../components/CampaignList";
import { useCRM } from "../context/CRMContext";

const Dashboard: React.FC = () => {
  const { contacts, deals, connectedCRMs } = useCRM();
    const totalContacts = contacts?.length ?? 0;
  const totalDeals = deals?.length ?? 0;


  // Derived live stats
  const activeProspects = contacts.length || 5000;
  const totalDealValue = (deals ?? []).reduce((sum, d) => sum + (d.value || 0), 0);
  const crmCount = connectedCRMs.length??0;

  return (
    <MainLayout>
      <Topbar />

      <main className="p-6 lg:p-8 space-y-8 bg-gray-50 min-h-screen">
        {/* Overview Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Account Overview
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Active Prospects"
              value={activeProspects.toLocaleString()}
              change="100%"
              subtitle="of plan limit"
            />
            <StatsCard
              title="Storage Used"
              value={`${contacts.length}/20k`}
              change={`${((contacts.length / 20000) * 100).toFixed(1)}%`}
              subtitle="Prospect records stored"
            />
            <StatsCard
              title="Connected CRMs"
              value={crmCount}
              change={`${crmCount > 0 ? "Synced" : "None"}`}
              subtitle="HubSpot / Salesforce / Pipedrive"
            />
            <StatsCard
              title="Total Deal Value"
              value={`$${totalDealValue.toLocaleString()}`}
              change={`${totalDeals} Deals`}
              subtitle="Synced from CRM"
            />
          </div>
        </section>

        {/* Performance + AI Automation */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Performance Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Performance Dashboard
                </h3>
                <p className="text-sm text-gray-500">
                  Campaign engagement & activity trends
                </p>
              </div>
              <div className="text-sm text-gray-500">Last 30 days</div>
            </div>

            {/* Chart */}
            <div className="w-full h-44 flex items-center">
              <svg viewBox="0 0 300 80" className="w-full h-full">
                <defs>
                  <linearGradient id="grad" x1="0" x2="1">
                    <stop offset="0%" stopColor="#FF7A3D" />
                    <stop offset="100%" stopColor="#FFB57E" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 60 C30 40 60 30 90 25 C120 20 150 30 180 20 C210 10 240 25 270 20 L300 20 L300 80 L0 80 Z"
                  fill="url(#grad)"
                  opacity="0.15"
                />
                <path
                  d="M0 60 C30 40 60 30 90 25 C120 20 150 30 180 20 C210 10 240 25 270 20 L300 20"
                  stroke="#FF7A3D"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Legend */}
            <div className="mt-4 flex gap-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="w-3 h-3 rounded-full" style={{ background: "#FF7A3D" }}></span>
                Opens
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-3 h-3 rounded-full" style={{ background: "#7C5CE6" }}></span>
                Replies
              </div>
            </div>
          </div>

          {/* AI & Automation Summary */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              AI & Automation Summary
            </h3>

            <ul className="space-y-4 text-sm text-gray-700">
              <li className="flex items-center justify-between">
                <span>AI Message Rewrites</span>
                <span className="font-semibold text-gray-900">124</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Triggered Follow-Ups</span>
                <span className="font-semibold text-gray-900">320</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Smart Lead Scoring (WarmScore™)</span>
                <span className="font-semibold text-gray-900">87 Avg</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Chatbot Responses</span>
                <span className="font-semibold text-gray-900">58</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Automation Rules</span>
                <span className="font-semibold text-gray-900">12 Active</span>
              </li>
            </ul>

            <div className="mt-6">
              <button className="w-full py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium shadow-sm hover:shadow-md transition">
                Manage Automations
              </button>
            </div>
          </div>
        </section>

        {/* Campaigns + Quick Actions */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Campaigns */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Active Campaigns
            </h3>
            <CampaignList />
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Actions
            </h3>
            <div className="flex flex-col gap-3">
              <button className="w-full py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium shadow-sm hover:shadow-md">
                Create Campaign
              </button>
              <button className="w-full py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
                Import Leads
              </button>
              <button className="w-full py-2 rounded-lg bg-white text-gray-700 border border-gray-200 hover:shadow-sm">
                Connect CRM
              </button>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default Dashboard;
