import { useState, useEffect } from "react";
import {
  MapPin,
  AlertTriangle,
  ArrowLeft,
  Calendar,
  MessageCircle,
  Share2,
  Bookmark,
  Eye,
  ThumbsUp,
  Tag,
} from "lucide-react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import CustomLoader from "./../../../components/User/CustomLoader";
import { useAuth } from "../../../context/User/AuthContext";

function ProblemDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const passedProblem = location.state?.problem || null;

  const [problem, setProblem] = useState(passedProblem);
  const [isLoading, setIsLoading] = useState(!passedProblem);
  const [error, setError] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const goBack = () => navigate(-1);

  useEffect(() => {
    if (passedProblem) return;

    const fetchProblem = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const res = await fetch(`/api/problems/${id}`);
        if (!res.ok) throw new Error("Failed to fetch problem");
        const data = await res.json();
        setProblem(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProblem();
  }, [id, passedProblem]);

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

  const getUrgencyColor = (urgency) => {
    switch (urgency?.toLowerCase()) {
      case "critical":
        return {bg: "bg-gray-500", label: "Critical", icon: "⚠️"}
      case "high":
        return { bg: "bg-red-500", label: "High", icon: "🔥" };
      case "moderate":
        return { bg: "bg-yellow-500", label: "Moderate", icon: "⚠️" };
      case "low":
        return { bg: "bg-green-500", label: "Low", icon: "✅" };
      default:
        return { bg: "bg-gray-500", label: "Unknown", icon: "❓" };
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

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-lg text-gray-600 animate-pulse">
            <CustomLoader /> {id}...
          </p>
        </div>
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <div className="text-center space-y-4 p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-[#0C2218]">
            Problem Not Found
          </h2>
          <p className="text-gray-600">
            The requested problem details could not be loaded.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-[#0C2218] text-white rounded-lg hover:bg-[#0C2212] transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(problem.status);
  const urgencyConfig = getUrgencyColor(problem.urgency);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="sticky top-[73px] z-10">
        <div className="max-w-8xl mx-auto px-20 py-4 flex items-center justify-between">
          <button
            onClick={goBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#0C2218] hover:bg-gray-200 rounded-lg transition-all duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Go Back</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="p-2 text-gray-600 hover:text-[#0C2218] hover:bg-gray-200 rounded-lg transition-all"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={handleBookmark}
              aria-label="Bookmark this problem"
              className={`p-2 rounded-lg transition-all ${
                isBookmarked
                  ? "text-yellow-600 bg-yellow-100"
                  : "text-gray-600 hover:text-yellow-600 hover:bg-gray-200"
              }`}
            >
              <Bookmark
                className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8 mt-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Badges */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex flex-wrap gap-3 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-white text-xs font-bold shadow-lg ${urgencyConfig.bg} flex items-center gap-1`}
                >
                  <span>{urgencyConfig.icon}</span>
                  {urgencyConfig.label}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-white text-xs font-medium shadow-lg ${statusConfig.bg} flex items-center gap-1`}
                >
                  <span>{statusConfig.icon}</span>
                  {statusConfig.text}
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {problem.title}
              </h1>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  {problem.upvotes?.length === 1 ? (
                    <span>{problem.upvotes.length} upvote</span>
                  ) : (
                    <span>{problem.upvotes?.length || 0} upvotes</span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{problem.commentsCount || 0} comments</span>
                </div>
              </div>
            </div>

            {/* Image */}
            {problem.image && (
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/20">
                <img
                  src={problem.image}
                  alt={problem.title}
                  className="w-full h-64 lg:h-96 object-cover rounded-xl shadow-lg"
                />
              </div>
            )}

            {/* Description */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                Description
              </h2>
              <p className="text-gray-700 whitespace-pre-line">
                {problem.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex flex-wrap gap-4">
                <button className="flex-1 min-w-32 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Add Comment
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Problem Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border border-red-100">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Location
                    </p>
                    <p className="text-sm text-gray-600">{problem.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Tag className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Category
                    </p>
                    <p className="text-sm text-gray-600">{problem.category}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-100">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Reported
                    </p>
                    <p className="text-sm text-gray-600">
                      {getTimeAgo(new Date(problem.createdAt))}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Reported By
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="w-12 h-12 md:w-12 md:h-12 rounded-full object-cover cursor-pointer border-2 border-[#0C2218] transition"
                    />
                  ) : (
                    <span>{problem.userId?.name?.charAt(0) || "U"}</span>
                  )}
                </div>

                <div>
                  <p className="font-medium text-gray-900">
                    {problem.userId?.name || "Anonymous User"}
                  </p>
                  <p className="text-sm text-gray-600">Local Public</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share this problem
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Report inappropriate content
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Follow for updates
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default ProblemDetails;
