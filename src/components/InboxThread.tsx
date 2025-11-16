import React from "react";

export default function InboxThread({ selected }: any) {
  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
      <div className="bg-white rounded-lg shadow p-4">
        <p className="text-sm text-gray-600">From: {selected.from}</p>
        <h2 className="text-lg font-semibold text-gray-800 mt-2">
          {selected.subject || "No Subject"}
        </h2>
        <p className="mt-3 text-gray-700 whitespace-pre-wrap">{selected.body}</p>
      </div>
    </div>
  );
}
