import { FaMapMarkerAlt, FaUser, FaClock, FaExclamationTriangle } from "react-icons/fa";
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import axios from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const ProblemCard = ({ problem }) => {
  const [upvotes, setUpvotes] = useState(problem.upvotes.length);
  const { token } = useAuth(); // Get the token from the context

  const handleUpvote = async () => {
    try {
      // If user is not logged in, show an alert
      if (!token) {
        alert('You must be logged in to upvote.');
        return;
      }

      // Send a POST request with the Authorization header
      const res = await axios.post(
        `/problems/${problem._id}/upvote`, 
        {}, // Empty body, no additional data is needed
        { 
          headers: { 
            'Authorization': `Bearer ${token}`, // Include token if logged in
          }
        }
      );

      // Update the upvotes state with the response from the backend
      setUpvotes(res.data.upvotes); 
    } catch (err) {
      // Handle different types of errors, especially token expiration
      if (err.response?.status === 401) {
        alert('Your session has expired. Please log in again.');
      } else {
        alert(err.response?.data?.message || 'An error occurred');
      }
    }
  };

  return (
    <div className="border rounded-2xl p-4 shadow-lg bg-white hover:shadow-xl transition-all duration-300 space-y-4">
      <h3 className="font-bold text-2xl text-gray-800">{problem.title}</h3>

      <p className="text-gray-700">{problem.description}</p>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <p className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-red-500" /> {problem.location}
        </p>
        <p className="flex items-center gap-2">
          <FaExclamationTriangle className="text-yellow-500" /> 
          <span className="font-medium">Urgency:</span> 
          <span className="text-yellow-700">{problem.urgency}</span>
        </p>
        <p className="flex items-center gap-2">
          <FaClock className="text-blue-500" /> 
          <span className="font-medium">Status:</span> 
          <span className={`px-2 py-1 rounded-full text-white text-xs ${problem.status === 'Resolved' ? 'bg-green-500' : 'bg-blue-500'}`}>
            {problem.status}
          </span>
        </p>
        <p className="flex items-center gap-2">
          <FaUser className="text-purple-500" /> 
          {problem.userId?.name} ({problem.userId?.email})
        </p>
      </div>

      {problem.createdAt && (
        <p className="text-xs text-gray-500">
          Reported {formatDistanceToNow(new Date(problem.createdAt), { addSuffix: true })}
        </p>
      )}

      {/* Upvote Button */}
      <div className="flex justify-between items-center pt-3">
        <button onClick={handleUpvote} className="flex items-center gap-2 text-blue-600 font-semibold hover:underline">
          👍 Upvote
        </button>
        <span className="text-gray-600">{upvotes} Upvotes</span>
      </div>

      <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
        <p className="text-sm text-yellow-700">
          Thank you for reporting this issue. Our team will review and take action soon.
        </p>
      </div>
    </div>
  );
};

export default ProblemCard;