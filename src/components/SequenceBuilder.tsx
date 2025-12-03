import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

type Step = {
  id: string;
  stepNumber: number;
  message: string;
  delayAmount: number;
  delayUnit: 'minutes' | 'hours' | 'days' | 'weeks' | 'months';
  sendAt: string;
  timezone: string;
  channel: 'sms' | 'whatsapp' | 'email' | 'linkedin';
};

const defaultStep = (n: number): Step => ({
  id: `${Date.now()}-${n}`,
  stepNumber: n,
  message: '',
  delayAmount: n === 1 ? 0 : 2,
  delayUnit: 'days',
  sendAt: '10:00',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
  channel: 'sms',
});

const SequenceBuilder: React.FC = () => {
  const [title, setTitle] = useState('');
  const [steps, setSteps] = useState<Step[]>([defaultStep(1), defaultStep(2)]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | '' }>({
    text: '',
    type: '',
  });

  const addStep = () => {
    const next = steps.length + 1;
    setSteps(prev => [...prev, defaultStep(next)]);
  };

  const removeStep = (id: string) => {
    if (steps.length === 1) return;
    setSteps(prev => prev.filter(s => s.id !== id).map((s, i) => ({ ...s, stepNumber: i + 1 })));
  };

  const updateStep = (id: string, patch: Partial<Step>) => {
    setSteps(prev => prev.map(s => (s.id === id ? { ...s, ...patch } : s)));
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setMessage({ text: 'Please enter a sequence title.', type: 'error' });
      return;
    }

    setSaving(true);
    setMessage({ text: '', type: '' });

    const payload = {
      title,
      steps: steps.map(s => ({
        stepNumber: s.stepNumber,
        message: s.message,
        delayAmount: s.delayAmount,
        delayUnit: s.delayUnit,
        sendAt: s.sendAt,
        timezone: s.timezone,
        channel: s.channel,
      })),
    };

    try {
    //   const res = await fetch('/api/sequences', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(payload),
    //   });

    //   if (!res.ok) throw new Error('Failed to save');

       setMessage({ text: 'Sequence saved successfully!', type: 'success' });
       setTitle('');
       setSteps([defaultStep(1), defaultStep(2)]);
     } 
    catch (err) {
       setMessage({ text: 'Error saving sequence. Try again later.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 border max-w-4xl mx-auto">
      {/* Title Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3">
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium text-gray-700">Sequence Title</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. 5-step Buyer Follow-up"
            className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-200 focus:ring-2 focus:ring-warmchats-primary"
          />
        </div>
        <div className="text-sm text-gray-500">Saved sequences can be assigned to leads</div>
      </div>

      <div className="space-y-5">
        {steps.map(s => (
          <div key={s.id} className="border rounded-lg p-5 relative bg-gray-50">
            {/* Step Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 flex items-center justify-center text-white font-bold">
                  {s.stepNumber}
                </div>
                <div>
                  <div className="text-sm font-medium">Step {s.stepNumber}</div>
                  <div className="text-xs text-gray-500">Delay from lead creation</div>
                </div>
              </div>

              <button
                onClick={() => removeStep(s.id)}
                className="p-2 hover:bg-gray-200 rounded-md text-gray-500"
              >
                <X size={16} />
              </button>
            </div>

            {/* Step Inputs */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Message Box */}
              <textarea
                value={s.message}
                onChange={e => updateStep(s.id, { message: e.target.value })}
                placeholder={`Message for step ${s.stepNumber} — use {{first_name}}`}
                className="col-span-1 md:col-span-2 w-full min-h-[90px] p-3 border rounded-md focus:ring-2 focus:ring-warmchats-primary"
              />

              {/* Delay Section */}
              <div className="flex items-center flex-wrap gap-2">
                <label className="text-sm w-24">Send After</label>
                <input
                  type="number"
                  min={0}
                  value={s.delayAmount}
                  onChange={e => updateStep(s.id, { delayAmount: Number(e.target.value) })}
                  className="w-20 px-2 py-1 rounded border"
                />
                <select
                  value={s.delayUnit}
                  onChange={e => updateStep(s.id, { delayUnit: e.target.value as any })}
                  className="px-2 py-1 rounded border"
                >
                  <option value="minutes">Minutes</option>
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                </select>
              </div>

              {/* Send At + Timezone */}
              <div className="flex flex-col gap-2">
                <label className="text-sm">Send At</label>
                <div className="flex flex-wrap gap-2">
                  <input
                    type="time"
                    value={s.sendAt}
                    onChange={e => updateStep(s.id, { sendAt: e.target.value })}
                    className="px-2 py-1 rounded border w-32"
                  />

                  <select
                    value={s.timezone}
                    onChange={e => updateStep(s.id, { timezone: e.target.value })}
                    className="px-2 py-1 rounded border w-full md:w-56"
                  >
                    <option value={Intl.DateTimeFormat().resolvedOptions().timeZone}>
                      Your Local Time ({Intl.DateTimeFormat().resolvedOptions().timeZone})
                    </option>

                    <optgroup label="Asia">
                      <option value="Asia/Karachi">Asia/Karachi (PKT)</option>
                      <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                      <option value="Asia/Qatar">Asia/Qatar (AST)</option>
                      <option value="Asia/Riyadh">Asia/Riyadh (AST)</option>
                      <option value="Asia/Singapore">Asia/Singapore (SGT)</option>
                    </optgroup>

                    <optgroup label="Europe">
                      <option value="Europe/London">Europe/London (GMT/BST)</option>
                      <option value="Europe/Berlin">Europe/Berlin (CET/CEST)</option>
                      <option value="Europe/Paris">Europe/Paris (CET/CEST)</option>
                    </optgroup>

                    <optgroup label="America">
                      <option value="America/New_York">America/New_York (EST/EDT)</option>
                      <option value="America/Chicago">America/Chicago (CST/CDT)</option>
                      <option value="America/Los_Angeles">America/Los_Angeles (PST/PDT)</option>
                    </optgroup>

                    <optgroup label="UTC">
                      <option value="UTC">UTC</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              {/* Channel */}
              <div className="flex flex-col gap-1">
                <label className="text-sm">Channel</label>
                <select
                  value={s.channel}
                  onChange={e => updateStep(s.id, { channel: e.target.value as any })}
                  className="px-2 py-1 rounded border"
                >
                  <option value="sms">SMS</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="email">Email</option>
                  <option value="linkedin">LinkedIn</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-gray-500">
                You can use variables like{' '}
                <code className="bg-gray-200 px-1 rounded">{"{{first_name}}"}</code>
              </div>

              <button
                onClick={() => {
                  const newStep: Step = {
                    ...s,
                    id: `${Date.now()}-dup`,
                    stepNumber: steps.length + 1,
                  };
                  setSteps(prev => [...prev, newStep]);
                }}
                className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm"
              >
                Duplicate
              </button>
            </div>
          </div>
        ))}

        {/* Footer Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={addStep}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-dashed hover:bg-gray-100"
          >
            <Plus size={16} /> Add Step
          </button>

          <div className="flex-1" />

          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-4 py-2 rounded-full font-semibold ${
              saving ? 'bg-gray-300 text-gray-700' : 'bg-warmchats-primary text-white'
            }`}
          >
            {saving ? 'Saving...' : 'Save Sequence'}
          </button>
        </div>

        {message.text && (
          <div
            className={`text-sm mt-2 ${
              message.type === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default SequenceBuilder;
