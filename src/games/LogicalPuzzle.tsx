import React, { useState, useCallback, useEffect } from 'react';
import { Brain, CheckCircle, Clock, Trophy, Star, Shield, Target, Zap, Award, Crown, Medal, Gift, Rocket, ArrowLeft } from 'lucide-react';

interface Puzzle {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number;
  points: number;
  category: 'sequence' | 'verbal' | 'mathematical' | 'spatial';
  hint?: string;
  imageUrl?: string;
}

interface GameStats {
  totalScore: number;
  correctAnswers: number;
  totalTime: number;
  averageTime: number;
  bestStreak: number;
  gamesPlayed: number;
}

const puzzles: Puzzle[] = [
  {
    id: 1,
    question: "If all flowers are plants, and some plants are trees, which statement is definitely true?",
    options: [
      "All flowers are trees",
      "Some flowers are trees",
      "All flowers are plants",
      "No flowers are trees"
    ],
    correctAnswer: 2,
    explanation: "Since all flowers are plants, this is the only statement we can be certain is true. The relationship between plants and trees doesn't give us enough information to make any other conclusions.",
    difficulty: 'easy',
    timeLimit: 30,
    points: 100,
    category: 'verbal',
    hint: "Think about the definite relationship mentioned in the first part."
  },
  {
    id: 2,
    question: "Complete the series: 2, 6, 12, 20, ?",
    options: ["30", "28", "32", "24"],
    correctAnswer: 0,
    explanation: "The difference between consecutive numbers increases by 2 each time: 4 (6-2), 6 (12-6), 8 (20-12), 10 (30-20)",
    difficulty: 'medium',
    timeLimit: 45,
    points: 150,
    category: 'sequence',
    hint: "Look at the difference between each consecutive number."
  },
  {
    id: 3,
    question: "In a race, if A beats B by 10 meters and B beats C by 5 meters, by how many meters does A beat C?",
    options: ["10 meters", "15 meters", "5 meters", "Cannot be determined"],
    correctAnswer: 1,
    explanation: "Since A is 10 meters ahead of B, and B is 5 meters ahead of C, A must be 15 meters ahead of C (10 + 5 = 15)",
    difficulty: 'hard',
    timeLimit: 60,
    points: 200,
    category: 'mathematical',
    hint: "Add the distances between each pair of runners."
  },
  {
    id: 4,
    question: "Which pattern comes next in the sequence?",
    options: ["Pattern A", "Pattern B", "Pattern C", "Pattern D"],
    correctAnswer: 2,
    explanation: "The pattern follows a rotation and addition of elements in each step.",
    difficulty: 'hard',
    timeLimit: 45,
    points: 200,
    category: 'spatial',
    imageUrl: "https://images.unsplash.com/photo-1614032686163-bdc24c13d0b6?w=800&q=80",
    hint: "Focus on how the elements rotate and combine."
  },
  // Add more puzzles here...
];

const difficultySettings = {
  easy: {
    timeMultiplier: 1.2,
    pointsMultiplier: 1,
    streakBonus: 10,
    icon: <Shield className="w-6 h-6 text-green-500" />
  },
  medium: {
    timeMultiplier: 1,
    pointsMultiplier: 1.5,
    streakBonus: 20,
    icon: <Target className="w-6 h-6 text-yellow-500" />
  },
  hard: {
    timeMultiplier: 0.8,
    pointsMultiplier: 2,
    streakBonus: 30,
    icon: <Zap className="w-6 h-6 text-red-500" />
  }
};

const achievements = [
  {
    id: 'speed_demon',
    title: 'Speed Demon',
    description: 'Complete a puzzle in under 10 seconds',
    icon: <Rocket className="w-8 h-8 text-yellow-500" />
  },
  {
    id: 'perfect_streak',
    title: 'Perfect Streak',
    description: 'Get 5 correct answers in a row',
    icon: <Award className="w-8 h-8 text-blue-500" />
  },
  {
    id: 'master_mind',
    title: 'Master Mind',
    description: 'Score over 1000 points in one session',
    icon: <Crown className="w-8 h-8 text-purple-500" />
  }
];

