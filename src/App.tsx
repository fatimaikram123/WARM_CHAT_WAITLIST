import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import { ChatbaseWidget } from "./components/ChatbaseWidget";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Sidebar from "./components/SideBar";
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
import ThreadPage from "./components/ThreadPage";
import ManageUsers from "./components/ManageUsers";
import OrganizationList from "./pages/OrganizationList";
import CreateOrganization from "./pages/CreateOrganization";
import UnifiedInbox from "./components/UnifiedInbox";
import ConnectAccount from "./components/connectAccount";
import ThreadView from './components/ThreadView';
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import { ROLES } from "./constants/roles";
const queryClient = new QueryClient();

const App = () => (

  
        <Routes>
          <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
             <Route path="/login" element={<Login />} />
               <Route path="/signup" element={<Signup />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
         
       
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/dashboard" element={
<RoleProtectedRoute allowedRoles={[ROLES.ADMIN,ROLES.AGENT,ROLES.MANAGER]}>
    <Dashboard />
    </RoleProtectedRoute>
} 
/>
<Route path="/leads" element={
        <RoleProtectedRoute allowedRoles={[ROLES.ADMIN,ROLES.AGENT,ROLES.MANAGER]}>
          <Leads />
    </RoleProtectedRoute>
        
        } />
           {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/campaigns" element={<Campaigns />} />
         
        {/* <Route path="/inbox" element={<Inbox />} /> */}
        {/* <Route path="/login" element={<Login />} />
          <Route path="/followups" element={<FollowUps />} />
        <Route path="/ai-writer" element={<AIWriter />} />
           <Route path="/integrations/hubspot" element={<HubSpotIntegration />} />
        <Route path="/integrations/salesforce" element={<SalesforceIntegration />} />
        <Route path="/integrations/pipedrive" element={<PipedriveIntegration />} />
    <Route path="/create-followup" element={<CreateFollowUp />} />
         <Route path="/campaigns/new" element={<NewCampaign />} />
        <Route path="/campaigns/:id" element={<CampaignDetails />} />
        <Route path="/inbox/new" element={<NewMessage />} />
        <Route path="pricing" element={<Pricing/>}/>
        <Route path="/waitlist" element={<Waitlist />} />
        {/* <Route path="/inbox/thread/:thread_id" element={<ThreadPage />} /> */}
{/*         
<Route path="/inbox/thread/:thread_id" element={<ThreadView />} />
        <Route path="/manage/users" element={<ManageUsers />} />
        <Route path="/organizations" element={<OrganizationList />} />
        <Route path="/organizations/create" element={<CreateOrganization />} />
<Route path="/inbox" element={<Inbox />} />
<Route path="/connect-email" element={<ConnectAccount />} /> */} 
 <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />

          {/* Sidebar */}
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
              <RoleProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MANAGER, ROLES.AGENT]}>
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
            path="/waitlist"
            element={
              <RoleProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.GUEST, ROLES.AGENT, ROLES.MANAGER]}>
                <Waitlist />
              </RoleProtectedRoute>
            }
          />
          <Route path="/connect-email" element={<ConnectAccount />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/unified-inbox" element={<UnifiedInbox />} />
          <Route path="/create-followup" element={<CreateFollowUp />} />

         

        </Routes>
);

export default App;
