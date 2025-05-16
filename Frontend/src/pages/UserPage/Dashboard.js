import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import ProblemCard from '../../components/ProblemSection/ProblemCard';
import TopUpvotedIssues from '../../components/ProblemSection/TopUpvotedIssues';

const Dashboard = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await axios.get('/problems');
        setProblems(res.data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-lg">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">📢 Latest Public Issues</h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {problems.map((problem) => (
          <ProblemCard key={problem._id} problem={problem} />
        ))}
      </div>

      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4 text-green-700">🔥 Top Upvoted Issues</h3>
        <TopUpvotedIssues />
      </div>
    </div>
  );
};

export default Dashboard;