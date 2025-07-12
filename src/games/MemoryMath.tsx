import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, Timer, Star, RefreshCw, Volume2, VolumeX, Brain, Rocket, Medal, Crown, Gift, ArrowLeft, Repeat } from 'lucide-react';

interface Card {
  id: number;
  content: string;
  category: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface GameStats {
  bestTime: number;
  gamesPlayed: number;
  totalMatches: number;
}

// Educational content categories with emojis
const categories = [
  { name: 'Math', emoji: '🔢', items: ['1+1=2', '2×2=4', '3-1=2', '4÷2=2', '5+5=10', '6×6=36'] },
  { name: 'Animals', emoji: '🐾', items: ['🦁 Lion', '🐘 Elephant', '🦒 Giraffe', '🐯 Tiger', '🦊 Fox', '🐼 Panda'] },
  { name: 'Fruits', emoji: '🍎', items: ['🍎 Apple', '🍌 Banana', '🍇 Grapes', '🍊 Orange', '🍓 Berry', '🥝 Kiwi'] },
  { name: 'Space', emoji: '🚀', items: ['🌎 Earth', '🌙 Moon', '⭐ Star', '☀️ Sun', '🪐 Saturn', '🌠 Comet'] }
];

export default function MemoryMath() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [sound, setSound] = useState(true);
  const [streak, setStreak] = useState(0);
  const [gameStats, setGameStats] = useState<GameStats>(() => {
    const saved = localStorage.getItem('memoryGameStats');
    return saved ? JSON.parse(saved) : { bestTime: Infinity, gamesPlayed: 0, totalMatches: 0 };
  });
  const [showCompletion, setShowCompletion] = useState(false);
  const [earnedReward, setEarnedReward] = useState<string>('');

  // Sound effects
  const playMatchSound = () => {
    if (sound) {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
      audio.play();
    }
  };

