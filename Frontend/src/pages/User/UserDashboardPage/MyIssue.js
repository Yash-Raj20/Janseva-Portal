import { useEffect, useState } from "react";
import axios from "../../../api/User/axios";
import { FaExclamationCircle } from "react-icons/fa";
import { toast } from "react-toastify";

export default function MyIssues() {
  const [pending, setPending] = useState([]);
  const [process, setProcess] = useState([]);
  const [pendingPage, setPendingPage] = useState(1);
  const [processPage, setProcessPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const itemsPerPage = 3;

  useEffect(() => {
    setLoading(true);
    setError(false);

    axios
      .get("/auth/profile", { withCredentials: true })
      .then((res) => {
        const all = res.data.problems || [];
        setPending(all.filter((p) => p.status !== "Resolved" && p.status !== "Process"));
        setProcess(all.filter((p) => p.status === "Process"));
      })
      .catch((err) => {
        console.error("Failed to load issues:", err);
        toast.error("Failed to load your issues. Please try again later.");
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const paginate = (data, page) => {
    const start = (page - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  const totalPages = (data) => Math.ceil(data.length / itemsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <img
          src="/assets/loader.svg"
          alt="Loading..."
          className="w-16 h-16 animate-spin"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load your issues. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-yellow-50 to-white text-[#0C2218]">
      <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-2 pb-3 border-b-2">
        <FaExclamationCircle className="text-yellow-600" /> My Issues
      </h2>

      <div className="flex flex-col lg:flex-col sm:flex-col gap-10">
      {/* PENDING ISSUES */}
      <section>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">🕒 Pending Issues</h2>
        {pending.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {paginate(pending, pendingPage).map((issue) => (
                <IssueCard key={issue._id} issue={issue} bgColor="bg-yellow-200" textColor="text-yellow-800" />
              ))}
            </div>

            {/* Pending Pagination */}
            <Pagination
              currentPage={pendingPage}
              totalPages={totalPages(pending)}
              onPageChange={setPendingPage}
            />
          </>
        ) : (
          <p className="text-center text-gray-500 mt-20">
            You have no pending issues at the moment. 🎉
          </p>
        )}
      </section>

      {/* UNDER PROCESS ISSUES */}
      <section>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">🔄 Under Process Issues</h2>
        {process.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {paginate(process, processPage).map((issue) => (
                <IssueCard key={issue._id} issue={issue} bgColor="bg-blue-100" textColor="text-blue-800" />
              ))}
            </div>

            {/* Process Pagination */}
            <Pagination
              currentPage={processPage}
              totalPages={totalPages(process)}
              onPageChange={setProcessPage}
            />
          </>
        ) : (
          <p className="text-center text-gray-500 mt-20">
            You have no issues under process at the moment. 🎉
          </p>
        )}
      </section>
      </div>

    </div>
  );
}

function IssueCard({ issue, bgColor, textColor }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
      <h4 className={`text-xl font-semibold mb-2 text-green-800`}>{issue.title}</h4>
      <p className="text-gray-700 mb-3">{issue.description}</p>
      <span
        className={`inline-block px-3 py-1 text-sm rounded-full ${bgColor} ${textColor}`}
      >
        Status: {issue.status}
      </span>
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center gap-2 mb-10 flex-wrap">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-1 text-[#0C2218] bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        Previous
      </button>
      {[...Array(totalPages).keys()].map((idx) => (
        <button
          key={idx}
          onClick={() => onPageChange(idx + 1)}
          className={`px-3 py-1 rounded ${
            currentPage === idx + 1
              ? "bg-[#0C2218] text-white font-bold"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {idx + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-1 text-[#0C2218] bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}