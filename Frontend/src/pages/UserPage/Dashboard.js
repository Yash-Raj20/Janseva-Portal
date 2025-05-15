import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import ProblemCard from '../../components/ProblemSection/ProblemCard';
import TopUpvotedIssues from '../../components/ProblemSection/TopUpvotedIssues';

const Dashboard = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    axios.get('/problems').then(res => setProblems(res.data));
  }, []);

  return (
    <div className="p-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {problems.map(problem => <ProblemCard key={problem._id} problem={problem} />)}
      <TopUpvotedIssues />
    </div>
  );
};

export default Dashboard;
