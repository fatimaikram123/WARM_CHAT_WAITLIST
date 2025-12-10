import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleSectionNavigation = (sectionId: string, event?: React.MouseEvent) => {
    event?.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
      return;
    }

    scrollToSection(sectionId);
  };

  useEffect(() => {
    if (location.pathname !== "/") return;
    const hash = location.hash.replace('#', '');
    if (!hash) return;
    scrollToSection(hash);
  }, [location.pathname, location.hash]);

  return (
    <nav 
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-full ${
        isScrolled
          ? ' shadow-lg  backdrop-blur-sm'
          : ' backdrop-blur-sm'
      }`}
    >
      <div className="px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#hero" 
          className="flex items-center gap-2"
          onClick={(e) => handleSectionNavigation('hero', e)}
        >
          <div className="p-1.5 md:p-2 rounded-full hover:shadow-md transition-all">
            <img src="/warmchats_icononly.svg" alt="WarmChats" className=" w-10 h-10 " />
          </div>
          <span className="text-sm md:text-base font-bold bg-gradient-to-r from-warmchats-primary to-warmchats-flame bg-clip-text text-transparent">
            WarmChats
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-3">
          <div className=" rounded-full p-1.5 backdrop-blur-sm">
            <div className="flex items-center gap-1">
             
                <a  onClick={(e) => navigate("/features")} className="px-4 py-2 text-sm text-gray-700 hover:text-warmchats-primary transition-colors rounded-full hover:bg-white cursor-pointer">
                Features  
              </a>
                  <a href="#pricing" onClick={(e) => handleSectionNavigation('pricing', e)} className="px-4 py-2 text-sm text-gray-700 hover:text-warmchats-primary transition-colors rounded-full hover:bg-white cursor-pointer">
                Pricing
              </a>
               <a href="#how-it-works" onClick={(e) => handleSectionNavigation('hero', e)} className="px-4 py-2 text-sm text-gray-700 hover:text-warmchats-primary transition-colors rounded-full hover:bg-white cursor-pointer">
                Get Started
              </a>
                <a href="#process" className="px-3 py-2 text-sm text-gray-700 rounded-full hover:bg-gray-50 transition-all cursor-pointer" onClick={(e) => handleSectionNavigation('process', e)}>
              See It In Action
            </a>
              {/* <a href="#waitlist" onClick={(e) => scrollToSection('waitlist', e)} className="ml-0.5 px-5 py-2 text-sm bg-gradient-to-r from-warmchats-primary to-warmchats-flame text-white rounded-full hover:shadow-md transition-all hover:scale-105">
                Join Waitlist
              </a> */}
            </div>
          </div>

          {/* ✅ Login Button (Right Side) */}
          <button
            onClick={() => navigate("/login")}
            className="ml-3 px-5 py-2 text-sm text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-all hover:shadow-md"
          >
            Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden bg-white/70 p-2 rounded-full text-gray-700 hover:bg-white/90 transition-all"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-2 flex flex-col gap-1">
               <a className="px-3 py-2 text-sm text-gray-700 rounded-full hover:bg-gray-50 transition-all" onClick={(e) => navigate("/features")}>
              Features
            </a>
            <a href="#pricing" className="px-3 py-2 text-sm text-gray-700 rounded-full hover:bg-gray-50 transition-all" onClick={(e) => handleSectionNavigation('pricing', e)}>
              Pricing
            </a>
            <a href="#how-it-works" className="px-3 py-2 text-sm text-gray-700 rounded-full hover:bg-gray-50 transition-all" onClick={(e) => handleSectionNavigation('how-it-works', e)}>
              Get Started
            </a>
                  <a href="#process" className="px-3 py-2 text-sm text-gray-700 rounded-full hover:bg-gray-50 transition-all" onClick={(e) => handleSectionNavigation('process', e)}>
             See It In Action
            </a>
          
{/*           
            <a href="#waitlist" className="mt-1 px-4 py-2 text-sm bg-gradient-to-r from-warmchats-primary to-warmchats-flame text-white rounded-full text-center hover:shadow-md transition-all" onClick={(e) => scrollToSection('waitlist', e)}>
              Join Waitlist
            </a> */}

            {/* ✅ Login in Mobile Menu */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate("/login");
              }}
              className="mt-1 px-4 py-2 text-sm bg-orange-500 text-white rounded-full text-center hover:bg-orange-600 hover:shadow-md transition-all"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
