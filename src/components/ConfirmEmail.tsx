import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function ConfirmEmail() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const API_BASE = import.meta.env.VITE_API_BASE;
  const calledRef = useRef(false); // Prevent double API calls in Strict Mode

  useEffect(() => {
    if (!token || calledRef.current) return;
    calledRef.current = true;

    fetch(`${API_BASE}/api/auth/confirm-email?token=${token}`, {
      method: "GET",
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Email confirmation failed");
        }
        return data;
      })
      .then(() => {
        toast.success("Email confirmed successfully");
        // Wait a bit so the toast is visible
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      })
      .catch((ex) => {
        console.error(ex);
        toast.error(ex.message || "Email confirmation failed");
      });
  }, [token, API_BASE]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <p className="text-lg font-medium mb-4">Confirming your email…</p>
      <div className="p-8">
        <Toaster position="top-right" />
      </div>
    </div>
  );
}
