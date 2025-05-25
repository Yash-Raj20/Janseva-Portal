import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../context/User/AuthContext";
import { toast } from "react-hot-toast";
import { Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

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

  // Placeholder social login handlers
  const handleGoogleLogin = () => {
    toast("Google login feature coming soon!");
  };

  const handleFacebookLogin = () => {
    toast("Facebook login feature coming soon!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] p-6 pt-20">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl max-w-5xl w-full overflow-hidden">
        {/* Left Side Image */}
        <div
          className="md:w-1/2 bg-cover bg-center relative"
          style={{
            backgroundImage: "url('/assets/loginImg.jpg')",
            minHeight: "500px",
            maxHeight: "550px",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center p-10">
            <img
              src="/Logo/signatureWhite.svg"
              alt="Logo"
              className="mx-auto h-auto w-64 object-contain"
            />
            <p className="text-white text-lg max-w-md text-center drop-shadow">
              Empowering citizens to raise their voices and build a better
              future together.
            </p>
          </div>
        </div>

        {/* Right Form Side */}
        <div className="md:w-1/2 flex items-center justify-center p-10">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-[#0C2218] mb-6 text-center">
              Welcome Back
            </h2>

            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center w-full py-2 border rounded-lg hover:bg-gray-100 transition"
              >
                <FcGoogle size={22} className="mr-2" />
                Login with Google
              </button>
              <button
                onClick={handleFacebookLogin}
                className="flex items-center justify-center w-full py-2 border rounded-lg text-blue-600 hover:bg-gray-100 transition"
              >
                <FaFacebook size={20} className="mr-2" />
                Login with Facebook
              </button>
            </div>

            <div className="text-center text-gray-400 mb-4">
              — or login with email —
            </div>

            {/* Email Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <Mail className="absolute left-4 top-3 text-gray-400" size={22} />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffe26a] focus:outline-none transition"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-3 text-gray-400" size={22} />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffe26a] focus:outline-none transition"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0C2218] text-white py-3 rounded-lg hover:bg-[#1b3c2a] transition duration-300 font-semibold"
              >
                Login to JanSeva
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-[#b89e37] font-medium hover:underline"
              >
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;