import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

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
        
        <form className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-xs uppercase tracking-widest text-premium-black/50 mb-2">Full Name</label>
              <input 
                type="text" 
                className="w-full bg-premium-cream/30 border-b border-premium-black/10 py-3 px-4 focus:border-premium-gold outline-none transition-colors"
                placeholder="John Doe"
              />
            </div>
          )}
          <div>
            <label className="block text-xs uppercase tracking-widest text-premium-black/50 mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full bg-premium-cream/30 border-b border-premium-black/10 py-3 px-4 focus:border-premium-gold outline-none transition-colors"
              placeholder="hello@example.com"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-premium-black/50 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full bg-premium-cream/30 border-b border-premium-black/10 py-3 px-4 focus:border-premium-gold outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button className="w-full btn-premium mt-8">
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
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
