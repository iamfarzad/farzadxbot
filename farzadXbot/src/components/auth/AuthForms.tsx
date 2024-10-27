import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import { authAPI } from '../../services/api';
import { useStore } from '../../store';

export default function AuthForms() {
  const navigate = useNavigate();
  const setAuth = useStore((state) => state.setAuth);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // TEMPORARY: Development-only login
    if (formData.email === 'test@example.com' && formData.password === 'password123') {
      const mockUser = {
        id: '1',
        name: 'Test User',
        email: formData.email,
        twitterConnected: false
      };
      
      localStorage.setItem('token', 'mock-jwt-token');
      setAuth(true, mockUser);
      navigate('/dashboard');
      return;
    }

    setError('Invalid credentials');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-card rounded-xl p-8 w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          {isLogin ? (
            <LogIn className="text-blue-400" size={24} />
          ) : (
            <UserPlus className="text-blue-400" size={24} />
          )}
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            {isLogin ? 'Login' : 'Register'}
          </h1>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm text-gray-400 mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full glass-card rounded-xl p-3 text-white bg-transparent"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full glass-card rounded-xl p-3 text-white bg-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full glass-card rounded-xl p-3 text-white bg-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full glass-button rounded-xl p-3 text-blue-300 hover:bg-blue-500/10 transition-all duration-200"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-gray-400 hover:text-blue-300"
            >
              {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
            </button>
          </div>
        </form>

        {/* Development credentials notice */}
        <div className="mt-8 p-4 glass-card rounded-xl">
          <p className="text-sm text-gray-400">Development Login:</p>
          <p className="text-sm text-gray-400">Email: test@example.com</p>
          <p className="text-sm text-gray-400">Password: password123</p>
        </div>
      </div>
    </div>
  );
}