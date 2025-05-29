import { useLocation, useParams, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaUser,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

function ProblemDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { problem } = location.state || {};
  const { id } = useParams();

  if (!problem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-600">Loading problem details for ID: {id}...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#F4FBF7] to-[#DFF1E6] font-poppins">
      <div className="max-w-4xl mx-auto bg-white/30 backdrop-blur-lg shadow-lg rounded-3xl p-8 border border-white/20">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 hover:text-blue-800 mb-4"
        >
          ← Go Back
        </button>

        <h1 className="text-3xl font-bold text-[#0C2218] mb-4">{problem.title}</h1>

        {problem.image && (
          <img
            src={problem.image}
            alt={problem.title}
            className="w-full h-64 object-cover rounded-2xl mb-6 border border-white/20"
          />
        )}

        <div className="space-y-4 text-[#0C2218] text-sm">
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-500" />
            <span>{problem.location}</span>
          </p>

          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-500" />
            <span>Category: {problem.category}</span>
          </p>

          <p className="flex items-center gap-2">
            <FaExclamationTriangle className="text-yellow-500" />
            <span>Urgency: </span>
            <span
              className={`font-semibold ${
                problem.urgency === "high"
                  ? "text-red-600"
                  : problem.urgency === "moderate"
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              {problem.urgency}
            </span>
          </p>

          <p className="flex items-center gap-2">
            <FaClock className="text-blue-600" />
            <span>Status: </span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs ${
                problem.status === "Resolved"
                  ? "bg-green-600 text-white"
                  : problem.status === "Process"
                  ? "bg-yellow-600 text-white"
                  : problem.status === "Pending"
                  ? "bg-gray-600 text-white"
                  : "bg-blue-600 text-white"
              }`}
            >
              {problem.status}
            </span>
          </p>

          <p className="flex items-center gap-2">
            <FaUser className="text-purple-600" />
            <span>Reported by: {problem.userId?.name}</span>
          </p>

          <p className="text-xs text-gray-600">
            Reported {formatDistanceToNow(new Date(problem.createdAt), { addSuffix: true })}
          </p>
        </div>

        <hr className="my-6 border-t border-white/30" />

        <p className="text-gray-700 text-base">{problem.description}</p>
      </div>
    </div>
  );
}

export default ProblemDetails;