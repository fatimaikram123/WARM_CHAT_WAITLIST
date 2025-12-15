import React from "react";

const Topbar: React.FC = () => {
  const username = localStorage.getItem("name") || "User";
  const firstLetter = username.charAt(0).toUpperCase();
  const org_name=localStorage.getItem("org_name")

  return (
    <header className="sticky top-0 z-30 bg-transparent px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-sm text-gray-600">Dashboard</div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 text-sm">
            <div className="text-gray-600">
              Workspace:{" "}
              <span className="font-medium text-gray-800">
                {org_name}
              </span>
            </div>
          </div>
           <div className="text-gray-800">
              <span className="font-medium">
                {username}
              </span>
            </div>
          

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold">
              {firstLetter}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
