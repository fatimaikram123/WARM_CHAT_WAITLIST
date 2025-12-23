import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Check, Mail, Smartphone, X, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ---------------- TYPES ---------------- */

type Step = 1 | 2 | 3 | 4 | 5 | 6;

/* ---------------- DATA ---------------- */

const presets = [
  { id: "buyer-follow-up", title: "Buyer Lead Follow-Up", recommended: true, avgReplies: "32–45%", messages: "3 (Day 0, Day 1, Day 3)" },
  { id: "seller-follow-up", title: "Seller Lead Follow-Up", recommended: true, avgReplies: "25–35%", messages: "3" },
  { id: "open-house-follow-up", title: "Open House Follow-Up", recommended: true, avgReplies: "40–55%", messages: "2" },
  { id: "expired-listing-outreach", title: "Expired Listing Outreach", recommended: true, avgReplies: "18–25%", messages: "4" },
];

/* ---------------- MAIN COMPONENT ---------------- */

const Onboarding: React.FC = () => {
  const [step, setStep] = useState<Step>(1);
  const [goal, setGoal] = useState("");
  const [connected, setConnected] = useState<{ email?: boolean; sms?: boolean }>({});
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [smsConnecting, setSmsConnecting] = useState(false);

  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE;
  const token = localStorage.getItem("token");

  const progress = Math.round((step / 6) * 100);

  /* ---------------- API CALLS ---------------- */

  const saveGoal = async (g: string) => {
    setGoal(g);
    await fetch(`${API_BASE}/users/set-goal`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ goal: g }),
    });
    setStep(3);
  };

  const activateFlow = async (flowId: string) => {
    await fetch(`${API_BASE}/flows/activate`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ flowId }),
    });
    setStep(5);
  };

  const sendTest = async () => {
    const channel = connected.email ? "email" : "sms";
    await fetch(`${API_BASE}/messages/send-test`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ channel }),
    });
    setStep(6);
  };

  const connectSMS = async () => {
    setSmsConnecting(true);
    try {
      const res = await fetch(`${API_BASE}/sms/connect`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ number: "verified-number" }),
      });
      if (res.ok) setConnected((c) => ({ ...c, sms: true }));
      else alert("SMS connection failed");
    } catch (err) {
      console.error(err);
      alert("SMS connection failed");
    } finally {
      setSmsConnecting(false);
    }
  };

  const canNext = () => {
    if (step === 3) return connected.email || connected.sms;
    return true;
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-50 via-white to-orange-50">
      <div className="max-w-4xl mx-auto">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>Step {step} of 6</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-600 to-orange-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <Card className="shadow-xl border border-white/40 bg-white/70 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-xl">
              {step === 1 && "Welcome to WarmChats 👋"}
              {step === 2 && "What do you want to achieve first?"}
              {step === 3 && "Connect at least one channel"}
              {step === 4 && "Choose your first automation"}
              {step === 5 && "Send a test message"}
              {step === 6 && "You’re live 🚀"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            {/* STEP 1 */}
            {step === 1 && (
              <button onClick={() => setStep(2)} className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-orange-500 hover:opacity-90 shadow-lg">
                Get Started
              </button>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="grid sm:grid-cols-2 gap-4">
                <GoalCard label="🏡 Real Estate — Get More Clients" recommended selected={goal === "Real Estate — Get More Clients"} onSelect={() => saveGoal("Real Estate — Get More Clients")} />
                {["📧 Cold Email Campaigns", "🔁 Lead Nurturing", "⚡ Appointment Setting"].map((g) => (
                  <GoalCard key={g} label={g} selected={goal === g} onSelect={() => saveGoal(g)} />
                ))}
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="grid sm:grid-cols-2 gap-4">
                <ChannelCard label="Email" icon={<Mail size={18} />} description="Gmail" connected={connected.email} onConnect={() => setShowEmailModal(true)} />
                <ChannelCard
                  label="SMS"
                  icon={<Smartphone size={18} />}
                  description="Verified sending number"
                  connected={connected.sms}
                  onConnect={connectSMS}
                  loading={smsConnecting}
                />
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className="space-y-4">
                {presets.map((p) => (
                  <Card key={p.id} className="p-4 flex justify-between items-center">
                    <div>
                      <div className="font-semibold flex items-center gap-2">
                        {p.title}
                        {p.recommended && (
                          <span className="text-xs text-orange-500 flex items-center gap-1">
                            <Star size={12} /> Recommended
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        ⏱ {p.avgReplies} · 💬 {p.messages}
                      </div>
                    </div>
                    <button onClick={() => activateFlow(p.id)} className="px-4 py-2 rounded-md text-white bg-gradient-to-r from-purple-600 to-orange-500 hover:opacity-90">
                      Activate
                    </button>
                  </Card>
                ))}
              </div>
            )}

            {/* STEP 5 */}
            {step === 5 && (
              <div className="space-y-4">
                <button onClick={sendTest} className="w-full px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-orange-500 hover:opacity-90">
                  Send Test Message
                </button>
              </div>
            )}

            {/* STEP 6 */}
            {step === 6 && (
              <div className="text-xl font-semibold text-green-600">
                🎉 Automation is running!
                <button onClick={() => { localStorage.setItem("onboardingComplete", "true"); navigate("/dashboard"); }} className="ml-4 px-4 py-2 rounded-md border">
                  Go to Dashboard
                </button>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between">
            {step > 1 && step < 6 && (
              <button onClick={() => setStep((s) => (s - 1) as Step)} className="border px-4 py-2 rounded-md">
                Back
              </button>
            )}
            {step < 6 && step > 1 && (
              <button onClick={() => canNext() && setStep((s) => (s + 1) as Step)} disabled={!canNext()} className="px-4 py-2 rounded-md text-white bg-gradient-to-r from-purple-600 to-orange-500 disabled:opacity-40">
                Continue
              </button>
            )}
          </CardFooter>
        </Card>
      </div>

      {showEmailModal && (
        <EmailConnectModal
          onClose={() => setShowEmailModal(false)}
          onSuccess={() => {
            setConnected((c) => ({ ...c, email: true }));
            setShowEmailModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Onboarding;

/* ---------------- GOAL CARD ---------------- */

const GoalCard = ({ label, selected, recommended, onSelect }: any) => (
  <button
    onClick={onSelect}
    className={`relative w-full text-left p-5 rounded-xl border transition-all ${selected ? "border-transparent bg-gradient-to-r from-purple-600/10 to-orange-500/10" : "border-gray-200 bg-white hover:border-purple-400"}`}
  >
    {recommended && (
      <span className="absolute top-3 right-3 text-xs text-orange-500 flex gap-1">
        <Star size={12} /> Recommended
      </span>
    )}
    <div className="font-semibold">{label}</div>
    {selected && (
      <div className="absolute bottom-3 right-3 text-green-600 flex gap-1 text-xs">
        <Check size={14} /> Selected
      </div>
    )}
  </button>
);

/* ---------------- CHANNEL CARD ---------------- */

const ChannelCard = ({ label, icon, description, connected, onConnect, loading }: any) => (
  <Card className={`p-5 transition-all cursor-pointer ${connected ? "border-green-500 bg-green-50" : "hover:border-purple-400"}`} onClick={!connected && !loading ? onConnect : undefined}>
    <div className="flex justify-between items-start">
      <div className="flex gap-3">
        <div className="text-purple-600">{icon}</div>
        <div>
          <div className="font-semibold">{label}</div>
          <div className="text-xs text-gray-500">{description}</div>
        </div>
      </div>
      {connected ? (
        <span className="text-green-600 text-xs flex gap-1">
          <Check size={14} /> Connected
        </span>
      ) : loading ? (
        <span className="text-gray-600 text-xs">Connecting...</span>
      ) : (
        <span className="text-gray-400 text-xs flex gap-1">
          <X size={14} /> Not Connected
        </span>
      )}
    </div>
  </Card>
);

/* ---------------- EMAIL MODAL ---------------- */

const EmailConnectModal = ({ onClose, onSuccess }: any) => {
  const API_BASE = import.meta.env.VITE_API_BASE;
  const token = localStorage.getItem("token");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const user_id = localStorage.getItem("user_id");

  const connect = async () => {
    setStatus("Connecting...");
    try {
      const res = await fetch(`${API_BASE}/inbox/connect`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ email, password, imap_host: "imap.gmail.com", smtp_host: "smtp.gmail.com", user_id }),
      });

      if (res.ok) {
        setStatus("Connected!");
        onSuccess();
      } else {
        const errData = await res.json().catch(() => ({}));
        setStatus(errData.message || "Connection failed");
      }
    
    //   const res2 = await fetch(`${API_BASE}/inbox/test-smtp`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    //      body: JSON.stringify({ email, password, imap_host: "imap.gmail.com", smtp_host: "smtp.gmail.com", user_id }),

    //   });
      

    //   if (res2.ok) {
    //     const data= await res2.json();
    //     setStatus(data.message || "Connected!");
    //     onSuccess();
    //   } else {
    //     const errData = await res.json().catch(() => ({}));
    //     setStatus(errData.message || "Connection failed");
    //   }
    } catch (err) {
      console.error(err);
      setStatus("Connection failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4 relative">
        <button onClick={onClose} className="absolute right-4 top-4"><X /></button>
        <h2 className="text-lg font-semibold">Connect Email</h2>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border p-2 rounded" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="App Password" className="w-full border p-2 rounded" />
        <button onClick={connect} className="w-full py-2 rounded text-white bg-gradient-to-r from-purple-600 to-orange-500">Connect</button>
        {status && <p className="text-sm text-gray-500">{status}</p>}
      </div>
    </div>
  );
};
