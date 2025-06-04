import {
  MapPin,
  User,
  AlertTriangle,
  ThumbsUp,
  Eye,
  Calendar,
  MapPinHouse,
  MapPinned,
} from "lucide-react";
import { useState } from "react";
import axios from "../../../api/User/axios";
import { useAuth } from "../../../context/User/AuthContext";
import { useNavigate } from "react-router-dom";

const ProblemCard = ({ problem }) => {
  const [upvotes, setUpvotes] = useState(problem?.upvotes?.length || 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [hasUpvoted, setHasUpvoted] = useState(() =>
    problem?.upvotes?.includes(user?._id)
  );

  const handleUpvote = async (e) => {
    e.stopPropagation();
    if (!user) {
      setError("You must be logged in to upvote.");
      return;
    }
    setLoading(true);
    setError(null);

    const previousUpvotes = upvotes;
    const previousHasUpvoted = hasUpvoted;

    setUpvotes((prev) => (hasUpvoted ? prev - 1 : prev + 1));
    setHasUpvoted((prev) => !prev);

    try {
      const res = await axios.put(
        `/problems/${problem._id}/upvote`,
        {},
        { withCredentials: true }
      );

      setUpvotes(res.data.upvotes);
      setHasUpvoted(!previousHasUpvoted);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      setUpvotes(previousUpvotes);
      setHasUpvoted(previousHasUpvoted);
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0)
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    if (diffInHours > 0)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    if (diffInMinutes > 0)
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  const handleClick = () => {
    navigate(`/problems/${problem._id}`, { state: { problem } });
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency?.toLowerCase()) {
      case "high":
        return "from-red-500 to-red-600";
      case "moderate":
        return "from-yellow-500 to-orange-500";
      case "low":
        return "from-green-500 to-green-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "resolved":
        return { bg: "bg-emerald-500", text: "Resolved", icon: "✓" };
      case "process":
        return { bg: "bg-blue-500", text: "In Progress", icon: "⚡" };
      case "pending":
        return { bg: "bg-orange-500", text: "Pending", icon: "⏳" };
      default:
        return { bg: "bg-gray-500", text: "Unknown", icon: "?" };
    }
  };

  const statusConfig = getStatusConfig(problem.status);

  return (
    <div
      onClick={handleClick}
      className={`group relative cursor-pointer bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl border border-white/30 rounded-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-2}`}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Image section with overlay */}
      {problem.image && (
        <div className="relative h-60 overflow-hidden">
          <img
            src={problem.image}
            alt={problem.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* Urgency badge */}
          <div
            className={`absolute top-4 left-4 px-2 py-1 rounded-full bg-gradient-to-r ${getUrgencyColor(
              problem.urgency
            )} text-white text-xs font-bold shadow-lg flex items-center gap-1`}
          >
            <AlertTriangle className="w-3 h-3" />
            {problem.urgency?.toUpperCase() || "UNKNOWN"}
          </div>

          {/* Status badge */}
          <div
            className={`absolute top-4 right-4 px-2 py-1 rounded-full ${statusConfig.bg} text-white text-xs font-medium shadow-lg flex items-center gap-1`}
          >
            <span>{statusConfig.icon}</span>
            {statusConfig.text}
          </div>
        </div>
      )}

      {/* Content section */}
      <div className="relative p-6 space-y-4">
        {/* Title */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#0C2218] transition-colors duration-300">
            {problem.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
            {problem.description}
          </p>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-1 gap-3 text-sm">
          {/* Location */}
          <div className="flex items-center gap-3 p-2 rounded-lg bg-red-50 border border-red-100">
            <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <MapPin className="text-red-600 w-4 h-4" />
            </div>
            <span className="text-gray-800 font-medium">
              {problem.location}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-yellow-50 border border-yellow-100">
              <div className="flex-shrink-0 w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                <MapPinHouse className="text-yellow-600 w-3 h-3" />
              </div>
              <span className="text-gray-800 text-xs font-medium truncate">
                {problem.district || "Not specified"}
              </span>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-lg bg-lime-50 border border-lime-100">
              <div className="flex-shrink-0 w-6 h-6 bg-lime-100 rounded-full flex items-center justify-center">
                <MapPinned className="text-lime-600 w-3 h-3" />
              </div>
              <span className="text-gray-800 text-xs font-medium">
                {problem.state || "Not specified"}
              </span>
            </div>
          </div>

          {/* Category */}
          <div className="flex items-center gap-3 p-2 rounded-lg bg-blue-50 border border-blue-100">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Eye className="text-blue-600 w-4 h-4" />
            </div>
            <span className="text-gray-800 font-medium">
              {problem.category}
            </span>
          </div>

          {/* Reporter and Date */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-purple-50 border border-purple-100">
              <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="text-purple-600 w-3 h-3" />
              </div>
              <span className="text-gray-800 text-xs font-medium truncate">
                {problem.userId?.name || "Anonymous"}
              </span>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-lg bg-green-50 border border-green-100">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <Calendar className="text-green-600 w-3 h-3" />
              </div>
              <span className="text-gray-800 text-xs font-medium">
                {getTimeAgo(new Date(problem.createdAt))}
              </span>
            </div>
          </div>
        </div>

        {/* Actions bar */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <button
            onClick={handleUpvote}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
              hasUpvoted
                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                : "bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <ThumbsUp
              className={`w-4 h-4 transition-transform duration-300 ${
                hasUpvoted ? "scale-110" : ""
              }`}
            />
            {loading ? "Loading..." : hasUpvoted ? "Upvoted" : "Upvote"}
          </button>

          <div className="flex items-center gap-1 text-gray-600">
            <span className="text-lg font-bold text-blue-600">{upvotes}</span>
            {upvotes === 1 ? (
              <span className="text-sm">vote</span>
            ) : (
              <span className="text-sm">votes</span>
            )}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm font-medium">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemCard;
