import React, { useEffect, useState } from 'react';
import {
  User,
  Shield,
  Target,
  Zap,
  Edit,
  Save,
  X,
  Award,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient'; 

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    rank: 'Elite Operative',
    level: 47,
    experience: 12840,
    maxExperience: 15000,
    joinDate: 'March 2024',
    missionsCompleted: 89,
    successRate: 97.2,
    specialization: 'Network Infiltration',
  });

  const [tempData, setTempData] = useState({ ...profileData });

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        const email = data.user.email ?? 'unknown@secure.net';
        const username =
          data.user.user_metadata?.name ??
          email.split('@')[0] ??
          'Unknown Agent';

        setProfileData((prev) => ({
          ...prev,
          username,
          email,
        }));

        setTempData((prev) => ({
          ...prev,
          username,
          email,
        }));
      } else {
        setProfileData((prev) => ({
          ...prev,
          username: 'Unknown Agent',
          email: 'unknown@secure.net',
        }));
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setTempData({ ...profileData });
  };

  const handleSave = () => {
    setProfileData({ ...tempData });

    // Optionally update Supabase user metadata (username)
    supabase.auth.updateUser({
      data: { name: tempData.username },
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData({ ...profileData });
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setTempData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const progressPercentage =
    (profileData.experience / profileData.maxExperience) * 100;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-12 pt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
              <User className="text-white" size={28} />
            </div>
            <h1 className="text-4xl font-bold text-red-400">{profileData.username}</h1>
          </div>

          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center transition-all duration-300"
            >
              <Edit className="mr-2" size={18} />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center transition-all duration-300"
              >
                <Save className="mr-2" size={18} />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg flex items-center transition-all duration-300"
              >
                <X className="mr-2" size={18} />
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Main Profile Info */}
        <div className="bg-gray-900/50 border border-red-500/20 rounded-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Info */}
            <div className="space-y-6">
              <div>
                <label className="block text-red-400 text-sm font-bold mb-2">
                  Agent Codename
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempData.username}
                    onChange={(e) =>
                      handleInputChange('username', e.target.value)
                    }
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-red-400 focus:outline-none"
                  />
                ) : (
                  <div className="text-white text-lg font-mono">
                    {profileData.username}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-red-400 text-sm font-bold mb-2">
                  Secure Channel
                </label>
                <div className="text-white text-lg font-mono">
                  {profileData.email}
                </div>
              </div>

              <div>
                <label className="block text-red-400 text-sm font-bold mb-2">
                  Specialization
                </label>
                {isEditing ? (
                  <select
                    value={tempData.specialization}
                    onChange={(e) =>
                      handleInputChange('specialization', e.target.value)
                    }
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-red-400 focus:outline-none"
                  >
                    <option value="Network Infiltration">Network Infiltration</option>
                    <option value="Data Extraction">Data Extraction</option>
                    <option value="Cyber Warfare">Cyber Warfare</option>
                    <option value="Cryptography">Cryptography</option>
                    <option value="Social Engineering">Social Engineering</option>
                  </select>
                ) : (
                  <div className="text-white text-lg">
                    {profileData.specialization}
                  </div>
                )}
              </div>
            </div>

            {/* Right Info */}
            <div className="space-y-6">
              <div>
                <label className="block text-red-400 text-sm font-bold mb-2">
                  Operational Rank
                </label>
                <div className="flex items-center">
                  <Award className="text-red-400 mr-2" size={20} />
                  <span className="text-white text-lg font-bold">{profileData.rank}</span>
                </div>
              </div>

              <div>
                <label className="block text-red-400 text-sm font-bold mb-2">
                  Security Level
                </label>
                <div className="flex items-center">
                  <Shield className="text-red-400 mr-2" size={20} />
                  <span className="text-white text-2xl font-bold">{profileData.level}</span>
                </div>
              </div>

              <div>
                <label className="block text-red-400 text-sm font-bold mb-2">
                  Experience Points
                </label>
                <div className="mb-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white">{profileData.experience} XP</span>
                    <span className="text-gray-400">{profileData.maxExperience} XP</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-red-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <StatCard icon={Clock} title="ACTIVE SINCE" value={profileData.joinDate} color="text-blue-400" />
          <StatCard icon={Target} title="MISSIONS" value={profileData.missionsCompleted} color="text-green-400" />
          <StatCard icon={TrendingUp} title="SUCCESS RATE" value={`${profileData.successRate}%`} color="text-yellow-400" />
          <StatCard icon={Zap} title="LEVEL" value={profileData.level} color="text-purple-400" />
        </div>

        {/* Activity Section */}
        <div className="bg-gray-900/50 border border-red-500/20 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-red-400 mb-6">Recent Operations</h2>
          <ActivityRow
            name="Operation Phantom"
            desc="Network infiltration completed"
            time="2 hours ago"
            statusColor="yellow"
          />
          <ActivityRow
            name="Data Extraction Alpha"
            desc="Sensitive files retrieved"
            time="1 day ago"
            statusColor="yellow"
          />
          <ActivityRow
            name="Cipher Challenge"
            desc="Encryption protocol bypassed"
            time="3 days ago"
            statusColor="yellow"
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value, color }) => (
  <div className="bg-gray-900/50 border border-red-500/20 rounded-lg p-6 text-center">
    <Icon className={`${color} mx-auto mb-2`} size={32} />
    <div className={`${color} text-sm font-bold`}>{title}</div>
    <div className="text-white text-lg">{value}</div>
  </div>
);

const ActivityRow = ({ name, desc, time, statusColor }) => (
  <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg mb-3">
    <div className="flex items-center">
      <div className={`w-3 h-3 bg-${statusColor}-500 rounded-full mr-3`}></div>
      <div>
        <div className="text-white font-semibold">{name}</div>
        <div className="text-gray-400 text-sm">{desc}</div>
      </div>
    </div>
    <div className="text-red-400 text-sm">{time}</div>
  </div>
);

export default Profile;