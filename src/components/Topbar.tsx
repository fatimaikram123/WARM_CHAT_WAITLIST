import React from "react";

const Topbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-30 bg-transparent px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-sm text-gray-600">Dashboard</div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 text-sm">
            <div className="text-gray-600">Workspace: <span className="font-medium text-gray-800">Team Alpha</span></div>
            {/* <div className="px-3 py-2 rounded-full bg-white shadow-sm text-sm">Notifications</div> */}
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold">M</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
