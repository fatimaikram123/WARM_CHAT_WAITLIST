import React, { useEffect } from 'react';
import { Flame } from 'lucide-react';

declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

interface WaitlistFormProps {
  location: string;
  showFlame?: boolean;
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({ showFlame = false }) => {
  useEffect(() => {
    // Load Tally embed script
    const loadTallyScript = () => {
      const script = document.createElement('script');
      script.src = 'https://tally.so/widgets/embed.js';
      script.async = true;
      script.onload = () => {
        if (window.Tally) {
          window.Tally.loadEmbeds();
        }
      };
      document.body.appendChild(script);
    };

    loadTallyScript();

    return () => {
      // Cleanup script when component unmounts
      const script = document.querySelector('script[src="https://tally.so/widgets/embed.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-lg relative">
      {showFlame && (
        <div className="absolute -left-4 md:-left-6 -top-4 md:-top-6 hidden sm:block z-10">
          <Flame size={28} className="text-warmchats-flame animate-pulse-gentle md:w-9 md:h-9" />
        </div>
      )}
      <iframe
        data-tally-src="https://tally.so/embed/3xo6Qy?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="100%"
        height="374"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="Join WarmChats Waitlist"
        className="rounded-lg"
      />
    </div>
  );
};

export default WaitlistForm;
