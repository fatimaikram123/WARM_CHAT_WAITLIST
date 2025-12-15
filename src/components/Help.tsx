import React from "react";
import MainLayout from "../components/MainLayout";
import { Info } from "lucide-react";

const Help: React.FC = () => {
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-6 text-center">
          
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <Info className="w-6 h-6 text-orange-600" />
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Account Pending Setup
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed">
            Your account has been created successfully.
            <br />
            <span className="font-medium text-gray-800">
              Please wait until the administrator adds you to your organization.
            </span>
          </p>

          <div className="mt-6 text-xs text-gray-500">
            If you believe this is a mistake, please contact your organization administrator.
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Help;