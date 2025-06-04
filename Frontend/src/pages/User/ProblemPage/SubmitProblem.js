import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/User/AuthContext";
import axios from "../../../api/User/axios";
import { MapPin, Megaphone, Users } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const assets = [
  "/assets/img1.jpg",
  "/assets/img2.jpg",
  "/assets/img3.jpg",
  "/assets/img4.jpg",
];

const SubmitProblem = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState("");
  const [locations, setLocations] = useState({ states: [], districts: [] });

  const [problem, setProblem] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    urgency: "",
    contact: "",
    district: "",
    state: "",
  });

  const jsonBinUrl = process.env.REACT_APP_JSON_DATA_URL;
  const jsonBinKey = process.env.REACT_APP_X_MASTER_KEY;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(jsonBinUrl, {
          headers: {
            "X-Master-Key": jsonBinKey,
          },
        });
        const data = await response.json();

        // Make sure locations is always an object with states and districts arrays
        setLocations({
          states: data.record.states || [],
          districts: data.record.districts || [],
        });
      } catch (err) {
        console.error("Failed to fetch states and districts:", err);
        // fallback to empty arrays to avoid crash
        setLocations({ states: [], districts: [] });
      }
    };

    fetchLocations();
  }, [jsonBinUrl, jsonBinKey]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProblem((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setImageError("Image size must be under 10MB.");
        setImage(null);
      } else {
        setImageError("");
        setImage(file);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "title",
      "description",
      "location",
      "category",
      "urgency",
      "contact",
      "district",
      "state",
    ];

    const emptyFields = requiredFields.filter((field) => !problem[field]);
    if (emptyFields.length || !image) {
      toast.error("Please fill all fields and upload an image.");
      return;
    }

    if (imageError) {
      toast.error(imageError);
      return;
    }

    const formData = new FormData();
    Object.entries(problem).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("image", image);

    try {
      await axios.post("/problems/create", formData, {
        headers: { Authorization: `Bearer ${user?.token}` },
        withCredentials: true,
      });
      toast.success("Problem submitted successfully!");
      navigate("/");
    } catch (err) {
      console.error("Problem submission failed:", err);
      toast.error("Problem submission failed.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat px-4 font-poppins pt-28 lg:pt-36 py-16"
      style={{ backgroundImage: "url('/assets/PageBg.jpg')" }}
    >
      <div className="max-w-[92%] mx-auto flex flex-col lg:flex-row gap-10">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-[85%] flex flex-col gap-8"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0C2218] text-center lg:text-left">
            Raise Your Voice for a Viksit Bharat 🇮🇳
          </h1>
          <p className="text-gray-700 text-base sm:text-lg lg:text-left">
            Together we can fix local issues and shape a smarter future.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {assets.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`img scene ${i + 1}`}
                className="object-cover w-full h-40 rounded-lg hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mt-8">
            {[
              {
                icon: <Megaphone />,
                value: "124+",
                label: "Problems Resolved",
              },
              { icon: <MapPin />, value: "20+", label: "Cities Engaged" },
              { icon: <Users />, value: "500+", label: "Active Citizens" },
            ].map((stat, i) => (
              <div key={i} className="bg-white shadow-md rounded-xl p-6">
                <div className="text-[#0C2218] w-8 h-8 mx-auto mb-2">
                  {stat.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#0C2218]">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-700">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-[#0C2218] mb-6 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {[
                {
                  icon: "📝",
                  title: "Describe the Issue",
                  desc: "Be clear and detailed.",
                },
                {
                  icon: "📍",
                  title: "Add Location",
                  desc: "Help us identify where.",
                },
                {
                  icon: "🔄",
                  title: "Track Progress",
                  desc: "Stay updated regularly.",
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="bg-sky-50 rounded-xl shadow-md p-4"
                >
                  <div className="text-4xl">{step.icon}</div>
                  <p className="mt-3 font-semibold">{step.title}</p>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Section - Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-full bg-white shadow-2xl rounded-2xl p-6"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0C2218] mb-2 text-center">
            Report a Local Problem
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mb-8 text-center">
            Let your voice be heard. Every issue matters.
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            {[
              ["Problem Title", "title", "text"],
              ["Exact Location", "location", "text"],
              ["Your Contact (Phone or Email)", "contact", "text"],
            ].map(([label, id, type]) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="block font-medium text-gray-700 mb-1"
                >
                  {label}
                </label>
                <input
                  type={type}
                  id={id}
                  placeholder={`Enter ${label.toLowerCase()}...`}
                  value={problem[id]}
                  onChange={handleChange}
                  className="w-full p-3 sm:p-4 text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ffe26a] focus:outline-none transition"
                  required
                />
              </div>
            ))}

            {/* State & District */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* State Dropdown */}
              <div>
                <label
                  htmlFor="state"
                  className="block font-medium text-gray-700 mb-1"
                >
                  State
                </label>
                <select
                  id="state"
                  value={problem.state}
                  onChange={(e) => {
                    handleChange(e);
                    setProblem((prev) => ({ ...prev, district: "" }));
                  }}
                  className="w-full p-3 sm:p-4 text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ffe26a] focus:outline-none transition"
                  required
                >
                  <option value="">Select State</option>
                  {locations.states.map(({ state }) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              {/* District Dropdown */}
              <div>
                <label
                  htmlFor="district"
                  className="block font-medium text-gray-700 mb-1"
                >
                  District
                </label>
                <select
                  id="district"
                  value={problem.district}
                  onChange={handleChange}
                  className="w-full p-3 sm:p-4 text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ffe26a] focus:outline-none transition"
                  required
                  disabled={!problem.state}
                >
                  <option value="">Select District</option>
                  {problem.state &&
                    (
                      locations.states.find(
                        ({ state }) => state === problem.state
                      )?.districts || []
                    ).map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block font-medium text-gray-700 mb-1"
              >
                Problem Description
              </label>
              <textarea
                id="description"
                rows="4"
                placeholder="Describe the problem in detail..."
                value={problem.description}
                onChange={handleChange}
                className="w-full p-3 sm:p-4 text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ffe26a] focus:outline-none transition"
                required
              />
            </div>

            {/* Category & Urgency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  id: "category",
                  label: "Category",
                  options: [
                    "Road & Transport",
                    "Water & Sanitation",
                    "Electricity",
                    "Waste Management",
                    "Public Health",
                    "Other",
                  ],
                },
                {
                  id: "urgency",
                  label: "Urgency",
                  options: ["Low", "Moderate", "High", "Critical"],
                },
              ].map(({ id, label, options }) => (
                <div key={id}>
                  <label
                    htmlFor={id}
                    className="block font-medium text-gray-700 mb-1"
                  >
                    {label}
                  </label>
                  <select
                    id={id}
                    value={problem[id]}
                    onChange={handleChange}
                    className="w-full p-3 sm:p-4 text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ffe26a] focus:outline-none transition"
                    required
                  >
                    <option value="">Select {label}</option>
                    {options.map((option, i) => (
                      <option key={i} value={option.toLowerCase()}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <div>
              <label
                htmlFor="image"
                className="block font-medium text-gray-700 mb-1"
              >
                Upload Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ffe26a] focus:outline-none transition"
              />
              {imageError && (
                <p className="text-red-600 text-sm mt-1">{imageError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#0C2218] text-white hover:bg-[#1b3c2a] sm:text-lg font-semibold py-3 rounded-xl transition duration-200"
            >
              🚀 Submit Your Problem
            </button>

            <p className="text-[#0C2218] text-base text-center">
              Raise your problems—my team will work on them as soon as possible.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SubmitProblem;
