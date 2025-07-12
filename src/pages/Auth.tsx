import React, { useState, useEffect } from 'react';
import { User, Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Chrome } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export function Auth() {
  const navigate = useNavigate();
  const { signIn, signUp, signInWithGoogle, user, loading, error: authError } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  try {
    if (isLogin) {
      await signIn(formData.email, formData.password);
    } else {
      await signUp(formData.email, formData.password, formData.name);
    }
  } catch (err) {
    setError(err instanceof Error ? err.message : 'An error occurred');
  }
};

  useEffect(() => {
  const checkOAuthRedirect = async () => {
    const {
      data: { session },
      error
    } = await supabase.auth.getSession();

    if (error) {
      console.error('OAuth error:', error.message);
    }

    // Only navigate if user not already signed in
    if (session && !user) {
      navigate('/games');
    }
  };

  checkOAuthRedirect();
}, [navigate, user]);


useEffect(() => {
  if (user) {
    navigate('/');
  }
}, [user, navigate]);


  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 border border-gray-800 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-red-500 to-white">
              {isLogin ? 'Welcome Back' : 'Join the Elite'}
            </h1>
            <p className="text-gray-400">
              {isLogin 
                ? 'Access your cybersecurity training dashboard' 
                : 'Begin your journey into advanced cybersecurity'}
            </p>
          </div>

          {(error || authError) && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg flex items-center gap-2 text-red-200">
              <AlertCircle className="w-5 h-5" />
              <span>{error || authError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Hacker Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-2 px-4 pl-10 text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                    placeholder="l33th4x0r"
                    required
                  />
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-2 px-4 pl-10 text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                  placeholder="you@example.com"
                  required
                />
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-2 px-4 pl-10 pr-10 text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white py-2 px-4 rounded-lg hover:from-red-700 hover:to-red-900 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-red-500 hover:text-red-400 transition-colors"
            >
              {isLogin 
                ? "Don't have an account? Join now" 
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
        <div className="mt-6">
  <div className="relative">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-gray-600"></div>
    </div>
    <div className="relative flex justify-center text-sm">
      <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
    </div>
  </div>

  <div className="mt-6">
    <button
      type="button"
      onClick={async () => {
        try {
          await signInWithGoogle();
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Google sign-in failed');
        }
      }}
      className="w-full flex justify-center items-center gap-2 bg-white text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <Chrome className="w-5 h-5" />
      Sign in with Google
    </button>
  </div>
</div>
      </div>
    </div>
  );
}