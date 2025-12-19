import React, { useState } from "react";
import MainLayout from "./MainLayout";

export default function ConnectAccount() {
  const API_BASE = import.meta.env.VITE_API_BASE;
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("token"); // ✅ Fetch JWT token

  const [form, setForm] = useState({
    email: "",
    password: "",
    imap_host: "imap.gmail.com",
    smtp_host: "smtp.gmail.com",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleConnect = async () => {
    if (!token) {
      setStatus("❌ Missing authentication token. Please log in again.");
      return;
    }

    setStatus("🔄 Connecting...");

    try {
      const res = await fetch(`${API_BASE}/inbox/connect`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Include JWT token
        },
        body: JSON.stringify({ user_id: userId, ...form }),
      });

      const data = await res.json();

      if (res.ok && data.status === "success") {
        setStatus("✅ Connected successfully!");
      } else {
        setStatus(`❌ Failed: ${data.error || "unknown error"}`);
      }
    } catch (err) {
      console.error("Error connecting email:", err);
      setStatus("❌ Network or server error");
    }
    try {
      const res = await fetch(`${API_BASE}/inbox/gmail/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data: any = await res.json();
      

      // API returns { status: "success", username, user_id, email }
      if (res.ok  && data.username) {
        localStorage.setItem("gmail_user_name", data.username);
        setStatus(`✅ Connected as ${data.username}`);
      } else {
        setStatus(`❌ Failed: ${data.error || data.message || "unknown error"}`);
      }
    } catch (err) {
      console.error("Error fetching gmail info:", err);
      setStatus("❌ Network or server error while fetching Gmail info");
    }
  };

  return (
    <MainLayout>
      
    <div className="max-w-md mx-auto mt-12 bg-white shadow-md rounded-xl p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Connect Email Account</h2>

      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email Address"
        className="w-full border p-2 rounded-md"
      />

      <input
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="App Password"
        type="password"
        className="w-full border p-2 rounded-md"
      />

      {/* <input
        name="imap_host"
        value={form.imap_host}
        onChange={handleChange}
        placeholder="IMAP Host"
        className="w-full border p-2 rounded-md"
      /> */}

      {/* <input
        name="smtp_host"
        value={form.smtp_host}
        onChange={handleChange}
        placeholder="SMTP Host"
        className="w-full border p-2 rounded-md"
      /> */}

      <button
        onClick={handleConnect}
        className="w-full bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600"
      >
        Connect
      </button>

      {status && <p className="text-sm text-gray-700 mt-2">{status}</p>}
    </div>
    </MainLayout>
  );
}
