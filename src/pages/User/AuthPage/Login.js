import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../context/User/AuthContext";
import { toast } from "react-hot-toast";
import { Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Email and Password are required");
      return;
    }

    const result = await login(form);

    if (result.success) {
      toast.success(result.message || "Login successful");
      navigate("/");
    } else {
      toast.error(result.message || "Invalid credentials. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    toast("Google login feature coming soon!");
  };

  const handleFacebookLogin = () => {
    toast("Facebook login feature coming soon!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] overflow-hidden">
      {/* Background floating shapes */}
      <div className="absolute w-72 h-72 bg-[#ffe26a] rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse -top-20 -left-20"></div>
      <div className="absolute w-72 h-72 bg-[#00ffb9] rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse bottom-10 right-10"></div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-8 mt-20"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/Logo/SignatureWhite.svg"
            alt="Logo"
            className="h-14 w-auto"
            loading="lazy"
          />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-300 text-center mb-8">
          Login to continue your journey 🚀
        </p>

        {/* Social Login */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={handleGoogleLogin}
            className="p-3 bg-white rounded-full shadow hover:scale-110 transition"
          >
            <FcGoogle size={22} />
          </button>
          <button
            onClick={handleFacebookLogin}
            className="p-3 bg-white rounded-full shadow hover:scale-110 transition text-blue-600"
          >
            <FaFacebook size={20} />
          </button>
        </div>

        <div className="relative flex items-center mb-6">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="mx-4 text-gray-300 text-sm">or login with email</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-[#ffe26a] focus:outline-none"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-[#ffe26a] focus:outline-none"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-gradient-to-r from-[#ffe26a] to-[#ffb347] text-black font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition"
          >
            Login
          </motion.button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-300">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-[#ffe26a] font-medium hover:underline"
          >
            Register now
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
