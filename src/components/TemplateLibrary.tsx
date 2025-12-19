import React, { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import { Wand2, Trash2, Edit3, Save, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function TemplateLibrary() {
  const API_BASE = import.meta.env.VITE_API_BASE;
  const token = localStorage.getItem("token");
  const orgId = localStorage.getItem("org_id");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const [newCategoryName, setNewCategoryName] = useState("");
  const [data, setData] = useState([]);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);

  const fetchData = async () => {
    const res = await fetch(
      `${API_BASE}/ai/fetch/templates-by-category?org_id=${orgId}`,
      { headers }
    );
    setData(await res.json());
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ---------------- AI APPLY ---------------- */

  const applyAI = async () => {
    if (!editingTemplate?.content) return;

    setLoadingAI(true);

    const res = await fetch(`${API_BASE}/ai/generate/template`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        category_id: editingTemplate.category_id,
        seed_text: editingTemplate.content,
        channel: "email",
      }),
    });

    const result = await res.json();
    setEditingTemplate({ ...editingTemplate, content: result.template });
    setLoadingAI(false);
  };

  /* ---------------- SAVE TEMPLATE ---------------- */

  const saveTemplate = async () => {
    await fetch(
      `${API_BASE}/ai/templates/${editingTemplate.id}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify(editingTemplate),
      }
    );

    toast.success("Template updated");
    setEditingTemplate(null);
    fetchData();
  };

  /* ---------------- DELETE TEMPLATE ---------------- */

  const deleteTemplate = async (id) => {
    if (!confirm("Delete this template?")) return;

    await fetch(`${API_BASE}/ai/templates/${id}`, {
      method: "DELETE",
      headers,
    });

    toast.success("Template deleted");
    fetchData();
  };

  /* ---------------- CATEGORY ---------------- */

  const saveCategory = async () => {
    await fetch(
      `${API_BASE}/ai/template-categories/${editingCategory.id}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify({ name: editingCategory.name }),
      }
    );

    toast.success("Category updated");
    setEditingCategory(null);
    fetchData();
  };
  const trimText = (text, limit = 50) =>{
    const textTrimed=text.length > limit ? text.slice(0, limit) + "..." : text;
    return textTrimed
  }


  const deleteCategory = async (id) => {
    if (!confirm("Delete category and its templates?")) return;

    await fetch(`${API_BASE}/ai/template-categories/${id}`, {
      method: "DELETE",
      headers,
    });

    toast.success("Category deleted");
    fetchData();
  };
    const handleAddCategory = async () => {
    if (!newCategoryName) return;

    await fetch(`${API_BASE}/ai/template-categories`, {
      method: "POST",
      headers,
      body: JSON.stringify({ name: newCategoryName, org_id: orgId }),
    });

    setNewCategoryName("");
    fetchData();
  };


  return (
    <MainLayout>
      <Toaster />
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Template Library</h2>
          <div className="mb-6 border p-4 rounded">
          <h3 className="font-semibold mb-2">Add Category</h3>
          <input
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="border p-2 mr-2"
          />
          <button onClick={handleAddCategory} className="bg-blue-600 text-white px-4 py-2 rounded">
            Add
          </button>
        </div>
        {data.map((cat) => (
          <div key={cat.id} className="border rounded p-4 mb-6">
            <div className="flex justify-between items-center mb-3">
              {editingCategory?.id === cat.id ? (
                <>
                  <input
                    value={editingCategory.name}
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        name: e.target.value,
                      })
                    }
                    className="border p-1"
                  />
                  <button onClick={saveCategory}>
                    <Save size={16} />
                  </button>
                </>
              ) : (
                <>
                  <h3 className="font-semibold text-lg">{cat.name}</h3>
                  <div className="flex gap-2">
                    <Edit3
                      size={16}
                      onClick={() =>
                        setEditingCategory({ id: cat.id, name: cat.name })
                      }
                    />
                    <Trash2
                      size={16}
                      className="text-red-500"
                      onClick={() => deleteCategory(cat.id)}
                    />
                  </div>
                </>
              )}
            </div>

            {cat.templates.map((t) => (
              <div
                key={t.id}
                className="border rounded p-3 mb-2 flex justify-between"
              >
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    setEditingTemplate({
                      ...t,
                      category_id: cat.id,
                    })
                  }
                >
                  <div className="font-medium">{t.title}</div>
                     <p className="text-sm text-gray-600 truncate">
  {trimText(t.content, 50)}
</p>
                </div>

                <Trash2
                  size={16}
                  className="text-red-500 cursor-pointer"
                  onClick={() => deleteTemplate(t.id)}
                />
              </div>
            ))}
          </div>
        ))}

        {/* EDIT TEMPLATE MODAL */}
        {editingTemplate && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-6 rounded w-full max-w-xl">
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold">Edit Template</h3>
                <X onClick={() => setEditingTemplate(null)} />
              </div>

              <input
                className="border p-2 w-full mb-2"
                value={editingTemplate.title}
                onChange={(e) =>
                  setEditingTemplate({
                    ...editingTemplate,
                    title: e.target.value,
                  })
                }
              />

              <textarea
                rows={5}
                className="border p-2 w-full mb-2"
                value={editingTemplate.content}
                onChange={(e) =>
                  setEditingTemplate({
                    ...editingTemplate,
                    content: e.target.value,
                  })
                }
              />

              <div className="flex gap-2">
                <button
                  onClick={applyAI}
                  className="bg-orange-500 text-white px-3 py-2 rounded"
                >
                  {loadingAI ? "..." : <Wand2 size={16} />}
                </button>

                <button
                  onClick={saveTemplate}
                  className="bg-green-600 text-white px-3 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
