import React, { useState, useEffect } from 'react';
import {
  Trophy, Medal, Award, Target, Zap, Crown, TrendingUp, Filter
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('level');
  const [timeFrame, setTimeFrame] = useState('all');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserEmail, setCurrentUserEmail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const { data: userData } = await supabase.auth.getUser();
      const email = userData?.user?.email || null;
      setCurrentUserEmail(email);

      let query = supabase.from('profiles').select('*');

      if (activeTab === 'level') {
        query = query.order('level', { ascending: false });
      } else if (activeTab === 'missions') {
        query = query.order('missions', { ascending: false });
      } else if (activeTab === 'weekly') {
        query = query.order('weekly_xp', { ascending: false });
      }

      const { data, error } = await query;

      if (data) {
        const sortedData = data.map((item, index) => ({
          ...item,
          rank: index + 1,
          isCurrentUser: item.email === email,
        }));
        setLeaderboardData(sortedData);
      }
      setLoading(false);
    };

    fetchData();
  }, [activeTab, timeFrame]);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="text-yellow-400" size={24} />;
      case 2:
        return <Medal className="text-gray-300" size={24} />;
      case 3:
        return <Award className="text-orange-400" size={24} />;
      default:
        return <span className="text-red-400 font-bold text-lg">#{rank}</span>;
    }
  };

  const getSpecializationColor = (spec) => {
    const colors = {
      'Network Infiltration': 'text-blue-400',
      'Data Extraction': 'text-green-400',
      'Cyber Warfare': 'text-red-400',
      'Cryptography': 'text-purple-400',
      'Social Engineering': 'text-yellow-400',
    };
    return colors[spec] || 'text-gray-400';
  };

  const currentData = leaderboardData.slice(0, 3);

  return (
    <div className="min-h-screen pt-20 px-6 py-12 text-white bg-gradient-to-br from-black via-gray-900 to-red-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
              <Trophy className="text-white" size={28} />
            </div>
            <h1 className="text-4xl font-bold text-red-400">Elite Rankings</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Filter className="text-red-400" size={20} />
            <select
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value)}
              className="bg-gray-800 border border-red-500/20 rounded-lg px-4 py-2 text-white focus:border-red-400 focus:outline-none"
            >
              <option value="all">All Time</option>
              <option value="monthly">This Month</option>
              <option value="weekly">This Week</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-1 mb-8 bg-gray-800/50 rounded-lg p-1">
          {['level', 'missions', 'weekly'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-red-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {tab === 'level' && <><Zap className="inline mr-2" size={18} />Level Rankings</>}
              {tab === 'missions' && <><Target className="inline mr-2" size={18} />Mission Rankings</>}
              {tab === 'weekly' && <><TrendingUp className="inline mr-2" size={18} />Weekly Leaders</>}
            </button>
          ))}
        </div>

{/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {/* 2nd Place */}
          <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6 text-center transform translate-y-4">
            <div className="flex justify-center mb-3">
              <Medal className="text-gray-300" size={40} />
            </div>
            <div className="text-xl font-bold text-white mb-1">{currentData[2]?.name || currentData[2]?.email}</div>
          
            <div className="text-gray-400 text-sm">
              {activeTab === 'level' && `Level ${currentData[1]?.level}`}
              {activeTab === 'missions' && `${currentData[1]?.missions} missions`}
              {activeTab === 'weekly' && `${currentData[1]?.weeklyXP} XP`}
            </div>
          </div>

          {/* 1st Place */}
          <div className="bg-gradient-to-b from-yellow-600/20 to-gray-800/50 border border-yellow-500/50 rounded-lg p-6 text-center">
            <div className="flex justify-center mb-3">
              <Crown className="text-yellow-400" size={48} />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{currentData[0]?.name}</div>
            
            <div className="text-yellow-400 font-bold">
              {activeTab === 'level' && `Level ${currentData[0]?.level}`}
              {activeTab === 'missions' && `${currentData[0]?.missions} missions`}
              {activeTab === 'weekly' && `${currentData[0]?.weeklyXP} XP`}
            </div>
          </div>

          {/* 3rd Place */}
          <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6 text-center transform translate-y-8">
            <div className="flex justify-center mb-3">
              <Award className="text-orange-400" size={36} />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{currentData[1]?.name || currentData[1]?.email}</div>
             
            <div className="text-gray-400 text-sm">
              {activeTab === 'level' && `Level ${currentData[2]?.level}`}
              {activeTab === 'missions' && `${currentData[2]?.missions} missions`}
              {activeTab === 'weekly' && `${currentData[2]?.weeklyXP} XP`}
            </div>
          </div>
        </div>
        {loading ? (
          <p className="text-center text-red-400">Loading leaderboard...</p>
        ) : (
          <div className="bg-gray-900/50 border border-red-500/20 rounded-lg overflow-hidden">
            <div className="bg-red-600/20 p-4 border-b border-red-500/20">
              <h2 className="text-xl font-bold text-red-400">Complete Rankings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-4 text-red-400 font-semibold">Rank</th>
                    <th className="text-left p-4 text-red-400 font-semibold">Agent</th>
                    <th className="text-left p-4 text-red-400 font-semibold">
                      {activeTab === 'level' && 'Level'}
                      {activeTab === 'missions' && 'Missions'}
                      {activeTab === 'weekly' && 'Weekly XP'}
                    </th>
                    <th className="text-left p-4 text-red-400 font-semibold">
                      {activeTab === 'level' && 'Experience'}
                      {activeTab === 'missions' && 'Success Rate'}
                      {activeTab === 'weekly' && 'This Week'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((agent, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-800 hover:bg-gray-800/30 transition-all duration-200 ${
                        agent.isCurrentUser ? 'bg-red-900/20 border-red-500/30' : ''
                      }`}
                    >
                      <td className="p-4">
                        <div className="flex items-center">
                          {getRankIcon(agent.rank)}
                          {agent.isCurrentUser && (
                            <span className="ml-2 text-xs bg-red-600 text-white px-2 py-1 rounded-full">YOU</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 font-bold text-white">{agent.name}</td>
                     
                      <td className="p-4 text-white font-semibold">
                        {activeTab === 'level' && agent.level}
                        {activeTab === 'missions' && agent.missions}
                        {activeTab === 'weekly' && `${agent.weekly_xp} XP`}
                      </td>
                      <td className="p-4 text-gray-300">
                        {activeTab === 'level' && `${agent.experience?.toLocaleString()} XP`}
                        {activeTab === 'missions' && `${agent.success_rate}%`}
                        {activeTab === 'weekly' && `${agent.missions} missions`}
                      </td>
                     
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;