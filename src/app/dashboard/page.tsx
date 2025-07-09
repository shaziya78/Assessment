"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFeedback } from "../../../FeedbackContext";

export default function Dashboard() {
  const [listings, setListings] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState("all");

  const router = useRouter();
  const { showMessage } = useFeedback();

  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      router.push("/");
    } else {
      fetchListings(page);
    }
  }, [page, filter]);

  const fetchListings = async (page = 1) => {
    const res = await fetch(
      `/api/listings?page=${page}&limit=10&status=${filter}`
    );
    const result = await res.json();
    setListings(result.data);
    setTotalPages(result.totalPages);
  };
  const handleAction = async (id: number, action: string) => {
    const res = await fetch("/api/listings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" ,    "x-admin-user": localStorage.getItem("username") || "unknown",},
      
      body: JSON.stringify({ id, action }),
    });

    fetchListings(page);
    showMessage(`Listing ${action}ed`);
  };

  return (
    <div className="p-10">
    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
  <div className="mb-4 md:mb-0">
    <h1 className="text-xl font-bold">Admin Dashboard</h1>
    <p className="text-sm text-gray-500">The details are given below:</p>
  </div>
  <div className="flex items-center space-x-2 mb-4 md:mb-0">
    <h1 className="text-sm">Filter:</h1>
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="border p-2 rounded text-sm outline-0"
    >
      <option value="all" className="text-black text-sm">All</option>
      <option value="approved" className="text-black text-sm">Approved</option>
      <option value="rejected" className="text-black text-sm">Rejected</option>
    </select>
  </div>
</div>

      <div className="rounded-2xl border overflow-x-auto ">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr>
              <th className="p-2 border text-sm">ID</th>
              <th className="p-2 border text-sm">Car Name</th>
              <th className="p-2 border text-sm">Owner</th>
              <th className="p-2 border text-sm">Status</th>
              <th className="p-2 border text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="cursor-pointer">
            {listings.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-900 transition duration-200 text-center"
              >
                <td className="p-2 border text-sm">{item.id}</td>
                <td className="p-2 border text-sm">{item.car}</td>
                <td className="p-2 border text-sm">{item.owner}</td>
                <td className="p-2 border text-sm">{item.status}</td>
                <td className="p-2 border">
                  <button
                    className="bg-green-500 text-sm text-white px-4 py-1 mr-2 rounded"
                    onClick={() => handleAction(item.id, "Approve")}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-sm text-white px-4 py-1 mr-2 rounded"
                    onClick={() => handleAction(item.id, "Reject")}
                  >
                    Reject
                  </button>
                  <button
                    className="bg-yellow-500 text-sm text-white px-4 py-1 rounded"
                     onClick={() => router.push(`/dashboard/edit/${item.id}`)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 
      <div className="flex justify-center mt-4 space-x-2">
        <button
          className="px-4 py-2 bg-gray-500 rounded disabled:opacity-50 text-sm"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          &larr;
        </button>
        <span className="px-4 py-2 text-sm">
          {page} / {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-500 rounded disabled:opacity-50 text-sm"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
}
