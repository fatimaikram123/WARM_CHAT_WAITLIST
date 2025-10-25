import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../components/MainLayout";

const CampaignDetails: React.FC = () => {
  const { id } = useParams();

  return (
    <MainLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          📈 Campaign Details — ID: {id}
        </h1>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-gray-700 mb-4">
            Detailed performance metrics and engagement tracking for this campaign will appear here.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="font-semibold text-gray-800">Sent</div>
              <div>3,200</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="font-semibold text-gray-800">Opens</div>
              <div>45%</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="font-semibold text-gray-800">Replies</div>
              <div>210</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="font-semibold text-gray-800">Status</div>
              <div>Running</div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CampaignDetails;
