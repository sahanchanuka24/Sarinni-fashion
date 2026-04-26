import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let responseData;
      if (isLogin) {
        responseData = await login(formData.email, formData.password);
      } else {
        responseData = await register(formData.name, formData.email, formData.password);
      }
      
      if (responseData && responseData.user && responseData.user.role === 'admin') {
        navigate('/admin-dashboard-sarinni');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 bg-premium-cream min-h-screen flex items-center justify-center pb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-12 shadow-sm w-full max-w-md"
      >
        <h2 className="text-4xl font-serif text-premium-black mb-8 text-center">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 mb-6 text-sm text-center border border-red-100">
            {error}
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-xs uppercase tracking-widest text-premium-black/50 mb-2">Full Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
                className="w-full bg-premium-cream/30 border-b border-premium-black/10 py-3 px-4 focus:border-premium-gold outline-none transition-colors"
                placeholder="John Doe"
              />
            </div>
          )}
          <div>
            <label className="block text-xs uppercase tracking-widest text-premium-black/50 mb-2">Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-premium-cream/30 border-b border-premium-black/10 py-3 px-4 focus:border-premium-gold outline-none transition-colors"
              placeholder="hello@example.com"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-premium-black/50 mb-2">Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              className="w-full bg-premium-cream/30 border-b border-premium-black/10 py-3 px-4 focus:border-premium-gold outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-premium mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Register')}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            type="button"
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-sm text-premium-black/50 hover:text-premium-gold transition-colors"
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Sign In"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
