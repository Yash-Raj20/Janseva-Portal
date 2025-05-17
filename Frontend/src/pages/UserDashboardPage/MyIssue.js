import { useEffect, useState } from "react";
import axios from "axios";
import { FaExclamationCircle } from "react-icons/fa";

export default function MyIssues() {
  const [pending, setPending] = useState([]);
  const [process, setProcess] = useState([]);
  const [pendingPage, setPendingPage] = useState(1);
  const [processPage, setProcessPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const all = res.data.problems || [];
        setPending(all.filter((p) => p.status !== "Resolved" && p.status !== "Process"));
        setProcess(all.filter((p) => p.status === "Process"));
      });
  }, []);

  const paginate = (data, page) => {
    const start = (page - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  const totalPages = (data) => Math.ceil(data.length / itemsPerPage);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-yellow-50 to-white text-[#0C2218]">
      <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-2 pb-3 border-b-2">
        <FaExclamationCircle className="text-yellow-600" /> My Issues
      </h2>

      {/* PENDING ISSUES */}
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">🕒 Pending Issues</h2>
      {pending.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {paginate(pending, pendingPage).map((issue) => (
              <div
                key={issue._id}
                className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
              >
                <h4 className="text-xl font-semibold mb-2 text-green-800">{issue.title}</h4>
                <p className="text-gray-700 mb-3">{issue.description}</p>
                <span className="inline-block px-3 py-1 text-sm bg-yellow-200 text-yellow-800 rounded-full">
                  Status: {issue.status}
                </span>
              </div>
            ))}
          </div>

          {/* Pending Pagination */}
          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            <button
              onClick={() => setPendingPage((p) => Math.max(p - 1, 1))}
              disabled={pendingPage === 1}
              className="px-4 py-1 text-[#0C2218] bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            {[...Array(totalPages(pending)).keys()].map((idx) => (
              <button
                key={idx}
                onClick={() => setPendingPage(idx + 1)}
                className={`px-3 py-1 rounded ${
                  pendingPage === idx + 1
                    ? "bg-[#0C2218] text-white font-bold"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setPendingPage((p) => Math.min(p + 1, totalPages(pending)))}
              disabled={pendingPage === totalPages(pending)}
              className="px-4 py-1 text-[#0C2218] bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 mt-10">You have no pending issues at the moment. 🎉</p>
      )}

      {/* UNDER PROCESS ISSUES */}
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">🔄 Under Process Issues</h2>
      {process.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {paginate(process, processPage).map((issue) => (
              <div
                key={issue._id}
                className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
              >
                <h4 className="text-xl font-semibold mb-2 text-green-800">{issue.title}</h4>
                <p className="text-gray-700 mb-3">{issue.description}</p>
                <span className="inline-block px-3 py-1 text-sm text-blue-800 bg-blue-100 rounded-full">
                  Status: {issue.status}
                </span>
              </div>
            ))}
          </div>

          {/* Process Pagination */}
          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            <button
              onClick={() => setProcessPage((p) => Math.max(p - 1, 1))}
              disabled={processPage === 1}
              className="px-4 py-1 text-[#0C2218] bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            {[...Array(totalPages(process)).keys()].map((idx) => (
              <button
                key={idx}
                onClick={() => setProcessPage(idx + 1)}
                className={`px-3 py-1 rounded ${
                  processPage === idx + 1
                    ? "bg-[#0C2218] text-white font-bold"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setProcessPage((p) => Math.min(p + 1, totalPages(process)))}
              disabled={processPage === totalPages(process)}
              className="px-4 py-1 text-[#0C2218] bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 mt-10">You have no issues under process at the moment. 🎉</p>
      )}
    </div>
  );
}