export default function LogicalPuzzle() {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(puzzles[0].timeLimit);
  const [gameStats, setGameStats] = useState<GameStats>({
    totalScore: 0,
    correctAnswers: 0,
    totalTime: 0,
    averageTime: 0,
    bestStreak: 0,
    gamesPlayed: 0
  });
  const [timeTaken, setTimeTaken] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [powerups, setPowerups] = useState({
    timeFreeze: 2,
    fiftyFifty: 1,
    hintBoost: 1
  });
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);
  const [showCompletion, setShowCompletion] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0 && !selectedAnswer) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && !selectedAnswer) {
      handleTimeout();
    }
    return () => clearInterval(timer);
  }, [timeLeft, selectedAnswer]);

  const handleTimeout = useCallback(() => {
    setSelectedAnswer(-1);
    setShowExplanation(true);
    setStreak(0);
    updateStats(false, puzzles[currentPuzzle].timeLimit);
  }, [currentPuzzle]);

  const updateStats = useCallback((isCorrect: boolean, time: number) => {
    setGameStats(prev => ({
      totalScore: prev.totalScore + (isCorrect ? puzzles[currentPuzzle].points : 0),
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      totalTime: prev.totalTime + time,
      averageTime: Math.round((prev.totalTime + time) / (currentPuzzle + 1)),
      bestStreak: Math.max(prev.bestStreak, streak + (isCorrect ? 1 : 0)),
      gamesPlayed: prev.gamesPlayed + 1
    }));
  }, [currentPuzzle, streak]);

  const checkAchievements = useCallback((isCorrect: boolean, time: number) => {
    const newAchievements = [...unlockedAchievements];
    
    if (time < 10 && isCorrect && !newAchievements.includes('speed_demon')) {
      newAchievements.push('speed_demon');
    }
    
    if (streak >= 4 && isCorrect && !newAchievements.includes('perfect_streak')) {
      newAchievements.push('perfect_streak');
    }
    
    if (score > 1000 && !newAchievements.includes('master_mind')) {
      newAchievements.push('master_mind');
    }

    if (newAchievements.length > unlockedAchievements.length) {
      setUnlockedAchievements(newAchievements);
      // Play achievement sound
      new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3').play();
    }
  }, [unlockedAchievements, streak, score]);

  const handleAnswer = useCallback((index: number) => {
    if (!timeLeft || selectedAnswer !== null) return;

    const timeTaken = puzzles[currentPuzzle].timeLimit - timeLeft;
    setTimeTaken(timeTaken);
    setSelectedAnswer(index);
    
    const isCorrect = index === puzzles[currentPuzzle].correctAnswer;
    if (isCorrect) {
      const settings = difficultySettings[difficulty];
      const timeBonus = Math.round((timeLeft / puzzles[currentPuzzle].timeLimit) * 50);
      const streakBonus = Math.floor(streak / 3) * settings.streakBonus;
      const points = Math.round((puzzles[currentPuzzle].points + timeBonus + streakBonus) * settings.pointsMultiplier);
      
      setScore(s => s + points);
      setStreak(s => s + 1);
      // Play success sound
      new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3').play();
    } else {
      setStreak(0);
      // Play error sound
      new Audio('https://assets.mixkit.co/active_storage/sfx/2001/2001-preview.mp3').play();
    }
    
    updateStats(isCorrect, timeTaken);
    checkAchievements(isCorrect, timeTaken);
    setShowExplanation(true);
  }, [currentPuzzle, timeLeft, selectedAnswer, streak, difficulty, updateStats, checkAchievements]);

  const usePowerup = useCallback((type: keyof typeof powerups) => {
    if (powerups[type] <= 0) return;

    setPowerups(prev => ({ ...prev, [type]: prev[type] - 1 }));

    switch (type) {
      case 'timeFreeze':
        setTimeLeft(t => t + 15);
        break;
      case 'fiftyFifty':
        const correctAnswer = puzzles[currentPuzzle].correctAnswer;
        const wrongOptions = [0, 1, 2, 3].filter(i => i !== correctAnswer);
        const eliminateCount = 2;
        const toEliminate = wrongOptions
          .sort(() => Math.random() - 0.5)
          .slice(0, eliminateCount);
        setEliminatedOptions(toEliminate);
        break;
      case 'hintBoost':
        setShowHint(true);
        break;
    }
  }, [currentPuzzle, powerups]);

  const nextPuzzle = useCallback(() => {
    if (currentPuzzle < puzzles.length - 1) {
      setCurrentPuzzle(c => c + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeLeft(puzzles[currentPuzzle + 1].timeLimit * difficultySettings[difficulty].timeMultiplier);
      setShowHint(false);
      setEliminatedOptions([]);
    } else {
      setShowCompletion(true);
    }
  }, [currentPuzzle, difficulty]);

  const resetGame = useCallback(() => {
    setCurrentPuzzle(0);
    setScore(0);
    setStreak(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setTimeLeft(puzzles[0].timeLimit * difficultySettings[difficulty].timeMultiplier);
    setShowHint(false);
    setEliminatedOptions([]);
    setPowerups({
      timeFreeze: 2,
      fiftyFifty: 1,
      hintBoost: 1
    });
    setShowCompletion(false);
  }, [difficulty]);

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
              Puzzle Master! 🎉
            </h2>
            
            <div className="mb-8">
              <div className="text-5xl mb-4 animate-bounce">
                <Trophy className="w-20 h-20 mx-auto text-yellow-500" />
              </div>
              <p className="text-2xl font-bold text-green-400 mb-2">
                Final Score: {score}
              </p>
              <p className="text-xl text-blue-400">
                Best Streak: {gameStats.bestStreak}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-800 p-4 rounded-lg">
                <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-white font-bold">{gameStats.averageTime}s</p>
                <p className="text-gray-400 text-sm">Avg Time</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-white font-bold">{gameStats.correctAnswers}</p>
                <p className="text-gray-400 text-sm">Correct</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-white font-bold">{streak}</p>
                <p className="text-gray-400 text-sm">Final Streak</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <Medal className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="text-white font-bold">{difficulty}</p>
                <p className="text-gray-400 text-sm">Difficulty</p>
              </div>
            </div>

            {unlockedAchievements.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Achievements Unlocked!</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {unlockedAchievements.map(id => {
                    const achievement = achievements.find(a => a.id === id);
                    return achievement && (
                      <div key={id} className="bg-gray-800 p-4 rounded-lg">
                        {achievement.icon}
                        <h4 className="text-white font-bold mt-2">{achievement.title}</h4>
                        <p className="text-gray-400 text-sm">{achievement.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={resetGame}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg flex items-center justify-center transition-all duration-300"
              >
                <Trophy className="w-5 h-5 mr-2" />
                Play Again
              </button>
              <button
                onClick={() => {
                  setDifficulty('easy');
                  resetGame();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg flex items-center justify-center transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Change Difficulty
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const puzzle = puzzles[currentPuzzle];
  const settings = difficultySettings[difficulty];

  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-xl">
      {/* Header with stats and powerups */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="text-white font-bold">{timeLeft}s</span>
          </div>
          <div className="flex items-center">
            <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="text-white font-bold">{score}</span>
          </div>
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="text-white font-bold">×{streak}</span>
          </div>
        </div>

        {/* Powerups */}
        <div className="flex space-x-2">
          {powerups.timeFreeze > 0 && (
            <button
              onClick={() => usePowerup('timeFreeze')}
              className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 transition-colors"
              title="Time Freeze"
            >
              <Clock className="w-4 h-4" />
              <span className="text-xs">×{powerups.timeFreeze}</span>
            </button>
          )}
          {powerups.fiftyFifty > 0 && (
            <button
              onClick={() => usePowerup('fiftyFifty')}
              className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 transition-colors"
              title="50:50"
            >
              <div className="text-xs">50:50</div>
              <span className="text-xs">×{powerups.fiftyFifty}</span>
            </button>
          )}
          {powerups.hintBoost > 0 && (
            <button
              onClick={() => usePowerup('hintBoost')}
              className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 transition-colors"
              title="Hint Boost"
            >
              <Brain className="w-4 h-4" />
              <span className="text-xs">×{powerups.hintBoost}</span>
            </button>
          )}
        </div>
      </div>

      {/* Question Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            {settings.icon}
            <span className="text-sm font-semibold text-white capitalize">{difficulty}</span>
          </div>
          <span className="text-yellow-500 text-sm">
            {puzzle.points * settings.pointsMultiplier} pts
          </span>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg mb-4">
          <p className="text-lg text-white font-semibold mb-4">{puzzle.question}</p>
          
          {puzzle.imageUrl && (
            <img
              src={puzzle.imageUrl}
              alt="Puzzle visual"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          )}

          {showHint && puzzle.hint && (
            <div className="bg-yellow-500/20 p-3 rounded-lg mb-4">
              <div className="flex items-center text-yellow-500 mb-1">
                <Brain className="w-4 h-4 mr-2" />
                <span className="font-semibold">Hint:</span>
              </div>
              <p className="text-yellow-400 text-sm">{puzzle.hint}</p>
            </div>
          )}
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {puzzle.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !selectedAnswer && handleAnswer(index)}
              disabled={selectedAnswer !== null || eliminatedOptions.includes(index)}
              className={`p-4 rounded-lg text-left transition-all duration-300 ${
                eliminatedOptions.includes(index)
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-50'
                  : selectedAnswer === null
                  ? 'bg-gray-800 hover:bg-gray-700 text-white'
                  : index === puzzle.correctAnswer
                  ? 'bg-green-600 text-white'
                  : index === selectedAnswer
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {selectedAnswer !== null && index === puzzle.correctAnswer && (
                  <CheckCircle className="w-5 h-5" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Explanation Section */}
      {showExplanation && (
        <div className="mb-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-white font-bold mb-2 flex items-center">
              <Brain className="w-5 h-5 text-blue-400 mr-2" />
              Explanation
            </h4>
            <p className="text-gray-300">{puzzle.explanation}</p>
          </div>
        </div>
      )}

      {/* Next Button */}
      {selectedAnswer !== null && (
        <button
          onClick={nextPuzzle}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-lg font-bold transition-all duration-300"
        >
          Next Puzzle
        </button>
      )}

      {/* Progress Indicator */}
      <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
        <span>Puzzle {currentPuzzle + 1} of {puzzles.length}</span>
        <span>{puzzle.category}</span>
      </div>
    </div>
  );
}