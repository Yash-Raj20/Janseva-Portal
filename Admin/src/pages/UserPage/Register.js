import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
  
    // Sending a POST request to the backend API to register the admin
    const res = await fetch("http://localhost:5000/api/admin/adminregister", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form) 
    });
  
    const data = await res.json(); 
  
    if (res.ok) {
      alert("Registered successfully");
      navigate('/adminlogin'); 
    } else {
      alert(data.message);
    }
  };  

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Admin Register</h2>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border mb-2"
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border mb-2"
        />
        <input
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          type="password"
          className="w-full p-2 border mb-4"
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}