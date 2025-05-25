import { useState, useEffect } from "react";
import axios from "../../../api/Admin/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminProblems = () => {
  const [problems, setProblems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [urgencyFilter, setUrgencyFilter] = useState("");
  const [error, setError] = useState(null);

  // Fetch all problems on mount
  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("/problems", { withCredentials: true });
        if (res.data && Array.isArray(res.data)) {
          setProblems(res.data);
          setFiltered(res.data);
        } else {
          setProblems([]);
          setFiltered([]);
          setError("No problems data found.");
          toast.error("No problems data found.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch problems. Please try again.");
        toast.error("Failed to fetch problems. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  // Apply filters on problems array
  useEffect(() => {
    let list = [...problems];
    if (categoryFilter) {
      list = list.filter((p) => p.category === categoryFilter);
    }
    if (urgencyFilter) {
      list = list.filter((p) => p.urgency === urgencyFilter);
    }
    setFiltered(list);
  }, [categoryFilter, urgencyFilter, problems]);

  // Handle status update for a problem
  const handleStatusUpdate = async (id, updatedStatus) => {
    try {
      const res = await axios.put(
        `/problems/${id}/status`,
        { status: updatedStatus },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setProblems((prevProblems) =>
          prevProblems.map((problem) =>
            problem._id === id ? { ...problem, status: updatedStatus } : problem
          )
        );
        toast.success("Status updated successfully!");
      } else {
        throw new Error("Failed to update status");
      }
    } catch (err) {
      console.error(err);
      toast.error("Status update failed. Please try again.");
    }
  };

  const clearFilters = () => {
    setCategoryFilter("");
    setUrgencyFilter("");
  };

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-3xl font-bold text-blue-800 mb-6">
        🛠️ Admin - All Problems
      </h1>

      {error && (
        <div className="bg-red-200 text-red-800 p-4 rounded mb-4">{error}</div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border rounded-md text-sm"
        >
          <option value="">Filter by Category</option>
          <option value="electricity">Electricity</option>
          <option value="water">Water</option>
          <option value="road">Road</option>
          <option value="other">Other</option>
        </select>

        <select
          value={urgencyFilter}
          onChange={(e) => setUrgencyFilter(e.target.value)}
          className="px-4 py-2 border rounded-md text-sm"
        >
          <option value="">Filter by Urgency</option>
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
        </select>

        <button
          onClick={clearFilters}
          className="px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 rounded-md text-sm"
        >
          Clear Filters
        </button>
      </div>

      {/* Problems Table */}
      {loading ? (
        <p className="text-gray-600">Loading problems...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-600">No problems match the filter.</p>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-blue-100 text-blue-800 text-left">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Urgency</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((problem) => (
                <tr key={problem._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{problem.title}</td>
                  <td className="px-4 py-2">{problem.category}</td>
                  <td className="px-4 py-2">{problem.urgency}</td>
                  <td className="px-4 py-2">{problem.location}</td>
                  <td className="px-4 py-2">{problem.contact}</td>
                  <td className="px-4 py-2">
                    <select
                      value={problem.status}
                      onChange={(e) =>
                        handleStatusUpdate(problem._id, e.target.value)
                      }
                      className={`text-xs px-2 py-1 rounded border font-semibold
                        ${
                          problem.status === "Resolved"
                            ? "bg-green-200 text-green-800"
                            : problem.status === "Process"
                            ? "bg-blue-200 text-blue-800"
                            : "bg-yellow-200 text-yellow-800"
                        }
                      `}
                    >
                      <option
                        value="Pending"
                        className="text-yellow-800 bg-yellow-100"
                      >
                        Pending
                      </option>
                      <option
                        value="Process"
                        className="text-blue-800 bg-blue-100"
                      >
                        Process
                      </option>
                      <option
                        value="Resolved"
                        className="text-green-800 bg-green-100"
                      >
                        Resolved
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProblems;