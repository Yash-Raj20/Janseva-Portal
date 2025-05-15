// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function TopUpvotedIssues() {
//   const [problem, setProblem] = useState([]);

//   useEffect(() => {
//     const fetchTopIssues = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/problems/top-upvoted');
//         setProblem(res.data);
//       } catch (err) {
//         console.error('Error fetching top issues', err);
//       }
//     };

//     fetchTopIssues();
//   }, []);

//   return (
//     <div className="p-5 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-lg">
//       <h2 className="text-2xl font-bold text-blue-700 mb-5">🔥 Top Trending Problems</h2>
//       <div className="flex flex-col gap-4">
//         {problem.map((problem) => (
//           <div key={problem._id} className="p-4 bg-white rounded-lg shadow hover:shadow-md transition flex justify-between items-center">
//             <div>
//               <h3 className="text-lg font-semibold">{problem.title}</h3>
//               <p className="text-gray-500 text-sm">Location: {problem.location}</p>
//             </div>
//             <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
//               👍 {problem.upvotes.length}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default TopUpvotedIssues;
