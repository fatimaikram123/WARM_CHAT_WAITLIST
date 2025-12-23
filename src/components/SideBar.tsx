import React, { useEffect } from "react";
import {
  ChevronDown,
  Menu,
  X,
  LayoutDashboard,
  Repeat,
  Megaphone,
  Inbox,
  Users,
  Sparkles,
  Link,
  Briefcase,
  TrendingUp,
  Rocket,
  HelpCircle,
  Building2,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { ROLES } from "../constants/roles";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();

  const roleId = parseInt(localStorage.getItem("role_id"), 10);
  const role =
    roleId === 2
      ? ROLES.ADMIN
      : roleId === 4
      ? ROLES.MANAGER
      : roleId === 3
      ? ROLES.AGENT
      : ROLES.GUEST;

  useEffect(() => {
    if (window.innerWidth < 1024 && isOpen) toggleSidebar();
    // eslint-disable-next-line
  }, []);

  const canView = (allowedRoles) => allowedRoles.includes(role);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white border rounded-md p-2 shadow"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 w-72 bg-white border-r shadow-lg
        transform transition-transform lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        flex flex-col h-screen`}
      >
        {/* Logo */}
        <div className="py-8 text-center border-b shrink-0">
          <span className="text-3xl font-extrabold text-orange-500">
            WarmChats
          </span>
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">

          {/* Dashboard */}
          <Section title="Dashboard">
            <NavItem to="/dashboard" icon={LayoutDashboard} text="Dashboard" />
          </Section>

          {/* Outreach */}
          <Section title="Outreach">
            <NavItem to="/campaigns" icon={Megaphone} text="Campaigns" />
            <NavItem
              to="/sequences"
              icon={Repeat}
              text="Smart Follow-Ups"
            />
          </Section>

          {/* Inbox */}
          <Section title="Inbox">
            <NavItem to="/inbox" icon={Inbox} text="Unified Inbox" />
          </Section>

          {/* Leads */}
          <Section title="Leads">
            <NavItem to="/leads" icon={Users} text="Lead Management" />
          </Section>

          {/* Messages */}
          <Section title="Messages">
            <NavItem
              to="/ai-writer"
              icon={Sparkles}
              text="AI Message Generator"
            />
            <NavItem
              to="/manage/templates"
              icon={Sparkles}
              text="Message Templates"
            />
            <NavItem
              to="/view/templates"
              icon={Sparkles}
              text="Templates Library"
            />
          </Section>

          {/* Integrations */}
          {canView([ROLES.ADMIN, ROLES.MANAGER]) && (
            <Section title="Integrations">
              <NavItem to="/integrations/hubspot" icon={Link} text="HubSpot" />
              <NavItem
                to="/integrations/salesforce"
                icon={Briefcase}
                text="Salesforce"
              />
              <NavItem
                to="/integrations/pipedrive"
                icon={TrendingUp}
                text="Pipedrive"
              />
            </Section>
          )}

          {/* Admin */}
          {canView([ROLES.ADMIN]) && (
            <Section title="Admin">
              <NavItem
                to="/organizations"
                icon={Building2}
                text="Organization"
              />
               <NavItem
                to="/manage/users"
                icon={Building2}
                text="Manage Users"
              />
            </Section>
            
           
          )}

          {/* Guest */}
          {canView([ROLES.GUEST]) && (
            <Section title="Support">
              <NavItem to="/waitlist" icon={Rocket} text="Join Waitlist" />
              <NavItem to="/help" icon={HelpCircle} text="Help Center" />
            </Section>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t shrink-0">
          <button
            onClick={handleLogout}
            className="w-full border border-orange-400 text-orange-500 font-semibold rounded-lg py-2 hover:bg-orange-500 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

/* ---------- Helpers ---------- */

const Section = ({ title, children }) => (
  <div>
    <div className="flex items-center justify-between mb-3 text-xs uppercase tracking-wide text-gray-500 font-semibold">
      <span>{title}</span>
      <ChevronDown className="w-4 h-4 opacity-60" />
    </div>
    <ul className="ml-3 border-l-2 border-orange-100 pl-3 space-y-2">
      {children}
    </ul>
  </div>
);

const NavItem = ({ to, icon: Icon, text }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      isActive
        ? "flex items-center gap-3 text-orange-600 font-semibold bg-orange-50 rounded-lg px-3 py-2"
        : "flex items-center gap-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg px-3 py-2 transition"
    }
  >
    <Icon className="w-5 h-5" />
    <span>{text}</span>
  </NavLink>
);
