import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in with:', form);

    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      console.error('Login failed:', error.message);
    } else {
      navigate('/games');
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:5173/games',
      },
    });

    if (error) {
      console.error('Google login failed:', error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-red-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-black/40 border border-gray-800 backdrop-blur-lg p-8 rounded-lg shadow-lg max-w-md w-full text-white"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl font-bold text-red-400 mb-2 text-center"
        >
          Welcome Back
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-400 text-center mb-6"
        >
          Access your cybersecurity training dashboard
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-5"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {['email', 'password'].map((field) => (
            <motion.div
              key={field}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <label className="text-sm font-medium mb-1 block capitalize">
                {field}
              </label>
              <div className="flex items-center bg-gray-900 border border-gray-700 rounded px-3 py-2">
                {field === 'email' ? (
                  <Mail className="w-5 h-5 text-gray-400 mr-2" />
                ) : (
                  <Lock className="w-5 h-5 text-gray-400 mr-2" />
                )}
                <input
                  type={field === 'password' && !showPassword ? 'password' : 'text'}
                  name={field}
                  value={form[field as 'email' | 'password']}
                  onChange={handleChange}
                  placeholder={field === 'email' ? 'you@example.com' : '••••••••'}
                  className="bg-transparent outline-none text-white w-full"
                />
                {field === 'password' && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          ))}

          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-2 rounded-lg transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign In
          </motion.button>
        </motion.form>

        {/* Supabase Google Sign-In */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400 mb-3">Or sign up with</p>
          <div className="flex justify-center">
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center px-6 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-all"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Sign in with Google
            </button>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center text-sm text-red-400"
        >
          Don&apos;t have an account?{' '}
          <a href="/signup" className="underline hover:text-red-300">
            Join now
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
}
