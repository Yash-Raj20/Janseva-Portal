import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/admin/adminlogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        if (data.token) {
          login(data.token);
          navigate("/dashboard");
        } else {
          alert("Login failed, no token received");
        }
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error: ", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border mb-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border mb-4 rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
          Login
        </button>
        <div className="text-center mt-4">
          <a href="/adminregister" className="text-blue-600 hover:underline">
            Don't have an account? Register
          </a>
        </div>
      </form>
    </div>
  );
}