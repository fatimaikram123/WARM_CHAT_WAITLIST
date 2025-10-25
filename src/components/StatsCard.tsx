import React from "react";

type Props = {
  title: string;
  value: string;
  change?: string;
  subtitle?: string;
};

const StatsCard: React.FC<Props> = ({ title, value, change, subtitle }) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-gray-500">{title}</div>
          <div className="text-2xl font-semibold text-gray-800">{value}</div>
        </div>
        {change && (
          <div className={`text-sm font-medium ${change.startsWith("+") ? "text-green-600" : "text-red-500"}`}>
            {change}
          </div>
        )}
      </div>
      {subtitle && <div className="mt-3 text-xs text-gray-500">{subtitle}</div>}
    </div>
  );
};

export default StatsCard;
