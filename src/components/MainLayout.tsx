import React from "react";
import Sidebar from "../components/SideBar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="ml-72 flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
};

export default MainLayout;
