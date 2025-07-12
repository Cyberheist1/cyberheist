import React, { useState } from 'react';
import { Brain, Clock, CheckCircle, Pencil, Puzzle, Gamepad, Book, Rocket, Keyboard, Eye, ArrowLeft, Star, Zap } from 'lucide-react';
import FillBlanks from '../games/FillBlanks';
import SentenceGame from '../games/SentenceGame';
import LogicalPuzzle from '../games/LogicalPuzzle';
import WordScramble from '../games/WordScramble';
import MemoryMath from '../games/MemoryMath';
import MathRace from '../games/MathRace';

export default function KidsGames() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const games = [
    {
      id: 'fill-blanks',
      name: 'Fill in the Blanks',
      description: 'Complete sentences with correct words',
      icon: <Pencil className="w-8 h-8" />,
      color: 'blue',
      component: <FillBlanks />,
      difficulty: 'Easy',
      time: '5 min'
    },
    {
      id: 'sentence-game',
      name: 'Correct the Sentence',
      description: 'Find and fix incorrect sentences',
      icon: <CheckCircle className="w-8 h-8" />,
      color: 'yellow',
      component: <SentenceGame />,
      difficulty: 'Medium',
      time: '7 min'
    },
    {
      id: 'logical-puzzle',
      name: 'Logical Reasoning',
      description: 'Solve logical puzzles and riddles',
      icon: <Puzzle className="w-8 h-8" />,
      color: 'purple',
      component: <LogicalPuzzle />,
      difficulty: 'Hard',
      time: '10 min'
    },
    {
      id: 'word-scramble',
      name: 'Word Scramble',
      description: 'Unscramble important exam terms',
      icon: <Book className="w-8 h-8" />,
      color: 'pink',
      component: <WordScramble />,
      difficulty: 'Easy',
      time: '4 min'
    },
    {
      id: 'memory-game',
      name: 'Memory Match',
      description: 'Match pairs to improve memory',
      icon: <Brain className="w-8 h-8" />,
      color: 'cyan',
      component: <MemoryMath />,
      difficulty: 'Medium',
      time: '6 min'
    },
    {
      id: 'math-race',
      name: 'Math Race',
      description: 'Race against AI by solving math problems',
      icon: <Rocket className="w-8 h-8" />,
      color: 'orange',
      component: <MathRace />,
      difficulty: 'Hard',
      time: '8 min'
    },
  ];

  if (selectedGame) {
    const game = games.find(g => g.id === selectedGame);
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 py-12 pt-24">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => setSelectedGame(null)}
            className="mb-6 bg-gradient-to-r from-purple-700 to-pink-700 hover:from-purple-800 hover:to-pink-800 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Games
          </button>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
            {game?.component}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 py-12 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 mb-4">
            🎮 Learning Games
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Fun and educational games to boost your learning experience!
          </p>
        </div>

        {/* Games Grid */}
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
              {/* Animated Background Gradient */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                game.color === 'blue' ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                game.color === 'green' ? 'bg-gradient-to-br from-green-400 to-green-600' :
                game.color === 'yellow' ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                game.color === 'purple' ? 'bg-gradient-to-br from-purple-400 to-purple-600' :
                game.color === 'pink' ? 'bg-gradient-to-br from-pink-400 to-pink-600' :
                game.color === 'orange' ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                game.color === 'indigo' ? 'bg-gradient-to-br from-indigo-400 to-indigo-600' :
                game.color === 'teal' ? 'bg-gradient-to-br from-teal-400 to-teal-600' : 'bg-gradient-to-br from-cyan-400 to-cyan-600'
              }`}></div>

              {/* Game Icon */}
              <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 ${
                game.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                game.color === 'green' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                game.color === 'yellow' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                game.color === 'purple' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                game.color === 'pink' ? 'bg-gradient-to-r from-pink-500 to-pink-600' :
                game.color === 'orange' ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                game.color === 'indigo' ? 'bg-gradient-to-r from-indigo-500 to-indigo-600' :
                game.color === 'teal' ? 'bg-gradient-to-r from-teal-500 to-teal-600' : 'bg-gradient-to-r from-cyan-500 to-cyan-600'
              }`}>
                <div className="text-white group-hover:scale-110 transition-transform duration-300">
                  {game.icon}
                </div>
              </div>

              {/* Game Title */}
              <h3 className="text-2xl font-bold text-white text-center mb-3 group-hover:text-yellow-300 transition-colors duration-300">
                {game.name}
              </h3>

              {/* Game Description */}
              <p className="text-white/70 text-center mb-4 leading-relaxed">
                {game.description}
              </p>

              {/* Game Info */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-white/60" />
                  <span className="text-sm text-white/60">{game.time}</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  game.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                  game.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {game.difficulty}
                </div>
              </div>

              {/* Hover Play Button */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Zap className="w-5 h-5 text-yellow-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 text-white/60">
            <Star className="w-5 h-5 text-yellow-400" />
            <span>Choose a game to start your learning adventure!</span>
            <Star className="w-5 h-5 text-yellow-400" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}