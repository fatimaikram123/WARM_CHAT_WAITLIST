import React, { useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import {ROLES} from "../constants/roles"

export default function Sidebar({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();

  // ✅ Get role_id from localStorage (default to guest if missing)
  const roleId = parseInt(localStorage.getItem("role_id"), 10);
  const role =
    roleId === 2
      ? ROLES.ADMIN
      : roleId === 4
      ? ROLES.MANAGER
      : roleId === 3
      ? ROLES.AGENT
      : ROLES.GUEST;

  // Auto-close sidebar on mobile
  useEffect(() => {
    if (window.innerWidth < 1024 && isOpen) toggleSidebar();
    // eslint-disable-next-line
  }, []);

  const activeLink =
    "text-orange-600 font-semibold bg-orange-50 rounded-lg px-3 py-2 block text-base";
  const normalLink =
    "hover:text-orange-500 hover:bg-orange-50 rounded-lg px-3 py-2 block text-base transition";

  // ✅ Logout clearing updated localStorage
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("name");
    localStorage.removeItem("role_id");
    localStorage.removeItem("role_name");
    localStorage.removeItem("org_id");
    localStorage.removeItem("gmail_user_name");
    localStorage.removeItem("gmail_email_id");
    localStorage.removeItem("email");
    localStorage.removeItem("org_name");
    localStorage.removeItem("session")


    navigate("/login");
  };

  // 🔹 Helpers for role-based visibility
  const canView = (allowedRoles) => allowedRoles.includes(role);

  return (
    <>
      {/* Hamburger Button (mobile only) */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white border border-gray-200 rounded-md p-2 shadow-md"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-orange-500" />
        ) : (
          <Menu className="w-6 h-6 text-orange-500" />
        )}
      </button>

      {/* Background Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 z-40 flex flex-col border-r border-gray-200 shadow-lg transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          bg-white lg:bg-gradient-to-b lg:from-white lg:to-orange-50/30
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-center py-8 border-b border-gray-200">
          <span className="text-3xl font-extrabold text-orange-500 tracking-tight">
            WarmChats
          </span>
        </div>

        {/* Navigation */}
        <ul className="flex flex-col flex-grow p-6 space-y-6 text-gray-800 font-medium overflow-y-auto">
          {/* === FEATURES === */}
          <li>
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-lg font-semibold text-gray-700">
                Features
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
            <ul className="ml-3 space-y-2 border-l-2 border-orange-100 pl-3">
              {/* All users including guests can view Dashboard */}
              {canView([
                ROLES.ADMIN,
                ROLES.MANAGER,
                ROLES.AGENT,
                ROLES.GUEST,
              ]) && (
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    📊 Dashboard
                  </NavLink>
                </li>
              )}

              {/* Non-guests */}
              {canView([ROLES.ADMIN, ROLES.MANAGER, ROLES.AGENT]) && (
                <>
                  <li>
                    <NavLink
                      to="/campaigns"
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                    >
                      📢 Multichannel Campaigns
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/followups"
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                    >
                      🔁 Smart Follow-Ups
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/ai-writer"
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                    >
                      🧠 AI Message Writer
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/inbox"
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                    >
                      📬 Unified Inbox
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/leads"
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                    >
                      👥 Lead Management
                    </NavLink>
                  </li>
                </>
              )}

              {/* Guest rights — view-only screens */}
              {canView([ROLES.GUEST]) && (
                <>
                  <li>
                    <NavLink
                      to="/waitlist"
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                    >
                      🚀 Join Waitlist
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/help"
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                    >
                      💬 Help Center
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </li>

          {/* === INTEGRATIONS === */}
          {canView([ROLES.ADMIN, ROLES.MANAGER]) && (
            <li>
              <div className="flex items-center justify-between px-2 mb-2">
                <span className="text-lg font-semibold text-gray-700">
                  Integrations
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
              <ul className="ml-3 space-y-2 border-l-2 border-orange-100 pl-3">
                <li>
                  <NavLink
                    to="/integrations/hubspot"
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    🔗 HubSpot
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/integrations/salesforce"
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    💼 Salesforce
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/integrations/pipedrive"
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    📈 Pipedrive
                  </NavLink>
                </li>
              </ul>
            </li>
          )}

          {/* === ADMIN SECTIONS === */}
          {canView([ROLES.ADMIN]) && (
            <>
              <li>
                <div className="flex items-center justify-between px-2 mb-2">
                  <span className="text-lg font-semibold text-gray-700">
                    Manage Users
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>
                <ul className="ml-3 space-y-2 border-l-2 border-orange-100 pl-3">
                  <li>
                    <NavLink
                      to="/manage/users"
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                    >
                      👥 Update Users
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li>
                <div className="flex items-center justify-between px-2 mb-2">
                  <span className="text-lg font-semibold text-gray-700">
                    Manage Organization
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>
                <ul className="ml-3 space-y-2 border-l-2 border-orange-100 pl-3">
                  <li>
                    <NavLink
                      to="/organizations"
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                    >
                      🏢 Organization
                    </NavLink>
                  </li>
                </ul>
              </li>
            </>
          )}
        </ul>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 border border-orange-400 text-orange-500 font-semibold rounded-lg hover:bg-orange-500 hover:text-white transition text-base"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
