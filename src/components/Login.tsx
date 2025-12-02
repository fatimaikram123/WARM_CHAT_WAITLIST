import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const API_BASE = import.meta.env.VITE_API_BASE;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Invalid credentials");
        setLoading(false);
        return;
      }
      const decoded = JSON.parse(atob(data.access_token.split(".")[1]));
      localStorage.setItem("token_exp", (decoded.exp * 1000).toString());

      // ✅ Save token and user info
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user_id", JSON.stringify(data.user_id));
      localStorage.setItem("name", data.name);
      localStorage.setItem("role_id", JSON.stringify(data.role_id));
      localStorage.setItem("role_name", data.role_name);
      localStorage.setItem("org_id", JSON.stringify(data.org_id));
      localStorage.setItem("gmail_user_name", data.gmail_user_name);
      localStorage.setItem("org_name", data.org_name);
      localStorage.setItem("gmail_email_id",data.gmail_email_id)

      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-warmchats-flame/20 px-4">
      <Toaster position="top-right" />
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-6">
          <img src="/warmchats_icononly.svg" alt="WarmChats" className="w-12 h-12 mb-2" />
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back 👋</h2>
          <p className="text-gray-500 text-sm mt-1">Login to your WarmChats account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-warmchats-primary focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-warmchats-primary focus:border-transparent outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-gradient-to-r from-warmchats-primary to-warmchats-flame text-white rounded-lg font-medium hover:shadow-md hover:scale-[1.02] transition-all disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-warmchats-primary hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
