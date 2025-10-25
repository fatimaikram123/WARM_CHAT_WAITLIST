import React, { useState } from "react";
import MainLayout from "../components/MainLayout";
import { Clock, PlusCircle, Trash2, Sparkles } from "lucide-react";

const CreateFollowUp: React.FC = () => {
  const [steps, setSteps] = useState([
    { id: 1, delay: "2 days", trigger: "If not replied", message: "" },
  ]);

  const [useAI, setUseAI] = useState(false);

  // Add a new follow-up step
  const addStep = () => {
    setSteps([
      ...steps,
      {
        id: steps.length + 1,
        delay: "3 days",
        trigger: "If not opened",
        message: "",
      },
    ]);
  };

  // Remove a follow-up step
  const removeStep = (id: number) => {
    setSteps(steps.filter((step) => step.id !== id));
  };

  // Update message or settings
  const updateStep = (id: number, key: string, value: string) => {
    setSteps(
      steps.map((s) => (s.id === id ? { ...s, [key]: value } : s))
    );
  };

  // Mock AI suggestion
  const generateAIMessage = (id: number) => {
    updateStep(
      id,
      "message",
      "Hey there 👋, just following up to see if you had a chance to review my last email. Let me know your thoughts!"
    );
  };

  return (
    <MainLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            ✉️ Create Follow-Up Sequence
          </h1>
          <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow hover:shadow-md transition">
            Save Sequence
          </button>
        </div>

        {/* AI Mode Toggle */}
        <div className="flex items-center justify-between bg-white p-5 rounded-xl shadow-sm mb-6 border border-gray-100">
          <div>
            <h2 className="font-semibold text-gray-800">
              Use AI Message Writer
            </h2>
            <p className="text-sm text-gray-500">
              AI will automatically draft tone-optimized follow-up messages.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={useAI}
              onChange={() => setUseAI(!useAI)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-orange-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>

        {/* Follow-Up Steps */}
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-6"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-800">
                Step {index + 1}
              </h2>
              <button
                onClick={() => removeStep(step.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Delay */}
              <div>
                <label className="text-sm text-gray-600">Delay</label>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <input
                    type="text"
                    value={step.delay}
                    onChange={(e) =>
                      updateStep(step.id, "delay", e.target.value)
                    }
                    className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                  />
                </div>
              </div>

              {/* Trigger */}
              <div>
                <label className="text-sm text-gray-600">Trigger</label>
                <select
                  value={step.trigger}
                  onChange={(e) =>
                    updateStep(step.id, "trigger", e.target.value)
                  }
                  className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                >
                  <option>If not opened</option>
                  <option>If not replied</option>
                  <option>If opened but not clicked</option>
                </select>
              </div>

              {/* AI Button */}
              <div className="flex items-end">
                {useAI && (
                  <button
                    onClick={() => generateAIMessage(step.id)}
                    className="flex items-center gap-2 w-full justify-center px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-md transition"
                  >
                    <Sparkles className="w-4 h-4" /> Generate with AI
                  </button>
                )}
              </div>
            </div>

            {/* Message Box */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Message Content
              </label>
              <textarea
                value={step.message}
                onChange={(e) =>
                  updateStep(step.id, "message", e.target.value)
                }
                placeholder="Write your follow-up message..."
                className="border border-gray-300 rounded-lg px-3 py-2 w-full text-sm h-28 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>
          </div>
        ))}

        {/* Add New Step */}
        <button
          onClick={addStep}
          className="flex items-center gap-2 px-5 py-3 border border-dashed border-orange-400 text-orange-500 rounded-lg hover:bg-orange-50 transition"
        >
          <PlusCircle className="w-5 h-5" /> Add Another Step
        </button>
      </div>
    </MainLayout>
  );
};

export default CreateFollowUp;
