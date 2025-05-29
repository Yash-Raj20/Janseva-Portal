import { useEffect, useState } from "react";
import axios from "../../../api/User/axios";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";

export default function SolvedIssues() {
  const [solved, setSolved] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);

  const itemsPerPage = 6;

  useEffect(() => {
    axios
      .get("/auth/profile", {
        withCredentials: true,
      })
      .then((res) => {
        const all = res.data.problems || [];
        const resolved = all.filter((p) => p.status === "Resolved");
        setSolved(resolved);
      })
      .catch(() => {
        toast.error("Failed to load solved issues. Please try again later.");
        setError(true);
      })
  }, []);

  const totalPages = Math.max(1, Math.ceil(solved.length / itemsPerPage));
  const paginatedData = solved.slice((page - 1) * itemsPerPage, page * itemsPerPage);


  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
        Failed to load solved issues. Please try again later.
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-100 to-white text-[#0C2218]">
      <div className="p-6 flex-grow">
        <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-2 pb-3 border-b-2">
          <FaCheckCircle className="text-green-600" /> Solved Issues
        </h2>

        {solved.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedData.map((issue) => (
              <div
                key={issue._id}
                className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
              >
                <h4 className="text-xl font-semibold mb-2 text-green-800">{issue.title}</h4>
                <p className="text-gray-700 mb-3">{issue.description}</p>
                <span className="inline-block px-3 py-1 text-sm bg-green-200 text-green-800 rounded-full">
                  Status: {issue.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-20">
            Your haven't solved any issues yet. Keep going! 🚀
          </p>
        )}
      </div>

      {/* Pagination ALWAYS pinned at bottom of the page */}
      <div className="py-4 flex justify-center gap-2 flex-wrap border-t border-gray-200">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-1 text-[#0C2218] bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        {[...Array(totalPages).keys()].map((idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx + 1)}
            className={`px-3 py-1 rounded ${
              page === idx + 1
                ? "bg-[#0C2218] text-white font-bold"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-1 text-[#0C2218] bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}