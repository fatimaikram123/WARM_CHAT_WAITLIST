import React from 'react';
import { Check, X, Lightbulb, Zap, Bot, Layers, BarChart, CircleDollarSign, Puzzle,CalendarClock } from 'lucide-react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';

const ComparisonTable: React.FC = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const comparisons = [
      // PERSONALIZATION DEPTH
    {
      feature: "Personalization Depth",
      icon: <Lightbulb className="text-warmchats-flame" />,
      warmchats: true,
      others: false,
      description: "AI-powered personalization tailored to tone, platform & audience. Mailchimp only supports {{first_name}} style variables."
    },

    // SPEED OF MESSAGE GENERATION
    {
      feature: "Speed of Message Generation",
      icon: <Zap className="text-warmchats-flame" />,
      warmchats: true,
      others: false,
      description: "WarmChats generates dozens of personalized DMs/emails instantly. Mailchimp requires manual campaign setup."
    },

    // MULTI CHANNEL SUPPORT
    {
      feature: "Multi-Channel Support",
      icon: <Layers className="text-warmchats-flame" />,
      warmchats: true,
      others: false,
      description: "WarmChats supports SMS + Email now; LinkedIn, Instagram, WhatsApp, X coming soon. Mailchimp is email-only."
    },

    // BUILT-IN ANALYTICS
    {
      feature: "Built-in Analytics",
      icon: <BarChart className="text-warmchats-flame" />,
      warmchats: true,
      others: true,
      description: "WarmChats tracks engagement, conversions & multi-channel performance. Mailchimp only has email analytics."
    },

    // OUTBOUND AUTOMATION
    {
      feature: "Outbound Automation",
      icon: <CalendarClock className="text-warmchats-flame" />,
      warmchats: true,
      others: false,
      description: "WarmChats auto-replies, schedules, and manages outbound flows. Mailchimp requires third-party tools."
    },

    // COST EFFICIENCY
    {
      feature: "Cost Efficiency",
      icon: <CircleDollarSign className="text-warmchats-flame" />,
      warmchats: true,
      others: false,
      description: "WarmChats plans offer more features for lower pricing across Starter, Growth & Enterprise tiers."
    },

    // PRICING TIERS (DETAILED)
    {
      feature: "Starter Tier (5,000 contacts)",
      icon: <CircleDollarSign className="text-warmchats-flame" />,
      warmchats: true,
      others: false,
      description: "WarmChats: $49/mo • Mailchimp: $60/mo for the same 5,000 contacts."
    },
    {
      feature: "Growth Tier (100k storage)",
      icon: <CircleDollarSign className="text-warmchats-flame" />,
      warmchats: true,
      others: false,
      description: "WarmChats: $97/mo unlimited campaigns • Mailchimp 10k contacts = $114.75."
    },
    {
      feature: "Enterprise Tier (1M+ prospects)",
      icon: <CircleDollarSign className="text-warmchats-flame" />,
      warmchats: true,
      others: false,
      description: "WarmChats: $289/mo • Mailchimp Premium: 30k contacts = $350/mo."
    },
  ];

  return (
    <section id="comparison" className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">Warmchats vs Mailchimp</h2>
        <p className="section-subtitle">
          See how WarmChats compares to traditional outreach solutions
        </p>

        <div className="max-w-4xl mx-auto mt-12">
          {isMobile ? (
            // Mobile View
            <div className="space-y-4">
              {comparisons.map((item, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-warmchats-primary-light p-2 rounded-lg">
                      {item.icon}
                    </div>
                    <h3 className="font-medium text-base">{item.feature}</h3>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">{item.description}</p>

                  <div className="grid grid-cols-2 text-center border-t border-gray-100 pt-3">
                    <div>
                      <p className="text-sm font-medium text-warmchats-primary mb-1">WarmChats</p>
                      <div className="flex justify-center">
                        {item.warmchats ? (
                          <Check className="text-black" size={20} />
                        ) : (
                          <X className="text-red-500" size={20} />
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Other Tools</p>
                      <div className="flex justify-center">
                        {item.others ? (
                          <Check className="text-black" size={20} />
                        ) : (
                          <X className="text-red-500" size={20} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Desktop View
            <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-warmchats-primary to-warmchats-primary-dark">
                    <TableHead className="w-1/3 py-4 text-base font-bold text-white">Feature</TableHead>
                    <TableHead className="w-1/3 py-4 text-base font-bold text-white">WarmChats</TableHead>
                    <TableHead className="w-1/3 py-4 text-base font-bold text-white">Other Tools</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {comparisons.map((item, index) => (
                    <TableRow
                      key={index}
                      className={index % 2 === 0 ? "bg-white hover:bg-gray-50 transition-colors" : "bg-gray-50 hover:bg-gray-100 transition-colors"}
                    >
                      <TableCell className="py-4 font-medium">
                        <div className="flex items-center gap-3">
                          <div className="bg-warmchats-primary-light p-2 rounded-lg shadow-sm">
                            {item.icon}
                          </div>
                          <div>
                            <span className="font-semibold">{item.feature}</span>
                            <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                          </div>
                        </div>
                      </TableCell>

                      {/* WarmChats Column */}
                      <TableCell className="py-4">
                        {item.warmchats ? (
                          <div className="flex justify-center">
                            <div className="bg-gray-200 p-2 rounded-full">
                              <Check className="text-black" size={24} />
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <div className="bg-gray-200 p-2 rounded-full">
                              <X className="text-red-500" size={24} />
                            </div>
                          </div>
                        )}
                      </TableCell>

                      {/* Other Tools Column */}
                      <TableCell className="py-4">
                        {item.others ? (
                          <div className="flex justify-center">
                            <div className="bg-gray-200 p-2 rounded-full">
                              <Check className="text-black" size={24} />
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <div className="bg-gray-200 p-2 rounded-full">
                              <X className="text-red-500" size={24} />
                            </div>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Experience the WarmChats advantage today</p>
            <a onClick={() => navigate("/signup")} className="btn-primary inline-block">
              Join Our Waitlist
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
