import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE;
  const navigate = useNavigate();
  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      const res = await fetch(`${API_BASE}/auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_token: credentialResponse.credential,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.access_token) {
        toast.error(data.message || "Google login failed");
        return;
      }

      handleAuthSuccess(data);
    } catch {
      toast.error("Google login failed");
    }
  };
   const handleAuthSuccess = (data: any) => {
    const decoded = JSON.parse(atob(data.access_token.split(".")[1]));

    localStorage.setItem("token", data.access_token);
    localStorage.setItem("token_exp", (decoded.exp * 1000).toString());
    localStorage.setItem("user_id", data.user_id);
    localStorage.setItem("name", data.name);
    localStorage.setItem("role_id", data.role_id);
    localStorage.setItem("role_name", data.role_name);
    localStorage.setItem("org_id", data.org_id);

    toast.success("Welcome back!");
    navigate("/dashboard");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Signup failed");
        return;
      }

      toast.success(
        data.message ||
          "Signup successful! Please check your email to confirm."
      );
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#F6F7F9]">
      <Toaster position="top-right" />

      {/* LEFT — SIGNUP FORM */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Create your account
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Get started with WarmChats
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Full name</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-gray-400 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-gray-400 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-gray-400 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-md bg-orange-500 text-white font-medium hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-5">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-gray-900 font-medium hover:underline"
            >
              Login
            </button>
          </p>
             <div className="my-6 text-center">
                        <GoogleLogin onSuccess={handleGoogleLogin} />
              </div>

      
        </div>
      </div>

      {/* RIGHT — INFO PANEL */}
      <div className="hidden md:flex items-center justify-center bg-[#F1F3F5]">
        <div className="bg-white rounded-xl shadow-sm p-20 max-w-md text-center">
          <p className="text-sm text-gray-500 mb-3">
            Do you know that
          </p>

          <p className="text-xl font-semibold text-gray-900 leading-relaxed">
               Email marketing acquires <br />
            <span className="font-bold">40 times more customers</span> <br />
            than Meta & X combined.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
