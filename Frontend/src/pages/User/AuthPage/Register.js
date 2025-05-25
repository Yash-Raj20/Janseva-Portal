import { useState } from "react";
import axios from "../../../api/User/axios";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Phone, MapPin, User } from "lucide-react";
import { toast } from "react-hot-toast"; 

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post("/auth/register", formData);
      toast.success("Registered successfully!");
      navigate("/login");
    } catch (err) {
      setError(
        toast.error("Registration failed. Please try again.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] p-6 pt-20">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl max-w-5xl w-full overflow-hidden">
        {/* Image Side */}
        <div
          className="md:w-1/2 bg-cover bg-center relative"
          style={{
            backgroundImage: "url('/assets/registerImg.jpg')",
            minHeight: "450px",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center p-10">
            <h1 className="text-white flex items-center gap-3 text-4xl font-bold mb-4">
              Join
              <img
                src="./Logo/signatureWhite.svg"
                alt="Underline"
                className="mx-auto h-auto w-52 object-contain"
              />
            </h1>
            <p className="text-white text-lg max-w-md text-center">
              Help shape a better India by raising your voice and solving
              problems together.
            </p>
          </div>
        </div>

        {/* Register Form */}
        <div className="md:w-1/2 p-10 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-[#0C2218] mb-8 text-center">
              Create an Account
            </h2>

            {error && (
              <div className="mb-4 text-red-600 font-semibold text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="relative">
                <User className="absolute left-4 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffe26a] focus:outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-4 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffe26a] focus:outline-none"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-4 top-3 text-gray-400" size={20} />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffe26a] focus:outline-none"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              {/* Phone */}
              <div className="relative">
                <Phone className="absolute left-4 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffe26a] focus:outline-none"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              {/* Location */}
              <div className="relative">
                <MapPin className="absolute left-4 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffe26a] focus:outline-none"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#0C2218] hover:bg-[#1b3c2a] text-white"
                }`}
              >
                {loading ? "Registering..." : "Register Now"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#b89e37] font-medium hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;