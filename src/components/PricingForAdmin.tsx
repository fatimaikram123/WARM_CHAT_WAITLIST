import React from "react";
import MainLayout from "../components/MainLayout";

export default function PricingForAdmin() {
  const plans = [
    {
      name: "Starter",
      tagline: "For founders who want to 10x their outreach with smart automation.",
      monthly: "$49/mo",
      yearly: "$39/mo (billed annually)",
      features: [
        "5,000 Active Prospects",
        "20k Prospect Storage",
        "1 Mailbox, 1 User",
        "2,500 Emails + 500 SMS",
        "AI Sequence & Message Copy Rewriter",
        "Follow-Up AI Lite",
        "CRM Integration",
        "Performance Dashboard",
        "Smart Follow-Up AI with Triggered Automations",
        "Centralized Inbox",
        "AI Chat Bot Support",
      ],
      color: "from-orange-500 to-orange-600",
    },
    {
      name: "Growth",
      tagline: "Built for scaling companies and high-performing teams.",
      monthly: "$97/mo per member",
      yearly: "$87/mo (billed annually)",
      features: [
        "Unlimited Prospects & Campaigns",
        "100k Prospect Storage",
        "5 Mailboxes per User",
        "3 User Seats + Role Permissions",
        "Multichannel Outreach (Email + SMS + Call)",
        "Smart Replies + AI Objection Handler",
        "Smart Lead Scoring (WarmScore™)",
        "CRM Integrations (HubSpot, Salesforce, Pipedrive, Zoho)",
        "WarmAnalytics™ Dashboard",
        "Team Inbox + Shared Sequences",
        "AI Sequence Writer 2.0",
      ],
      color: "from-purple-500 to-purple-700",
    },
    {
      name: "Enterprise",
      tagline: "For enterprises demanding real-time CRM sync & advanced compliance.",
      monthly: "$289/mo",
      yearly: "$264/mo (billed annually)",
      features: [
        "Unlimited Prospects & Campaigns",
        "1M+ Prospect Storage",
        "Unlimited Emails & SMS",
        "Unified Inbox (Email + SMS + Calls)",
        "Bidirectional CRM Sync (HubSpot, Salesforce)",
        "WarmIQ: Deliverability Monitor + Reply Intent Engine",
        "Smart Channel Switch AI",
        "AI Timing Optimizer",
        "WarmScore Pro+ (Real-Time Lead Ranking)",
        "Granular Roles & Permissions",
        "2-Year Audit Logs + SSO (Okta, Google)",
      ],
      color: "from-gray-800 to-gray-900",
    },
  ];

  return (
  
      <section className="py-16 bg-gradient-to-br to-purple-50 min-h-screen">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
            Choose Your <span className="text-orange-500">WarmChats</span> Plan
          </h1>
          <p className="text-gray-600 text-lg">
            More than automation — a full-stack outreach intelligence system trusted by 2,000+ teams.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1"
            >
              <div
                className={`bg-gradient-to-r ${plan.color} text-white rounded-t-2xl py-6 text-center`}
              >
                <h2 className="text-2xl font-bold">{plan.name}</h2>
                <p className="text-sm opacity-90 mt-1">{plan.tagline}</p>
              </div>

              <div className="p-6">
                <p className="text-3xl font-extrabold text-gray-800 mb-1">{plan.monthly}</p>
                <p className="text-sm text-gray-500 mb-6">{plan.yearly}</p>

                <ul className="text-sm text-gray-700 space-y-2 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-black text-xl mr-2">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:shadow-md transition">
                  Select Plan
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-700 mb-4">Interested in bigger plans or custom features?</p>
          <a
            href={import.meta.env.VITE_CALENDLY_LINK}
            target="_blank"
            className="px-6 py-3 border border-orange-500 text-orange-600 rounded-lg font-medium hover:bg-orange-50 transition"
          >
            Let’s Connect
          </a>
        </div>
      </section>
  
  );
}
