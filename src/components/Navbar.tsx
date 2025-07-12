import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Gamepad2, Trophy, Bell, User } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/games', label: 'Games', icon: Gamepad2 },
    { to: '/leaderboard', label: 'Rankings', icon: Trophy },
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUserEmail(data.user.email);
      } else {
        setUserEmail(null);
      }
    };
    fetchUser();
  }, [location.pathname]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUserEmail(null);
    navigate('/');
  };

  const handleClickOutside = (e) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target)
    ) {
      setDropdownOpen(false);
    }
    if (
      notificationsRef.current &&
      !notificationsRef.current.contains(e.target)
    ) {
      setNotificationsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black text-white shadow-md w-full px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <span className="text-red-600">
          <Gamepad2 className="w-6 h-6" />
        </span>
        <span className="text-2xl font-bold">CyberHeist</span>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        {navLinks.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
              isActive(to)
                ? 'bg-red-900 text-white border-b-2 border-red-500'
                : 'hover:text-red-400'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        ))}

        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-gray-900 border border-gray-700 rounded-md shadow-lg z-50">
              <div className="p-4 border-b border-gray-700 font-semibold text-white">
                Notifications
              </div>
              <div className="max-h-60 overflow-y-auto">
                <div className="px-4 py-3 border-b border-gray-800 text-white hover:bg-gray-800 cursor-pointer">
                  <p>New course available: Advanced Web Security</p>
                  <span className="text-xs text-gray-400">2 hours ago</span>
                </div>
                <div className="px-4 py-3 border-b border-gray-800 text-white hover:bg-gray-800 cursor-pointer">
                  <p>You earned a new achievement!</p>
                  <span className="text-xs text-gray-400">5 hours ago</span>
                </div>
              </div>
              <div className="px-4 py-2 text-blue-400 hover:text-blue-300 hover:bg-gray-800 cursor-pointer text-sm">
                Mark all as read
              </div>
            </div>
          )}
        </div>

        {/* Profile or Auth */}
        {userEmail ? (
          <div className="relative ml-4" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-center w-8 h-8 bg-red-700 rounded-full"
            >
              <User className="w-5 h-5" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-4 w-64 bg-black border border-gray-700 rounded-md shadow-lg">
                <div className="p-4 border-b border-gray-700">
                  <p className="text-sm text-gray-400">Signed in as</p>
                  <p className="text-white font-medium break-words">{userEmail}</p>
                </div>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-800"
                >
                  Your Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate('/signup')}
            className="ml-4 bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-md"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};