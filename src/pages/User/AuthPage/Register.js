import { useState } from "react";
import axios from "../../../api/User/axios";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Phone, MapPin, User, CheckCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/auth/register", formData);
      toast.success("Registered successfully!");
      navigate("/login");
    } catch (err) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-6 overflow-hidden">
      {/* Floating background blobs */}
      <div className="absolute w-72 h-72 bg-[#ffe26a] rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse -top-20 -left-20"></div>
      <div className="absolute w-72 h-72 bg-[#00ffb9] rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse bottom-10 right-10"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between max-w-6xl w-full">
        {/* Left Information Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white md:w-1/2 mb-10 md:mb-0 md:pr-10 mt-10"
        >
          <img
            src="/Logo/SignatureWhite.svg"
            alt="Logo"
            className="h-14 w-auto mb-6"
            loading="lazy"
          />
          <h1 className="text-4xl font-bold mb-4">
            Join JanSeva Community ✨
          </h1>
          <p className="text-lg text-gray-200 mb-6">
            Be part of a movement that empowers citizens to raise their voice,
            solve problems, and shape the future together.
          </p>

          {/* Features List */}
          <ul className="space-y-4 text-gray-100">
            <li className="flex items-center gap-3">
              <CheckCircle className="text-[#ffe26a]" size={22} />
              Connect with like-minded citizens
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-[#ffe26a]" size={22} />
              Share your ideas & raise concerns
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-[#ffe26a]" size={22} />
              Get updates & insights from the community
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-[#ffe26a]" size={22} />
              Together, build a better tomorrow
            </li>
          </ul>
        </motion.div>

        {/* Register Form Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-8 mt-20 md:w-1/2"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-2">
            Create an Account
          </h2>
          <p className="text-gray-300 text-center mb-8">
            Fill in your details to get started
          </p>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="relative">
              <User className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-[#ffe26a] focus:outline-none"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-[#ffe26a] focus:outline-none"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-[#ffe26a] focus:outline-none"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <Phone className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-[#ffe26a] focus:outline-none"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>

            {/* Location */}
            <div className="relative">
              <MapPin className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Location"
                className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-[#ffe26a] focus:outline-none"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                required
              />
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold transition shadow-md ${
                loading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-gradient-to-r from-[#ffe26a] to-[#ffb347] text-black hover:shadow-lg"
              }`}
            >
              {loading ? "Registering..." : "Register Now"}
            </motion.button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-300">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#ffe26a] font-medium hover:underline"
            >
              Login here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;