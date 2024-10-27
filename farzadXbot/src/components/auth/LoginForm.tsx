import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { authAPI } from '../../services/api';
import { useStore } from '../../store';

export default function LoginForm() {
  const navigate = useNavigate();
  const setAuth = useStore((state) => state.setAuth);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await authAPI.login(credentials);
      localStorage.setItem('token', data.token);
      setAuth(true, data.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-card rounded-xl p-8 w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <LogIn className="text-blue-400" size={24} />
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Login
          </h1>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              className="w-full glass-card rounded-xl p-3 text-white bg-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="w-full glass-card rounded-xl p-3 text-white bg-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full glass-button rounded-xl p-3 text-blue-300 hover:bg-blue-500/10 transition-all duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}