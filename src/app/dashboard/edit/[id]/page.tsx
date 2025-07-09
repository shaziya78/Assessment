"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditListingPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`/api/listing/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setItem(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error:", err);
          setLoading(false);
        });
    }
  }, [id]);

  const handleSave = async () => {
    setSaving(true);

    console.log("Saving item:", item);

    try {
      const res = await fetch(`/api/listing/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" ,   "x-admin-user": localStorage.getItem("username") || "unknown"},
        body: JSON.stringify(item),
      });

      const result = await res.json();
      console.log("Response from PUT:", result);

      setSaving(false);
      router.push("/dashboard");
    } catch (err) {
      console.error("Save failed:", err);
      setSaving(false);
    }
  };

  if (loading || !item) return <div className="p-10">Loading...</div>;

  return (
 <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
  <div className="w-full max-w-md bg-black p-6 sm:p-8 rounded-2xl shadow-md">
    <h2 className="text-xl sm:text-2xl font-bold mb-6 text-white text-center">
      Edit Listing #{id}
    </h2>

    <label className="block mb-1 text-sm text-gray-400">Car Name</label>
    <input
      type="text"
      className="border border-gray-600 bg-transparent text-sm text-white p-2 w-full mb-4 rounded"
      value={item.car}
      onChange={(e) => setItem({ ...item, car: e.target.value })}
      placeholder="Enter car name"
    />

    <label className="block mb-1 text-sm text-gray-400">Owner Name</label>
    <input
      type="text"
      className="border border-gray-600 bg-transparent text-sm text-white p-2 w-full mb-6 rounded"
      value={item.owner}
      onChange={(e) => setItem({ ...item, owner: e.target.value })}
      placeholder="Enter owner name"
    />

    <button
      className="bg-white text-black w-full text-sm font-semibold px-4 py-2 rounded hover:bg-gray-200 transition"
      onClick={handleSave}
      disabled={saving}
    >
      {saving ? "Saving..." : "Save Changes"}
    </button>
  </div>
</div>


  );
}
