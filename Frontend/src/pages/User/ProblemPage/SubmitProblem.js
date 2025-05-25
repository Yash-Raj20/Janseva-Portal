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

  const [problem, setProblem] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    urgency: "",
    contact: "",
  });

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, location, category, urgency, contact } =
      problem;

    if (
      !title ||
      !description ||
      !location ||
      !category ||
      !urgency ||
      !contact ||
      !image
    ) {
      toast.error("Please fill in all the required fields including image.");
      return;
    }

    if (imageError) {
      toast.error(imageError);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("category", category);
    formData.append("urgency", urgency);
    formData.append("contact", contact);
    formData.append("image", image);

    try {
      await axios.post("/problems/create", formData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        withCredentials: true,
      });

      toast.success("Problem submitted successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error in create problem:", err);
      toast.error("Problem submission failed.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setImageError("Your image is more than 10MB");
        setImage(null);
      } else {
        setImageError("");
        setImage(file);
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat px-4 font-poppins pt-28 lg:pt-36 sm:px-4 lg:px-4 py-16 lg:py-16"
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
            <div className="bg-white shadow-md rounded-xl p-6">
              <Megaphone className="text-[#0C2218] w-8 h-8 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-[#0C2218]">124+</h3>
              <p className="text-sm text-gray-700">Problems Resolved</p>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6">
              <MapPin className="text-[#0C2218] w-8 h-8 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-[#0C2218]">20+</h3>
              <p className="text-sm text-gray-700">Cities Engaged</p>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6">
              <Users className="text-yellow-600 w-8 h-8 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-yellow-600">500+</h3>
              <p className="text-sm text-gray-700">Active Citizens</p>
            </div>
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

        <hr className="block lg:hidden border-t my-5 border-gray-300" />

        {/* Right Section - Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-full bg-white shadow-2xl rounded-2xl p-6 sm:p-6"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0C2218] mt-4 mb-2 text-center">
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
                  value={problem[id]}
                  onChange={(e) =>
                    setProblem((prev) => ({ ...prev, [id]: e.target.value }))
                  }
                  className="w-full p-3 sm:p-4 text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ffe26a] focus:outline-none transition"
                  required
                />
              </div>
            ))}

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
                value={problem.description}
                onChange={(e) =>
                  setProblem((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full p-3 sm:p-4 text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ffe26a] focus:outline-none transition"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="category"
                  className="block font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={problem.category}
                  onChange={(e) =>
                    setProblem((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="w-full p-3 sm:p-4 text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ffe26a] focus:outline-none transition"
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
                  className="block font-medium text-gray-700 mb-1"
                >
                  Urgency
                </label>
                <select
                  id="urgency"
                  value={problem.urgency}
                  onChange={(e) =>
                    setProblem((prev) => ({
                      ...prev,
                      urgency: e.target.value,
                    }))
                  }
                  className="w-full p-3 sm:p-4 text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ffe26a] focus:outline-none transition"
                  required
                >
                  <option value="">Select Urgency</option>
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
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

            <p className="text-[#0C2218] text-base text-center sm:text-md">
              Raise your problems my team will be work on it as soon as
              possible.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SubmitProblem;
