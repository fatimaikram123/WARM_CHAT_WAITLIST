// import React, { useEffect, useState } from "react";
// import MainLayout from "../components/MainLayout";
// import { useNavigate } from "react-router-dom";

// const API_BASE = import.meta.env.VITE_API_BASE;

// interface Campaign {
//   id: number;
//   name: string;
//   channels: string[];
//   message: string;
//   sources: string[];
//   leads: any[];
//   created_at: string;
//   replies: number;
//   hot_leads: number;
//   appointments: number;
//   est_commission: number;
//   status: string;
// }

// export default function Campaigns() {
//   const navigate = useNavigate();
//   const [campaigns, setCampaigns] = useState<Campaign[]>([]);
//   const [loading, setLoading] = useState(true);

//   const orgId = localStorage.getItem("org_id");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!orgId || !token) return;

//     const fetchCampaigns = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(`${API_BASE}/campaigns/org/${orgId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         setCampaigns(data);
//       } catch (err) {
//         console.error("Error fetching campaigns:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCampaigns();
//   }, [orgId, token]);

//   return (
//     <MainLayout>
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">📢 Campaigns</h1>
//         <button
//           onClick={() => navigate("/campaigns/new")}
//           className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:shadow-md transition"
//         >
//           + New Campaign
//         </button>
//       </div>

//       {loading ? (
//         <p className="text-gray-500">Loading campaigns...</p>
//       ) : campaigns.length === 0 ? (
//         <p className="text-gray-500">No campaigns found.</p>
//       ) : (
//         <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
//           <table className="w-full">
//             <thead className="bg-orange-50 text-gray-600 text-sm">
//               <tr>
//                 <th className="text-left py-3 px-5">Campaign</th>
//                 <th className="text-left py-3 px-5">Status</th>
//                 <th className="text-left py-3 px-5">Replies</th>
//                 <th className="text-left py-3 px-5">Hot Leads</th>
//                 <th className="text-left py-3 px-5">Appointments</th>
//                 <th className="text-left py-3 px-5">Est. Commission</th>
//               </tr>
//             </thead>
//             <tbody>
//               {campaigns.map((c) => (
//                 <tr
//                   key={c.id}
//                   className="hover:bg-gray-50 transition cursor-pointer"
//                   onClick={() => navigate(`/campaigns/${c.id}`)}
//                 >
//                   <td className="py-3 px-5 font-medium text-gray-800">{c.name}</td>
//                   <td className="py-3 px-5">
//                     <span
//                       className={`px-3 py-1 text-xs rounded-full ${
//                         c.status === "Running"
//                           ? "bg-green-50 text-green-600"
//                           : c.status === "Paused"
//                           ? "bg-yellow-50 text-yellow-600"
//                           : "bg-gray-100 text-gray-600"
//                       }`}
//                     >
//                       {c.status}
//                     </span>
//                   </td>
//                   <td className="py-3 px-5">{c.replies}</td>
//                   <td className="py-3 px-5">{c.hot_leads}</td>
//                   <td className="py-3 px-5">{c.appointments}</td>
//                   <td className="py-3 px-5">💰 ${c.est_commission.toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </MainLayout>
//   );
// }
