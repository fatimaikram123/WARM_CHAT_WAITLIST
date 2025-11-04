
import React from 'react';
import { Flame, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-6 md:mb-0">
            <a href="#" className="flex items-center gap-2 text-lg md:text-xl font-bold text-gray-900">
              <Flame size={20} className="text-warmchats-flame md:w-6 md:h-6" />
              <span>WarmChats</span>
            </a>
            <p className="mt-2 text-gray-600 max-w-md text-sm md:text-base">
              Turn cold outreach into warm conversations with AI-powered personalized messaging.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12 w-full md:w-auto">
            <div>
              <h3 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">Product</h3>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
                <li><a href="#process" className="text-gray-600 hover:text-warmchats-primary">See It's actions</a></li>
                <li><a href="#features" className="text-gray-600 hover:text-warmchats-primary">Features</a></li>
                <li><a href="#pricing" className="text-gray-600 hover:text-warmchats-primary">Pricing</a></li>
              </ul>
            </div>
            
            {/* <div>
              <h3 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">Company</h3>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
                <li><a href="#" className="text-gray-600 hover:text-warmchats-primary">About</a></li>
                <li><a href="#" className="text-gray-600 hover:text-warmchats-primary">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-warmchats-primary">Careers</a></li>
              </ul>
            </div> */}
            
            {/* <div>
              <h3 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">Legal</h3>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
                <li><a href="#" className="text-gray-600 hover:text-warmchats-primary">Privacy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-warmchats-primary">Terms</a></li>
                <li><a href="#" className="text-gray-600 hover:text-warmchats-primary">Security</a></li>
              </ul>
            </div> */}
            
            <div>
              <h3 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">Connect</h3>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-sm">
                <li>
                  <a href="#" className="text-gray-600 hover:text-warmchats-primary flex items-center gap-1 md:gap-2">
                    <Twitter size={14} className="md:w-4 md:h-4" />
                    <span>Twitter</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:hello@warmchats.com" 
                    className="text-gray-600 hover:text-warmchats-primary flex items-center gap-1 md:gap-2"
                  >
                    <Mail size={14} className="md:w-4 md:h-4" />
                    <span>hello@warmchats.com</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 md:mt-12 pt-4 md:pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 text-xs md:text-sm">
            © {new Date().getFullYear()} WarmChats. All rights reserved.
          </p>
          
          <div className="flex items-center gap-3 md:gap-4 mt-3 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-warmchats-primary text-xs md:text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-warmchats-primary text-xs md:text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
