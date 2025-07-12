import React from 'react';
import { Skull, Zap, Users, Target } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 text-white px-6 py-12 pt-20">
{/* Main Container */}
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-4">
              <Skull className="text-white" size={24} />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="text-red-400">Breach</span>{' '}
              <span className="text-white">the</span>{' '}
              <span className="text-red-400">Digital Fortress</span>
            </h1>
          </div>
          
          <div className="ml-14">
            <p className="text-red-400 text-lg mb-5 font-mono">&gt; Access granted, agent...</p>
            <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
              Welcome to the underground network. Your mission: infiltrate 
              secure systems, decode encrypted messages, and complete 
              high-stakes digital operations without detection.
            </p>
          </div>
        </div>

        {/* Buttons Section */}
<div className="ml-14 mb-12 flex flex-wrap gap-4">
  <button 
    onClick={() => window.location.href = '/signup'}
    className="bg-red-700 hover:bg-red-800 text-white px-5 py-4 rounded-lg text-xl font-bold transition-all duration-300 shadow-lg hover:shadow-red-500/30 transform hover:scale-105"
  >
    Activate Protocol
  </button>

  <button 
    onClick={() => window.location.href = '/games'}
    className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-4 rounded-lg text-xl font-bold transition-all duration-300 shadow-lg hover:shadow-gray-500/30 transform hover:scale-105"
  >
    Launch Missions
  </button>
</div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <Users className="text-red-400" size={40} />
            </div>
            <div className="text-red-400 text-3xl font-bold">342</div>
            <div className="text-gray-400 text-sm">Ghost Agents</div>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <Target className="text-red-400" size={40} />
            </div>
            <div className="text-red-400 text-3xl font-bold">1.8K</div>
            <div className="text-gray-400 text-sm">Targets Breached</div>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <Zap className="text-red-400" size={40} />
            </div>
            <div className="text-red-400 text-3xl font-bold">97%</div>
            <div className="text-gray-400 text-sm">Success Rate</div>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <Skull className="text-red-400" size={40} />
            </div>
            <div className="text-red-400 text-3xl font-bold">∅</div>
            <div className="text-gray-400 text-sm">Detection Rate</div>
          </div>
        </div>

        {/* Warning Section */}
        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 mb-16">
          <div className="flex items-center mb-3">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-xs">!</span>
            </div>
            <h3 className="text-red-400 font-bold text-lg">SECURITY ALERT</h3>
          </div>
          <p className="text-gray-300 text-sm">
            All operations are conducted in simulated environments. 
            Unauthorized access to real systems is strictly prohibited 
            and may result in legal consequences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;