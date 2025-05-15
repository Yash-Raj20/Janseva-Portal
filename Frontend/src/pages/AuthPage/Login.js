import { useState } from 'react';
import axios from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/auth/login', form);
    login(res.data.token);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-10 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="email" placeholder="Email" className="w-full p-2 border rounded"
          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded"
          value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;