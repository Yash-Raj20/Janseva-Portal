import { useEffect, useState } from "react";
import adminApi from "../api/adminApi";

const AssignVolunteer = () => {
  const [problems, setProblems] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const problemsRes = await adminApi.get("/problems/all");
      const volunteersRes = await adminApi.get("/volunteers/all");
      setProblems(problemsRes.data);
      setVolunteers(volunteersRes.data);
    };
    fetchData();
  }, []);

  const assignVolunteer = async (problemId) => {
    try {
      await adminApi.patch(`/problems/${problemId}/assign-volunteer`, { volunteerId: selectedVolunteer });
      alert("Volunteer Assigned ✅");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl mb-6">Assign Volunteers</h2>
      {problems.map((problem) => (
        <div key={problem._id} className="p-4 mb-4 bg-white rounded shadow">
          <h3 className="text-xl font-bold">{problem.title}</h3>
          <select
            onChange={(e) => setSelectedVolunteer(e.target.value)}
            className="w-full p-2 my-2 border rounded"
          >
            <option>Select Volunteer</option>
            {volunteers.map((v) => (
              <option key={v._id} value={v._id}>{v.name}</option>
            ))}
          </select>
          <button 
            onClick={() => assignVolunteer(problem._id)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Assign
          </button>
        </div>
      ))}
    </div>
  );
};

export default AssignVolunteer;
