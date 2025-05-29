import {
  FaMapMarkerAlt,
  FaUser,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import axios from "../../../api/User/axios";
import { useAuth } from "../../../context/User/AuthContext";
import { useNavigate } from "react-router-dom";

const ProblemCard = ({ problem }) => {
  const [upvotes, setUpvotes] = useState(problem.upvotes?.length || 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();


  const handleUpvote = async () => {
    if (!token) {
      setError("You must be logged in to upvote.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        `/problems/${problem._id}/upvote`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
        {withCredentials: true}
      );
      setUpvotes(res.data.upvotes);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    navigate(`/problems/${problem._id}`, { state: { problem } });
  };

  return (
    <div onClick={handleClick} className="cursor-pointer bg-white/30 backdrop-blur-lg border border-white/20 rounded-3xl p-5 shadow-md hover:shadow-xl transition-transform text-gray-200">
      {problem.image && (
        <img
          src={problem.image}
          alt={problem.title}
          className="w-full h-48 object-cover rounded-xl mb-4 border border-white/20"
        />
      )}

      <h3 className="text-xl font-bold mb-2 text-[#0C2218]">{problem.title}</h3>
      <p className="text-sm text-gray-700 mb-4 line-clamp-3">
        {problem.description}
      </p>

      <div className="space-y-2 text-sm">
        <p className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-red-500" />{" "}
          <span className="text-[#0C2218]">{problem.location}</span>
        </p>
        <p className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-red-500" />{" "}
          <span className="text-[#0C2218]">{problem.category}</span>
        </p>
        <p className="flex items-center gap-2">
          <FaExclamationTriangle className="text-yellow-500" />{" "}
          <span className="text-gray-600">Urgency: </span>
          <span
            className={`font-semibold ${
              problem.urgency === "high"
                ? "text-red-500"
                : problem.urgency === "moderate"
                ? "text-yellow-500"
                : "text-green-500"
            }`}
          >
            {problem.urgency}
          </span>
        </p>
        <p className="flex items-center gap-2">
          <FaClock className="text-blue-600" />{" "}
          <span className="text-gray-600">Status: </span>
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
          <span className="text-[#0C2218]"> {problem.userId?.name}</span>
        </p>
        <p className="text-xs text-gray-600">
          Reported{" "}
          {formatDistanceToNow(new Date(problem.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handleUpvote}
          disabled={loading}
          className="flex items-center gap-1 text-blue-500 hover:text-[#0C2218] text-sm"
        >
          👍 Upvote
        </button>
        <span className="text-sm text-[#0C2218]">{upvotes} Upvotes</span>
      </div>

      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </div>
  );
};

export default ProblemCard;
