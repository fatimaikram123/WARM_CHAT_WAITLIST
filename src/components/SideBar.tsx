import React from "react";
import { ChevronDown } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const activeLink =
    "text-orange-600 font-semibold bg-orange-50 rounded-lg px-3 py-2 block text-base";
  const normalLink =
    "hover:text-orange-500 hover:bg-orange-50 rounded-lg px-3 py-2 block text-base transition";

  return (
    <aside className="fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-white to-orange-50/30 border-r border-gray-200 shadow-lg z-40 flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center py-8 border-b border-gray-200">
        <span className="text-3xl font-extrabold text-orange-500 tracking-tight">
          WarmChats
        </span>
      </div>

      {/* Navigation */}
      <ul className="flex flex-col flex-grow p-6 space-y-6 text-gray-800 font-medium overflow-y-auto">
        {/* Features Section */}
        <li>
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-lg font-semibold text-gray-700">
              Features
            </span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
          <ul className="ml-3 space-y-2 border-l-2 border-orange-100 pl-3">
            <li>
              <NavLink to="/campaigns" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                📢 Multichannel Campaigns
              </NavLink>
            </li>
            <li>
              <NavLink to="/followups" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                🔁 Smart Follow-Ups
              </NavLink>
            </li>
            <li>
              <NavLink to="/ai-writer" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                🧠 AI Message Writer
              </NavLink>
            </li>
            <li>
              <NavLink to="/inbox" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                📬 Unified Inbox
              </NavLink>
            </li>
            <li>
              <NavLink to="/leads" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                👥 Lead Management
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                📊 Dashboard
              </NavLink>
                   <NavLink to="/waitlist" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                🚀 Wait List
              </NavLink>
            </li>
          </ul>
        </li>

        {/* Integrations */}
        <li>
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-lg font-semibold text-gray-700">
              Integrations
            </span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
          <ul className="ml-3 space-y-2 border-l-2 border-orange-100 pl-3">
            <li>
              <NavLink to="/integrations/hubspot" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                🔗 HubSpot
              </NavLink>
            </li>
            <li>
              <NavLink to="/integrations/salesforce" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                💼 Salesforce
              </NavLink>
            </li>
            <li>
              <NavLink to="/integrations/pipedrive" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                📈 Pipedrive
              </NavLink>
            </li>
          </ul>
        </li>

        {/* Pricing */}
        <li
          onClick={() => navigate("/pricing")}
          className="px-3 py-3 text-lg font-semibold rounded-lg hover:bg-orange-50 hover:text-orange-600 cursor-pointer transition"
        >
          💰 Pricing
        </li>
      </ul>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200">
        <button
          onClick={() => navigate("/login")}
          className="w-full px-4 py-2 border border-orange-400 text-orange-500 font-semibold rounded-lg hover:bg-orange-500 hover:text-white transition text-base"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
