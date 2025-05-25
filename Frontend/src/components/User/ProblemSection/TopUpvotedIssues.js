import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TopUpvotedIssues() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchTopIssues = async () => {
      try {
        const res = await axios.get('/api/problems/top-upvoted'); // Use relative path if proxy is setup
        setProblems(res.data);
      } catch (err) {
        console.error('Error fetching top issues', err);
      }
    };

    fetchTopIssues();
  }, []);

  if (problems.length === 0) return <p className="p-5 text-center text-gray-500">No top trending problems found.</p>;

  return (
    <div className="p-5 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-blue-700 mb-5">🔥 Top Trending Problems</h2>
      <div className="flex flex-col gap-4">
        {problems.map((problem) => (
          <div
            key={problem._id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{problem.title}</h3>
              <p className="text-gray-500 text-sm">Location: {problem.location}</p>
            </div>
            <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              👍 {problem.upvotes?.length || 0}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopUpvotedIssues;