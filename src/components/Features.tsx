import React from 'react';
import { Layers, FileText, PieChart, Sparkles, Puzzle, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Features: React.FC = () => {
  const navigate = useNavigate();

  // ✅ Grouped features
  const groupedFeatures = [
    {
      groupTitle: "AI Creation Tools",
      items: [
        {
          icon: <Sparkles size={28} className="text-warmchats-flame" />,
          title: "Fast AI Message Generation",
          description: "Generate messages quickly with context-aware AI that writes human-like, personalized outreach."
        },
        {
          icon: <FileText size={28} className="text-warmchats-flame" />,
          title: "Custom Templates",
          description: "Create reusable templates to streamline outreach and maintain consistency across campaigns."
        },
        {
          icon: <Sparkles size={28} className="text-warmchats-flame" />,
          title: "AI Personalization",
          description: "Automatically add personal details and context for authentic, engaging messages."
        }
      ]
    },
    {
      groupTitle: "Multi-Channel Automation",
      items: [
        {
          icon: <Layers size={28} className="text-warmchats-primary" />,
          title: "Multi-Channel Support",
          description: "Deliver your messages across email, SMS, and social platforms seamlessly."
        },
        {
          icon: <Puzzle size={28} className="text-warmchats-primary" />,
          title: "Integrations",
          description: "Connect to your CRM and email tools for smooth workflows and data sync."
        },
        {
          icon: <Sparkles size={28} className="text-warmchats-primary" />,
          title: "Smart Follow-Up AI",
          description: "Automated follow-ups using AI to ensure no lead goes cold."
        }
      ]
    },
    {
      groupTitle: "Insights & Collaboration",
      items: [
        {
          icon: <PieChart size={28} className="text-warmchats-primary" />,
          title: "Advanced Analytics",
          description: "Track performance, optimize messaging, and gain actionable insights."
        },
        {
          icon: <Layers size={28} className="text-warmchats-primary" />,
          title: "Team Collaboration",
          description: "Work with your team efficiently with shared inboxes, notes, and assignments."
        }
      ]
    }
  ];

  return (
    <section id="features" className="section-padding mt-14 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-0 w-80 h-80 bg-warmchats-primary-light rounded-full blur-3xl opacity-20 -z-10"></div>
      <div className="absolute bottom-40 right-0 w-96 h-96 bg-warmchats-flame-light rounded-full blur-3xl opacity-20 -z-10"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-4 bg-warmchats-primary-light bg-opacity-70 backdrop-blur-sm rounded-full shadow-sm">
            <Sparkles size={16} className="text-warmchats-primary mr-2" />
            <span className="text-sm font-semibold">Feature-Rich Platform</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-gray-600 text-lg">
            Everything you need to create engaging, personalized outreach at scale
          </p>
        </div>

        {/* Grouped Features */}
        {groupedFeatures.map((group, gIndex) => (
          <div key={gIndex} className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{group.groupTitle}</h3>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {group.items.map((feature, fIndex) => (
                <div
                  key={fIndex}
                  className="bg-white border border-gray-100 p-4 md:p-6 rounded-xl hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                    <div className={`bg-gradient-to-br ${fIndex % 2 === 0 ? 'from-warmchats-primary-light to-white' : 'from-warmchats-flame-light to-white'} p-2 md:p-3 rounded-xl shadow-sm`}>
                      {React.cloneElement(feature.icon, { size: 24, className: `${feature.icon.props.className} md:w-7 md:h-7` })}
                    </div>
                  </div>
                  <h4 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{feature.title}</h4>
                  <p className="text-gray-600 text-sm md:text-base">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Mini CTA Banner */}
        <div className="mt-16 md:mt-20 bg-gradient-to-r from-warmchats-primary to-warmchats-flame rounded-2xl shadow-md p-6 md:p-12 text-center">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">
            Ready to 3× your outreach efficiency?
          </h3>
          <button
            onClick={() => navigate("/signup")}
            className="inline-block bg-white text-warmchats-primary font-semibold px-6 py-3 rounded-full hover:shadow-lg transition-all transform hover:scale-105 text-sm md:text-base"
          >
            Get Early Access → 
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
