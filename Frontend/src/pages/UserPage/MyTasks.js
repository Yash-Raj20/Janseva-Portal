import React, { useEffect, useState } from 'react';
import { fetchMyTasks } from '../../api/communityApi';

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const { data } = await fetchMyTasks();
      setTasks(data);
    };
    loadTasks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl text-darkBlue mb-6 font-bold">My Assigned Tasks</h1>
      <div className="grid grid-cols-1 gap-6">
        {tasks.map((task) => (
          <div key={task._id} className="bg-white shadow-md p-4 rounded-lg">
            <h2 className="font-bold text-lg">{task.issue.title}</h2>
            <p>Status: <span className="font-semibold">{task.status}</span></p>
            {task.proofImage && (
              <img src={task.proofImage} alt="Proof" className="w-32 h-32 object-cover rounded-lg mt-2" />
            )}
            <p className="text-gray-600">{task.remarks}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTasks;
