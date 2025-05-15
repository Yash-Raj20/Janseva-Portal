import { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', location: '' });
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/auth/register', form);
    alert('Registered successfully!');
    navigate('/login'); 
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-10 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {['name', 'email', 'password', 'phone', 'location'].map((field) => (
          <input
            key={field}
            type={field === 'password' ? 'password' : 'text'}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full p-2 border rounded"
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            required
          />
        ))}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;