  const playFlipSound = () => {
    if (sound) {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2001/2001-preview.mp3');
      audio.play();
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const getDifficultyPairs = () => {
    switch (difficulty) {
      case 'easy': return 6;
      case 'medium': return 8;
      case 'hard': return 12;
      default: return 6;
    }
  };

  const initializeGame = (category: string) => {
    const categoryItems = categories.find(c => c.name === category)?.items || [];
    const pairs = getDifficultyPairs();
    const selectedItems = categoryItems.slice(0, pairs);
    
    const gameCards: Card[] = [...selectedItems, ...selectedItems]
      .map((content, index) => ({
        id: index,
        content,
        category,
        isFlipped: false,
        isMatched: false
      }))
      .sort(() => Math.random() - 0.5);

    setCards(gameCards);
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
    setTime(0);
    setStreak(0);
    setIsPlaying(true);
    setSelectedCategory(category);
  };

  const handleCardClick = (index: number) => {
    if (!isPlaying || flippedCards.length === 2 || cards[index].isFlipped || cards[index].isMatched) return;

    playFlipSound();
    
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    
    if (flippedCards.length === 1) {
      setMoves(m => m + 1);
      const [firstIndex] = flippedCards;
      
      if (cards[firstIndex].content === cards[index].content) {
        playMatchSound();
        newCards[firstIndex].isMatched = true;
        newCards[index].isMatched = true;
        setMatches(m => m + 1);
        setStreak(s => s + 1);
        setFlippedCards([]);
      } else {
        setStreak(0);
        setFlippedCards([firstIndex, index]);
        setTimeout(() => {
          newCards[firstIndex].isFlipped = false;
          newCards[index].isFlipped = false;
          setCards([...newCards]);
          setFlippedCards([]);
        }, 1000);
      }
    } else {
      setFlippedCards([index]);
    }
  };

  const calculateReward = () => {
    const timeBonus = getDifficultyPairs() * 10 - time;
    const moveBonus = getDifficultyPairs() * 3 - moves;
    const totalScore = Math.max(0, timeBonus) + Math.max(0, moveBonus) * 10;

    if (difficulty === 'hard' && totalScore > 100) return '🏆 Master of Memory';
    if (streak >= 5) return '⚡ Lightning Memory';
    if (moves <= getDifficultyPairs() * 2) return '🎯 Perfect Matcher';
    if (time <= getDifficultyPairs() * 5) return '⚡ Speed Champion';
    return '🌟 Memory Star';
  };

  const getRewardColor = (reward: string) => {
    switch (reward) {
      case '🏆 Master of Memory': return 'from-yellow-400 to-yellow-600';
      case '⚡ Lightning Memory': return 'from-purple-400 to-purple-600';
      case '🎯 Perfect Matcher': return 'from-green-400 to-green-600';
      case '⚡ Speed Champion': return 'from-blue-400 to-blue-600';
      default: return 'from-yellow-400 to-orange-600';
    }
  };

  const handleGameComplete = () => {
    const newStats = {
      bestTime: Math.min(time, gameStats.bestTime),
      gamesPlayed: gameStats.gamesPlayed + 1,
      totalMatches: gameStats.totalMatches + matches
    };
    setGameStats(newStats);
    localStorage.setItem('memoryGameStats', JSON.stringify(newStats));
    setIsPlaying(false);
    setEarnedReward(calculateReward());
    setShowCompletion(true);

    // Play victory sound
    if (sound) {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');
      audio.play();
    }
  };

  useEffect(() => {
    if (matches === getDifficultyPairs() && isPlaying) {
      handleGameComplete();
    }
  }, [matches, isPlaying]);

  if (showCompletion) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-gray-900 p-8 rounded-lg shadow-xl text-center relative overflow-hidden">
          {/* Animated confetti background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-fall"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-20px`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`
                }}
              >
                {['🎉', '✨', '🌟', '💫', '⭐'][Math.floor(Math.random() * 5)]}
              </div>
            ))}
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-4">
              Congratulations! 🎉
            </h2>
            
            <div className="mb-8">
              <div className={`text-5xl mb-4 animate-bounce`}>
                <Trophy className="w-20 h-20 mx-auto text-yellow-500" />
              </div>
              <div className={`inline-block bg-gradient-to-r ${getRewardColor(earnedReward)} px-6 py-3 rounded-full text-white font-bold text-xl mb-4 animate-pulse`}>
                {earnedReward}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-800 p-4 rounded-lg">
                <Timer className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-white font-bold">{time}s</p>
                <p className="text-gray-400 text-sm">Time</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <Sparkles className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-white font-bold">{moves}</p>
                <p className="text-gray-400 text-sm">Moves</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-white font-bold">{streak}</p>
                <p className="text-gray-400 text-sm">Best Streak</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <Crown className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="text-white font-bold">{difficulty}</p>
                <p className="text-gray-400 text-sm">Difficulty</p>
              </div>
            </div>

            {time < gameStats.bestTime && (
              <div className="bg-yellow-500/20 p-4 rounded-lg mb-8 animate-pulse">
                <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-yellow-500 font-bold">New Best Time!</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => {
                  setShowCompletion(false);
                  initializeGame(selectedCategory!);
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg flex items-center justify-center transition-all duration-300"
              >
                <Repeat className="w-5 h-5 mr-2" />
                Play Again
              </button>
              <button
                onClick={() => {
                  setShowCompletion(false);
                  setSelectedCategory(null);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg flex items-center justify-center transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Choose Category
              </button>
            </div>

            {/* Achievement unlocked animation */}
            <div className="mt-8 bg-gray-800 p-4 rounded-lg">
              <Gift className="w-6 h-6 text-pink-500 mx-auto mb-2" />
              <p className="text-white font-bold">Achievement Unlocked!</p>
              <p className="text-gray-400 text-sm">
                {earnedReward === '🏆 Master of Memory' && 'Complete a hard game with exceptional performance'}
                {earnedReward === '⚡ Lightning Memory' && 'Maintain a streak of 5 or more matches'}
                {earnedReward === '🎯 Perfect Matcher' && 'Complete with minimal moves'}
                {earnedReward === '⚡ Speed Champion' && 'Complete with amazing speed'}
                {earnedReward === '🌟 Memory Star' && 'Successfully complete the memory challenge'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedCategory) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-gray-900 p-8 rounded-lg shadow-xl text-center">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center justify-center">
            <Brain className="w-8 h-8 mr-3 text-yellow-500" />
            Memory Match Challenge
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg">
              <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-white font-bold">Best Time: {gameStats.bestTime === Infinity ? '-' : `${gameStats.bestTime}s`}</p>
              <p className="text-gray-400 text-sm">Games: {gameStats.gamesPlayed}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-white font-bold">Total Matches: {gameStats.totalMatches}</p>
              <p className="text-gray-400 text-sm">Keep practicing!</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Select Difficulty</h3>
            <div className="flex justify-center gap-4">
              {(['easy', 'medium', 'hard'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                    difficulty === level
                      ? 'bg-blue-600 text-white transform scale-105'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => initializeGame(category.name)}
                className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-4xl mb-2">{category.emoji}</div>
                <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                <p className="text-gray-400 text-sm">
                  {getDifficultyPairs()} pairs to match
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-gray-900 p-6 rounded-lg shadow-xl">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <div className="flex items-center">
              <Timer className="w-5 h-5 text-yellow-500 mr-2" />
              <span className="text-white font-bold">{time}s</span>
            </div>
            <div className="flex items-center">
              <Sparkles className="w-5 h-5 text-yellow-500 mr-2" />
              <span className="text-white font-bold">Moves: {moves}</span>
            </div>
            <div className="flex items-center">
              <Rocket className="w-5 h-5 text-yellow-500 mr-2" />
              <span className="text-white font-bold">Streak: {streak}</span>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={() => setSound(!sound)}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
            >
              {sound ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setSelectedCategory(null)}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className={`grid gap-4 mb-4 ${
          difficulty === 'easy' ? 'grid-cols-3 sm:grid-cols-4' :
          difficulty === 'medium' ? 'grid-cols-4 sm:grid-cols-4' :
          'grid-cols-4 sm:grid-cols-6'
        }`}>
          {cards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(index)}
              className={`aspect-square rounded-lg text-2xl sm:text-3xl transition-all duration-300 transform ${
                card.isFlipped || card.isMatched
                  ? 'bg-blue-600 rotate-0 scale-100'
                  : 'bg-gray-800 rotate-y-180 hover:bg-gray-700'
              } ${card.isMatched ? 'opacity-60' : ''}`}
              disabled={card.isMatched}
            >
              {(card.isFlipped || card.isMatched) && (
                <div className="flex items-center justify-center w-full h-full">
                  {card.content}
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-400">
            Match all pairs to complete the game!
          </p>
        </div>
      </div>
    </div>
  );
}