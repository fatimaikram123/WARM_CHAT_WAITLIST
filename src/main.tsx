import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CRMProvider } from "./context/CRMContext"; // ✅ make sure this path is correct
import { GoogleOAuthProvider } from "@react-oauth/google";

// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       {/* ✅ Wrap the entire app inside CRMProvider */}
//       <CRMProvider>
//         <App />
//       </CRMProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <CRMProvider>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
  <App />
</GoogleOAuthProvider>

      </CRMProvider>
    </BrowserRouter>
  </React.StrictMode>
);
