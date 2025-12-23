import React, { useState } from "react";
import { X } from "lucide-react";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

const EmailConnectModal: React.FC<Props> = ({ onClose, onSuccess }) => {
  const API_BASE = import.meta.env.VITE_API_BASE;
  const token = localStorage.getItem("access_token");
  const userId = localStorage.getItem("user_id");

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

  const handleSubmit = async () => {
    if (!token) {
      setStatus("❌ Authentication required");
      return;
    }

    setStatus("🔄 Connecting email...");

    try {
      const res = await fetch(`${API_BASE}/inbox/connect`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id: userId, ...form }),
      });

      const data = await res.json();

      if (res.ok && data.status === "success") {
        setStatus("✅ Email connected successfully");
        onSuccess();
        setTimeout(onClose, 800);
      } else {
        setStatus(`❌ ${data.error || "Connection failed"}`);
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Network error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative space-y-4">
        <button onClick={onClose} className="absolute right-4 top-4">
          <X />
        </button>

        <h2 className="text-lg font-semibold">Connect Email Account</h2>

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full border p-2 rounded"
        />

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="App Password"
          className="w-full border p-2 rounded"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-warmchats-primary text-white py-2 rounded font-semibold"
        >
          Connect Email
        </button>

        {status && <p className="text-sm text-gray-600">{status}</p>}
      </div>
    </div>
  );
};

export default EmailConnectModal;
