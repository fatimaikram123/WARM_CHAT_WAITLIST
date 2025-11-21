import React from 'react';
import { XCircle, AlertTriangle } from 'lucide-react';

const ComparisonTabs: React.FC = () => {

  const comparisonFeatures = [
    {
      title: "Personalization Depth",
      warmchats: "AI-powered message generation tailored to tone, platform, and audience",
      mailchimp: "Limited to {{first_name}} or static variables",
      warmchatsIcon: <span className="text-black text-xl mr-1">✓</span>,
      mailchimpIcon: <XCircle className="text-red-600 w-5 h-5 inline-block mr-1" />
    },
    {
      title: "Speed of Message Generation",
      warmchats: "Instantly generates dozens of personalized DMs, emails, and comments",
      mailchimp: "Manual campaign setup with templates",
      warmchatsIcon: <span className="text-black text-xl mr-1">✓</span>,
      mailchimpIcon: <AlertTriangle className="text-yellow-500 w-5 h-5 inline-block mr-1" />
    },
    {
      title: "Multi-Channel Support",
      warmchats: "SMS, Email - Coming soon: LinkedIn, Instagram, WhatsApp, X",
      mailchimp: "Email only (limited integrations)",
      warmchatsIcon: <span className="text-black text-xl mr-1">✓</span>,
      mailchimpIcon: <XCircle className="text-red-600 w-5 h-5 inline-block mr-1" />
    },
    {
      title: "Built-in Analytics",
      warmchats: "Tracks engagement, conversions, and message performance across channels",
      mailchimp: "Email analytics only",
      warmchatsIcon: <span className="text-black text-xl mr-1">✓</span>,
      mailchimpIcon: <span className="text-black text-xl mr-1">✓</span>
    },
    {
      title: "Outbound Automation",
      warmchats: "Create, schedule, and auto-reply to leads",
      mailchimp: "Requires third-party integrations",
      warmchatsIcon: <span className="text-black text-xl mr-1">✓</span>,
      mailchimpIcon: <XCircle className="text-red-600 w-5 h-5 inline-block mr-1" />
    }
  ];

  const pricingPlans = [
    { plan: "Starter", warmchats: "$49/mo 5,000 contacts", mailchimp: "$60/mo 5,000 contacts" },
    { plan: "Growth", warmchats: "$97/mo 100k prospect storage, unlimited campaigns", mailchimp: "$114.75/mo 10k contacts" },
    { plan: "Enterprise", warmchats: "$289/mo 1M+ prospects", mailchimp: "$350/mo 30k contacts" }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Warmchats vs Mailchimp</h2>
          <p className="text-gray-600 text-lg">
            Compare features, speed, multi-channel support, and pricing at a glance
          </p>
        </div>

        {/* Features Comparison */}
        <div className="mb-16 space-y-6">
          {comparisonFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 hover:shadow-lg transition"
            >
              <div className="md:w-1/4 font-semibold text-lg text-gray-800">{feature.title}</div>

              <div className="md:w-1/2 bg-green-50 p-4 rounded-xl flex items-start gap-2">
                {feature.warmchatsIcon}
                <span className="text-gray-800">{feature.warmchats}</span>
              </div>

              <div className="md:w-1/2 bg-red-50 p-4 rounded-xl flex items-start gap-2">
                {feature.mailchimpIcon}
                <span className="text-gray-800">{feature.mailchimp}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Comparison */}
        <div className="space-y-6">
          {pricingPlans.map((plan, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 hover:shadow-lg transition"
            >
              <div className="md:w-1/4 font-semibold text-lg text-gray-800">{plan.plan}</div>

              <div className="md:w-1/2 bg-green-50 p-4 rounded-xl flex items-start gap-2">
                <span className="text-black text-xl mr-1">✓</span>
                <span className="text-gray-800">{plan.warmchats}</span>
              </div>

              <div className="md:w-1/2 bg-red-50 p-4 rounded-xl flex items-start gap-2">
                <span className="text-gray-800">{plan.mailchimp}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ComparisonTabs;
