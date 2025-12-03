import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SequenceBuilder from './SequenceBuilder';
import MainLayout from './MainLayout';

const SequencesPage: React.FC = () => {
  return (
    <MainLayout> 
    <div className="min-h-screen flex flex-col">
      <main className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold mb-3">Campaigns & Sequences</h1>
            <p className="text-gray-600 mb-6">Create message sequences, set delays, pick send times and channels, and save campaigns to reuse across leads.</p>
            <SequenceBuilder />
          </div>
          <aside className="w-full lg:w-1/3 bg-gray-50 rounded-lg p-4 border border-gray-100">
            <h3 className="font-semibold mb-2">Quick Tips</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>Use "Send After" to set delay relative to lead creation (e.g., 2 days).</li>
              <li>Use "Send At" to pick a clock time (timezone-aware).</li>
              <li>Channels supported: SMS, WhatsApp, Email, LinkedIn.</li>
            </ul>
          </aside>
        </div>
      </main>
    
    </div>
    </MainLayout>
  );
};

export default SequencesPage;