import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Terminal, Brain, Key, Keyboard, Shield, Globe, ArrowRight,
  FileSearch, Cpu, Search, Wrench, Puzzle, Binary, FileText, Baby,
  Users, Star, RefreshCw, Clock,Award
} from 'lucide-react';

import { ForensicsGame } from '../games/ForensicsGame';
import { ReverseGame } from '../games/ReverseGame';
import { MiscGame } from '../games/MiscGame';
import { TypingGame } from '../games/TypingGame';
import { MemoryGame } from '../games/MemoryGame';
import { CipherGame } from '../games/CipherGame';

export function QuickGame() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const navigate = useNavigate();

  const games = [
    {
      id: 'crypto',
      title: 'Cryptography',
      description: 'Break ciphers and decode encrypted messages',
      icon: Key,
      component: CipherGame,
      color: 'purple',
      difficulty: 'Expert',
      players: '2.3K+',
      time: '10 mins'
    },{
      id: 'typing',
      title: 'Speed Hacker',
      description: 'Type commands at lightning speed',
      icon: Keyboard,
      component: TypingGame,
      color: 'red',
      difficulty: 'Medium',
      players: '5.7K+',
      time: '7 mins',
      certifications: 'Certified'
    },
    {
      id: 'forensics',
      title: 'Digital Forensics',
      description: 'Investigate digital evidence and recover data',
      icon: FileSearch,
      component: ForensicsGame,
      color: 'yellow',
      difficulty: 'Medium',
      players: '3.1K+',
      time: '8 mins'
    },
    {
      id: 'misc',
      title: 'Miscellaneous',
      description: 'Solve various unique security challenges',
      icon: Puzzle,
      component: MiscGame,
      color: 'pink',
      difficulty: 'Variable',
      players: '1.9K+',
      time: '15 mins'
    },
    {
      id: 'memory',
      title: 'Cyber Memory',
      description: 'Match security tools and concepts',
      icon: Brain,
      component: MemoryGame,
      color: 'blue',
      difficulty: 'Easy',
      players: '4.2K+',
      time: '5 mins'
    },{
      id: 'reverse',
      title: 'Reverse Engineering',
      description: 'Analyze and understand compiled programs',
      icon: Binary,
      component: ReverseGame,
      color: 'green',
      difficulty: 'Hard',
      players: '1.8K+',
      time: '12 mins'
    },
    
  ];

  const GameComponent = selectedGame
    ? games.find(g => g.id === selectedGame)?.component
    : null;

  const handleKidsGamesClick = () => {
    navigate('/kidsgames');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 py-12 pt-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-red-600 to-white">
            Hacker Training Games
          </h1>
          <p className="text-gray-400">Challenge yourself with our comprehensive cybersecurity challenges</p>

          <div className="mt-6">
            <button
              onClick={handleKidsGamesClick}
              className="group relative bg-gradient-to-r from-pink-700 via-purple-700 to-pink-700 hover:from-pink-800 hover:via-purple-800 hover:to-pink-800 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-xl shadow-pink-500/25 border border-pink-500/30"
            >
              <div className="flex items-center space-x-3">
                <Baby className="w-6 h-6 group-hover:animate-bounce" />
                <span className="text-lg">Kids Training Zone</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {!selectedGame ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {games.map((game, index) => (
              <div
                key={game.id}
                className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer border border-white/20 hover:border-white/40 overflow-hidden"
                onClick={() => setSelectedGame(game.id)}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {/* Animated Gradient Background */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                  game.color === 'blue' ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                  game.color === 'green' ? 'bg-gradient-to-br from-green-400 to-green-600' :
                  game.color === 'yellow' ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                  game.color === 'purple' ? 'bg-gradient-to-br from-purple-400 to-purple-600' :
                  game.color === 'pink' ? 'bg-gradient-to-br from-pink-400 to-pink-600' :
                  'bg-gradient-to-br from-cyan-400 to-cyan-600'
                }`} />

                <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 ${
                  game.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                  game.color === 'green' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                  game.color === 'yellow' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                  game.color === 'purple' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                  game.color === 'pink' ? 'bg-gradient-to-r from-pink-500 to-pink-600' :
                  'bg-gradient-to-r from-cyan-500 to-cyan-600'
                }`}>
                  <game.icon className="w-9 h-9 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                {/* Certification Badge */}
                {game.certifications && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                    <Award className="w-3 h-3" />
                    {game.certifications}
                  </div>
                )}

                <h3 className="text-2xl font-bold text-white text-center mb-3 group-hover:text-yellow-300 transition-colors duration-300">
                  {game.title}
                </h3>

                <p className="text-white/70 text-center mb-4 leading-relaxed">
                  {game.description}
                </p>

                <div className="flex justify-between items-center text-white/70 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{game.time}</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    game.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                    game.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    game.difficulty === 'Hard' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {game.difficulty}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <button
              onClick={() => setSelectedGame(null)}
              className="mb-8 text-red-500 hover:text-red-400 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Choose Another Challenge
            </button>
            {GameComponent && <GameComponent />}
          </div>
        )}
      </div>
    </div>
  );
}
