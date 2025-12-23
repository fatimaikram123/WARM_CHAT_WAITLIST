import React, { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { ChatbaseWidget } from "./components/ChatbaseWidget";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Campaigns from "./components/Campaigns";
import Leads from "./components/Leads";
import Inbox from "./components/Inbox";
import FollowUps from "./components/FollowUps";
import AIWriter from "./components/AIWriter";
import HubSpotIntegration from "./components/HubspotIntegration";
import SalesforceIntegration from "./components/SalesforceIntegration";
import PipedriveIntegration from "./components/PipedriveIntegration";
import CreateFollowUp from "./components/CreateFollowUp";
import CampaignDetails from "./components/CampaignDetails";
import NewCampaign from "./components/NewCampaign";
import NewMessage from "./components/NewMessage";
import Pricing from "./components/Pricing";
import Waitlist from "./components/Waitlist";
import ThreadView from "./components/ThreadView";
import ManageUsers from "./components/ManageUsers";
import OrganizationList from "./pages/OrganizationList";
import CreateOrganization from "./pages/CreateOrganization";
import UnifiedInbox from "./components/UnifiedInbox";
import ConnectAccount from "./components/ConnectAccount";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import { ROLES } from "./constants/roles";
import SessionExpiredModal from "./components/SessionExpiredModal";
import Sidebar from "./components/SideBar";
import LeadThreadPage from "./components/LeadThreadPage";
import SequencesPage from "./components/SequencesPage";
import FeaturesPage from "./pages/Features";
import Help from "./components/Help";
import TemplateManager from "./components/TemplateManager";
import TemplateLibrary from "./components/TemplateLibrary";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ConfirmEmail from "./components/ConfirmEmail";
import Onboarding from "./components/Onboarding";
const queryClient = new QueryClient();

const App: React.FC = () => {
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    const originalFetch = (window as any).fetch;

    (window as any).fetch = async function (url: any, options: any = {}) {
      try {
        const exp = localStorage.getItem("token_exp");
        if (exp && Date.now() >= Number(exp)) {
          setSessionExpired(true);
          return Promise.reject(new Error("Token expired"));
        }

        const token = localStorage.getItem("token");
        const headers = {
          ...(options.headers || {}),
          Authorization: token ? `Bearer ${token}` : "",
        };

        const response = await originalFetch(url, {
          ...options,
          headers,
        });

        if (response && response.status === 401) {
          setSessionExpired(true);
        }

        return response;
      } catch (err) {
        throw err;
      }
    };

    return () => {
      (window as any).fetch = originalFetch;
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Global toasters */}
        <Toaster />
        <Sonner />

        {/* Optional analytics / widgets */}
        <Analytics />
        <ChatbaseWidget />

        {/* Session expired modal */}
        <SessionExpiredModal
          open={sessionExpired}
          onConfirm={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        />

        {/* NOTE: Do NOT render a Router here. Wrap <App /> with <BrowserRouter> in index.tsx */}
        <Routes>
          {/* Public */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/waitlist" element={<Waitlist />} />
          <Route path="/features" element={<FeaturesPage />} />
         <Route path="/sequences" element={<SequencesPage />} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
         <Route path="/reset-password" element={<ResetPassword />} />
         <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route path="/connect-email" element={<ConnectAccount />} />

          {/* Sidebar (unprotected route render) */}
          <Route path="/sidebar" element={<Sidebar />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <RoleProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.AGENT, ROLES.GUEST]}>
                <Dashboard />
              </RoleProtectedRoute>
            }
          />
           <Route
            path="/onboarding"
            element={
              <RoleProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.AGENT,ROLES.GUEST]}>
                <Onboarding />
              </RoleProtectedRoute>
            }
          />
          
          <Route
            path="/help"
            element={
              <RoleProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.AGENT,ROLES.GUEST]}>
                <Help />
              </RoleProtectedRoute>
            }
          />
            <Route
            path="/manage/templates"
            element={
              <RoleProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.AGENT,ROLES.GUEST]}>
                <TemplateManager />
              </RoleProtectedRoute>
            }
          />
           <Route
            path="/view/templates"
            element={
              <RoleProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.AGENT,ROLES.GUEST]}>
                <TemplateLibrary />
              </RoleProtectedRoute>
            }
          />
          
          


         <Route
            path="/leads"
            element={
              <RoleProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.AGENT]}>
                <Leads />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/campaigns"
            element={
              <RoleProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.AGENT, ROLES.GUEST]}>
                <Campaigns />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/campaigns/new"
            element={
              <RoleProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.AGENT, ROLES.GUEST]}>
                <NewCampaign />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/campaigns/:id"
            element={
              <RoleProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.AGENT, ROLES.GUEST]}>
                <CampaignDetails />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/inbox"
            element={
              <RoleProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.AGENT]}>
                <Inbox />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/inbox/new"
            element={
              <RoleProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.AGENT]}>
                <NewMessage />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/inbox/thread/:thread_id"
            element={
              <RoleProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.AGENT, ROLES.GUEST]}>
                <ThreadView />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/followups"
            element={
              <RoleProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.AGENT]}>
                <FollowUps />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/ai-writer"
            element={
              <RoleProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.AGENT,ROLES.GUEST]}>
                <AIWriter />
              </RoleProtectedRoute>
            }
          />

          {/* Integrations */}
          <Route
            path="/integrations/hubspot"
            element={
              <RoleProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]}>
                <HubSpotIntegration />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/integrations/salesforce"
            element={
              <RoleProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]}>
                <SalesforceIntegration />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/integrations/pipedrive"
            element={
              <RoleProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]}>
                <PipedriveIntegration />
              </RoleProtectedRoute>
            }
          />

          {/* Admin-only */}
          <Route
            path="/manage/users"
            element={
              <RoleProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                <ManageUsers />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/organizations"
            element={
              <RoleProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]}>
                <OrganizationList />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/organizations/create"
            element={
              <RoleProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                <CreateOrganization />
              </RoleProtectedRoute>
            }
          />

          {/* Other */}
          <Route
            path="/unified-inbox"
            element={
              <RoleProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.AGENT]}>
                <UnifiedInbox />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/create-followup"
            element={
              <RoleProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.AGENT,ROLES.GUEST]}>
                <CreateFollowUp />
              </RoleProtectedRoute>
            }
          />
            <Route
            path="/thread/leads"
            element={
              <RoleProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.AGENT]}>
                <LeadThreadPage />
              </RoleProtectedRoute>
            }
          />
              <Route
            path="/manage/templates"
            element={
              <RoleProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.AGENT]}>
                <TemplateManager />
              </RoleProtectedRoute>
            }
          />

           

           

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;