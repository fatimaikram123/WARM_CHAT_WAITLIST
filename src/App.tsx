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
import Waitlist from "./components/WaitList";

const queryClient = new QueryClient();

const App = () => (

  
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
             <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
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


         

        </Routes>
);

export default App;
