
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '@/components/Footer';


const FeaturesPage: React.FC = () => {
  useEffect(() => {
    document.title = "WarmChats - Turn Cold Outreach into Warm Conversations";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
  
      {/* <Sidebar/> */}
      <main className="space-y-20 md:space-y-28">
        <Features />
       
      </main>
    <Footer/>
    </div>
  );
};

export default FeaturesPage;
