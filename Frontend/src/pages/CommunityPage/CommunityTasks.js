import React, { useEffect, useState } from 'react';
import { fetchAvailableIssues, pickIssue } from '../../api/communityApi';

const CommunityTasks = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const loadIssues = async () => {
      const { data } = await fetchAvailableIssues();
      setIssues(data);
    };
    loadIssues();
  }, []);

  const handlePick = async (id) => {
    await pickIssue(id);
    alert('Task picked successfully!');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl text-darkBlue mb-4 font-bold">Available Community Tasks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {issues.map((issue) => (
          <div key={issue._id} className="bg-white shadow-md rounded-xl p-5">
            <h2 className="text-xl font-bold mb-2">{issue.title}</h2>
            <p className="text-gray-600">{issue.description}</p>
            <button
              onClick={() => handlePick(issue._id)}
              className="mt-4 bg-primary hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-all"
            >
              Claim This Task
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityTasks;
