// TemplateManager.jsx
import React, { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import { Wand2 } from "lucide-react";
import toast,{Toaster} from "react-hot-toast";
export default function TemplateManager() {
  const orgId = localStorage.getItem("org_id");
  const userName = localStorage.getItem("name");
  const token = localStorage.getItem("token");
  const API_BASE = import.meta.env.VITE_API_BASE;

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const [categories, setCategories] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [tones, setTones] = useState([]);
  const [personas, setPersonas] = useState([]);

  const [loadingAI, setLoadingAI] = useState(false);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newTemplate, setNewTemplate] = useState({
    title: "",
    content: "",
    category_id: "",
  });

  const [selectedTone, setSelectedTone] = useState("");
  const [selectedPersona, setSelectedPersona] = useState("");

  /* ---------------- FETCH DATA ---------------- */

  const fetchAll = async () => {
    try {
      const [
        catRes,
        tempRes,
        toneRes,
        personaRes,
      ] = await Promise.all([
        fetch(`${API_BASE}/api/ai/fetch/template-categories?org_id=${orgId}`, { headers }).then(r => r.json()),
        fetch(`${API_BASE}/api/ai/fetch/templates?org_id=${orgId}`, { headers }).then(r => r.json()),
        fetch(`${API_BASE}/api/ai/tones`, { headers }).then(r => r.json()),
        fetch(`${API_BASE}/api/ai/personas`, { headers }).then(r => r.json()),
      ]);

      setCategories(catRes);
      setTemplates(tempRes);
      setTones(toneRes);
      setPersonas(personaRes);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  /* ---------------- AI IMPROVE ---------------- */

  const handleImproveMessage = async () => {
    
    if(newTemplate.category_id === "") toast.error("Please select a category first");

    setLoadingAI(true);

    try {
       const res = await fetch(`${API_BASE}/api/ai/generate/template`, {
  method: "POST",
  headers,
  body: JSON.stringify({
    category_id: newTemplate.category_id,
    seed_text: newTemplate.content, // textarea text
    tone: selectedTone,
    persona: selectedPersona,
    channel: "email",
    lead_data: [],
  }),
});

const data = await res.json();

setNewTemplate({
  ...newTemplate,
  content: data.template,
});
    } catch (e) {
      console.error(e);
    }

    setLoadingAI(false);
  };

  /* ---------------- CREATE CATEGORY ---------------- */

 
  /* ---------------- CREATE TEMPLATE ---------------- */

  const handleAddTemplate = async () => {
    const { title, content, category_id } = newTemplate;
    if (!title || !content || !category_id) return;

    await fetch(`${API_BASE}/api/ai/templates`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        ...newTemplate,
        org_id: orgId,
        created_by: userName,
      }),
    });

    setNewTemplate({ title: "", content: "", category_id: "" });
    fetchAll();
  };

  /* ---------------- UI ---------------- */

  return (
    <MainLayout>
    <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Template Manager</h2>

     

        {/* Template Creator */}
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Create Template</h3>

          <input
            placeholder="Title"
            value={newTemplate.title}
            onChange={(e) => setNewTemplate({ ...newTemplate, title: e.target.value })}
            className="border p-2 w-full mb-2"
          />
           <div className="flex gap-2 mb-2">
            <select onChange={(e) => setSelectedTone(e.target.value)} className="border p-2 w-full">
              <option value="">Tone</option>
              {tones.map(t => <option key={t.id} value={t.label}>{t.label}</option>)}
            </select>

            <select onChange={(e) => setSelectedPersona(e.target.value)} className="border p-2 w-full">
              <option value="">Persona</option>
              {personas.map(p => <option key={p.id} value={p.label}>{p.label}</option>)}
            </select>

           
          </div>
            <div className="flex gap-2 mb-2"> 
           <select
            value={newTemplate.category_id}
            onChange={(e) => setNewTemplate({ ...newTemplate, category_id: e.target.value })}
            className="border p-2 w-full mb-2"
          >
            <option value="">Category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          </div>
            <div className="relative mb-2">
                      <textarea
                     value={newTemplate.content}
                     onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}

                        rows={5}
                        placeholder="Add template Message ..."
                        className="w-full border border-gray-300 rounded-2xl px-4 py-3 pr-20 text-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      ></textarea>
          
                      <div className="absolute top-3 right-3">
                        <button
                          onClick={handleImproveMessage}
                          className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full shadow-md flex items-center justify-center"
                          title="Improve Message"
                        >
                          {loadingAI ? (
                            <span className="animate-spin w-4 h-4 border-2 border-white rounded-full border-t-transparent"></span>
                          ) : (
                            <Wand2 size={16} />
                          )}
                        </button>
                      </div>
                    </div>  
          <button onClick={handleAddTemplate} className="bg-green-600 text-white px-4 py-2 rounded">
            Save Template
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
