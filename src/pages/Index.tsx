
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProcessVisualization from '../components/ProcessVisualization';
import HowItWorks from '../components/HowItWorks';
import Benefits from '../components/Benefits';
import Features from '../components/Features';
import ComparisonTable from '../components/ComparisonTable';
import Testimonials from '../components/Testimonials';
import WaitlistCTA from '../components/WaitlistCTA';
import Footer from '../components/Footer';
import Sidebar from '@/components/SideBar';
import { useNavigate } from "react-router-dom";

const Index: React.FC = () => {
    const navigate = useNavigate();
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for navbar height
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Set title for the page
    document.title = "WarmChats - Turn Cold Outreach into Warm Conversations";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
  
      {/* <Sidebar/> */}
      <main>
        <Hero />
        <ProcessVisualization />
        <HowItWorks />
        <Benefits />
        <Features />
        <ComparisonTable />
        <Testimonials />
        <WaitlistCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
