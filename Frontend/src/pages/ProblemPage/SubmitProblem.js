import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axios";

const SubmitProblem = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [problem, setProblem] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    urgency: "",
    contact: "",
  });

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, location, category, urgency, contact } = problem;
    if (!title || !description || !location || !category || !urgency || !contact) {
      alert("Please fill in all the required fields.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/problems", problem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/"); 
    } catch (error) {
      console.error("Problem submission failed", error);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-sky-200 py-10 px-4">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-2">
          Your Voice, India's Progress
        </h1>
        <p className="text-gray-600 text-lg">
          Join the movement toward a Viksit Bharat. Report local issues, raise
          awareness, and help build smarter, cleaner, and safer cities.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-2xl font-bold text-green-600">124+</h3>
            <p className="text-sm text-gray-700">Problems Resolved</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-2xl font-bold text-blue-600">20+</h3>
            <p className="text-sm text-gray-700">Cities Engaged</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-2xl font-bold text-yellow-600">500+</h3>
            <p className="text-sm text-gray-700">Active Citizens</p>
          </div>
        </div>
      </div>

      {/* Step-by-step guide */}
      <div className="max-w-6xl mx-auto mt-12 mb-10">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-xl shadow-md p-4">
            <span className="text-3xl text-blue-600 font-bold">1️⃣</span>
            <p className="mt-2 font-semibold">Describe the Issue</p>
            <p className="text-sm text-gray-600">
              Be clear and detailed about the problem.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4">
            <span className="text-3xl text-blue-600 font-bold">2️⃣</span>
            <p className="mt-2 font-semibold">Share Location & Details</p>
            <p className="text-sm text-gray-600">
              Help us pinpoint where the issue exists.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4">
            <span className="text-3xl text-blue-600 font-bold">3️⃣</span>
            <p className="mt-2 font-semibold">Track Progress</p>
            <p className="text-sm text-gray-600">
              We’ll keep you updated once authorities respond.
            </p>
          </div>
        </div>
      </div>

      {/* Quote or testimonial */}
      <div className="max-w-5xl mx-auto mb-10 bg-white p-6 rounded-xl shadow-lg text-center">
        <p className="italic text-lg text-gray-700">
          "When citizens speak up, transformation begins. Thanks to ViksitCity,
          our local park finally got cleaned!"
        </p>
        <p className="mt-2 font-semibold text-blue-600">
          — Priya Sharma, Indore
        </p>
      </div>

      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-4">
          Report a Local Problem
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Contribute to a Viksit Bharat by raising your voice. Your issue
          matters.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block font-semibold mb-1 text-gray-700"
            >
              Problem Title
            </label>
            <input
              type="text"
              id="title"
              value={problem.title}
              onChange={(e) =>
                setProblem({ ...problem, title: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block font-semibold mb-1 text-gray-700"
            >
              Detailed Description
            </label>
            <textarea
              id="description"
              rows="4"
              value={problem.description}
              onChange={(e) =>
                setProblem({ ...problem, description: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="block font-semibold mb-1 text-gray-700"
            >
              Exact Location
            </label>
            <input
              type="text"
              id="location"
              value={problem.location}
              onChange={(e) =>
                setProblem({ ...problem, location: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block font-semibold mb-1 text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              value={problem.category}
              onChange={(e) =>
                setProblem({ ...problem, category: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-xl"
              required
            >
              <option value="">Select Category</option>
              <option value="road">Road & Transport</option>
              <option value="water">Water & Sanitation</option>
              <option value="electricity">Electricity</option>
              <option value="waste">Waste Management</option>
              <option value="health">Public Health</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="urgency"
              className="block font-semibold mb-1 text-gray-700"
            >
              Urgency Level
            </label>
            <select
              id="urgency"
              value={problem.urgency}
              onChange={(e) =>
                setProblem({ ...problem, urgency: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-xl"
              required
            >
              <option value="">Select Urgency</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="contact"
              className="block font-semibold mb-1 text-gray-700"
            >
              Your Contact (Phone or Email)
            </label>
            <input
              type="text"
              id="contact"
              value={problem.contact}
              onChange={(e) =>
                setProblem({ ...problem, contact: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-xl"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200"
          >
            🚀 Submit for a Viksit Bharat
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitProblem;
