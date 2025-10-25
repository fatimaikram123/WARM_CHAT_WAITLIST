import { useEffect } from 'react';

declare global {
  interface Window {
    chatbase: any;
  }
}

export function ChatbaseWidget() {
  useEffect(() => {
    // Initialize Chatbase
    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
      window.chatbase = (...args: any[]) => {
        if (!window.chatbase.q) {
          window.chatbase.q = [];
        }
        window.chatbase.q.push(args);
      };

      window.chatbase = new Proxy(window.chatbase, {
        get(target: any, prop: string) {
          if (prop === "q") {
            return target.q;
          }
          return (...args: any[]) => target(prop, ...args);
        },
      });
    }

    // Create and append the script
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "7aQcm_Qh4H5XOrGGuZnfp";
    script.setAttribute("domain", "www.chatbase.co");
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      const existingScript = document.getElementById("7aQcm_Qh4H5XOrGGuZnfp");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  return null; // This component doesn't render anything visible
} 