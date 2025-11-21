import toast from "react-hot-toast";

const originalFetch = window.fetch;

// 🎯 Access global context
let setSessionExpired: any = null;
setTimeout(() => {
  const ctx = (window as any).appContext;
  if (ctx && ctx.setSessionExpired) setSessionExpired = ctx.setSessionExpired;
}, 0);

function tokenExpired() {
  if (setSessionExpired) {
    setSessionExpired(true); // 🔥 open modal
  } else {
    alert("Session expired");
    localStorage.clear();
    window.location.href = "/login";
  }
}

window.fetch = async function (input, init) {
  const token = localStorage.getItem("token");
  const exp = localStorage.getItem("token_exp");

  // Check token expiry
  if (exp && Date.now() >= Number(exp)) {
    tokenExpired();
    return Promise.reject("Token expired");
  }

  const headers = new Headers(init?.headers || {});
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const newInit = { ...init, headers };

  const res = await originalFetch(input, newInit);

  if (res.status === 401) {
    tokenExpired();
  }

  return res;
};
