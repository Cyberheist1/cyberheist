import React, { useState, useEffect } from 'react';
import { Book, Star, Timer, Brain, Trophy, Lightbulb, Rocket, RefreshCw, Volume2, VolumeX, Shield, Target, Zap } from 'lucide-react';

interface Word {
  word: string;
  scrambled: string;
  meaning: string;
  hint: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const categories = [
  { name: 'Common Words', icon: <Book className="w-6 h-6 text-blue-600" /> },
  { name: 'Science Terms', icon: <Brain className="w-6 h-6 text-yellow-400" /> },
  { name: 'GK Words', icon: <Trophy className="w-6 h-6 text-green-500" /> }
];

const words: Word[] = [
  // Easy Words
  {
    word: 'BOOK',
    scrambled: 'OKBO',
    meaning: 'A written or printed work',
    hint: 'You read this',
    category: 'Common Words',
    difficulty: 'easy'
  },
  {
    word: 'WATER',
    scrambled: 'TAWER',
    meaning: 'A transparent, colorless liquid',
    hint: 'Essential for life',
    category: 'Common Words',
    difficulty: 'easy'
  },
  {
    word: 'PLANT',
    scrambled: 'LPANT',
    meaning: 'A living organism of the vegetable kingdom',
    hint: 'Grows in soil',
    category: 'Science Terms',
    difficulty: 'easy'
  },
  {
    word: 'INDIA',
    scrambled: 'IDNIA',
    meaning: 'A country in South Asia',
    hint: 'Largest democracy',
    category: 'GK Words',
    difficulty: 'easy'
  },
  
  // Medium Words
  {
    word: 'DEMOCRACY',
    scrambled: 'CRAYDEMOC',
    meaning: 'A system of government by the whole population',
    hint: 'Form of government where power lies with the people',
    category: 'Common Words',
    difficulty: 'medium'
  },
  {
    word: 'MOLECULE',
    scrambled: 'CULEMOLE',
    meaning: 'The smallest unit of a chemical compound',
    hint: 'Basic building block of matter',
    category: 'Science Terms',
    difficulty: 'medium'
  },
  {
    word: 'PARLIAMENT',
    scrambled: 'MENTPARLIA',
    meaning: 'The supreme legislative body of a country',
    hint: 'Where laws are made',
    category: 'GK Words',
    difficulty: 'medium'
  },
  
  // Hard Words
  {
    word: 'PHOTOSYNTHESIS',
    scrambled: 'SSYNTHESIPHOTO',
    meaning: 'Process by which plants make their food',
    hint: 'Plants use sunlight for this process',
    category: 'Science Terms',
    difficulty: 'hard'
  },
  {
    word: 'CONSTITUTION',
    scrambled: 'TUTIONCONSTI',
    meaning: 'A body of fundamental principles',
    hint: 'Supreme law of a country',
    category: 'GK Words',
    difficulty: 'hard'
  },
  {
    word: 'BUREAUCRACY',
    scrambled: 'ACYREAUBUR',
    meaning: 'A system of government with many departments',
    hint: 'Administrative system with officials',
    category: 'Common Words',
    difficulty: 'hard'
  }
];

interface DifficultySettings {
  timeLimit: number;
  basePoints: number;
  hintPenalty: number;
  streakMultiplier: number;
}

const difficultySettings: Record<'easy' | 'medium' | 'hard', DifficultySettings> = {
  easy: {
    timeLimit: 45,
    basePoints: 100,
    hintPenalty: 25,
    streakMultiplier: 1
  },
  medium: {
    timeLimit: 30,
    basePoints: 150,
    hintPenalty: 50,
    streakMultiplier: 1.5
  },
  hard: {
    timeLimit: 20,
    basePoints: 200,
    hintPenalty: 75,
    streakMultiplier: 2
  }
};

export default function WordScramble() {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStatus, setGameStatus] = useState<'setup' | 'playing' | 'won' | 'lost'>('setup');
  const [showHint, setShowHint] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);
  const [sound, setSound] = useState(true);
  const [animation, setAnimation] = useState('');
  const [usedHints, setUsedHints] = useState(0);

  useEffect(() => {
    if (!selectedCategory || !selectedDifficulty) return;
    startGame();
  }, [selectedCategory, selectedDifficulty]);

  useEffect(() => {
    if (gameStatus === 'playing' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && gameStatus === 'playing') {
      setGameStatus('lost');
      playSound('lose');
    }
  }, [timeLeft, gameStatus]);

  const startGame = () => {
    if (!selectedDifficulty) return;
    setTimeLeft(difficultySettings[selectedDifficulty].timeLimit);
    setScore(0);
    setStreak(0);
    setGameStatus('playing');
    pickRandomWord();
  };

  const playSound = (type: 'correct' | 'wrong' | 'win' | 'lose') => {
    if (!sound) return;
    
    const sounds = {
      correct: 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3',
      wrong: 'https://assets.mixkit.co/active_storage/sfx/2001/2001-preview.mp3',
      win: 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3',
      lose: 'https://assets.mixkit.co/active_storage/sfx/2002/2002-preview.mp3'
    };
    
    new Audio(sounds[type]).play();
  };

  const pickRandomWord = () => {
    const filteredWords = words.filter(w => 
      w.category === selectedCategory && 
      w.difficulty === selectedDifficulty
    );
    const randomIndex = Math.floor(Math.random() * filteredWords.length);
    setCurrentWord(filteredWords[randomIndex]);
    setGuess('');
    setShowHint(false);
  };

  const handleGuess = () => {
    if (!currentWord || !selectedDifficulty) return;

    if (guess.toUpperCase() === currentWord.word) {
      // Correct guess
      const newStreak = streak + 1;
      setStreak(newStreak);
      setBestStreak(Math.max(bestStreak, newStreak));
      setScore(score + calculatePoints());
      setAnimation('correct');
      playSound('correct');
      
      setTimeout(() => {
        setAnimation('');
        pickRandomWord();
        setTimeLeft(difficultySettings[selectedDifficulty].timeLimit);
      }, 1000);
    } else {
      // Wrong guess
      setStreak(0);
      setAnimation('wrong');
      playSound('wrong');
      setTimeout(() => setAnimation(''), 500);
    }
  };

  const calculatePoints = () => {
    if (!currentWord || !selectedDifficulty) return 0;
    
    const settings = difficultySettings[selectedDifficulty];
    let points = settings.basePoints;
    points += streak * (10 * settings.streakMultiplier); // Streak bonus
    points += timeLeft * 2; // Time bonus
    if (showHint) points -= settings.hintPenalty; // Hint penalty
    return Math.max(Math.round(points), 0);
  };

  const getScoreClass = () => {
    if (score < 500) return 'text-white';
    if (score < 1000) return 'text-green-400';
    if (score < 2000) return 'text-blue-400';
    return 'text-yellow-400';
  };

  const getDifficultyIcon = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy':
        return <Shield className="w-6 h-6 text-green-500" />;
      case 'medium':
        return <Target className="w-6 h-6 text-yellow-500" />;
      case 'hard':
        return <Zap className="w-6 h-6 text-red-500" />;
    }
  };

  if (gameStatus === 'setup') {
    return (
      <div className="bg-gray-900 p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Word Scramble Challenge</h2>
        
        {!selectedCategory ? (
          <>
            <h3 className="text-xl text-white mb-4 text-center">Choose a Category</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex flex-col items-center gap-3 ">
                    {category.icon}
                    <span className="text-white font-semibold">{category.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : !selectedDifficulty ? (
          <>
            <div className="flex items-center mb-6">
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-gray-400 hover:text-white"
              >
                ← Back to Categories
              </button>
            </div>
            <h3 className="text-xl text-white mb-4 text-center">Select Difficulty</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(['easy', 'medium', 'hard'] as const).map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex flex-col items-center gap-3">
                    {getDifficultyIcon(difficulty)}
                    <span className="text-white font-semibold capitalize">{difficulty}</span>
                    <div className="text-sm text-gray-400">
                      <div>Time: {difficultySettings[difficulty].timeLimit}s</div>
                      <div>Points: {difficultySettings[difficulty].basePoints}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : null}
      </div>
    );
  }

  if (gameStatus === 'lost') {
    return (
      <div className="bg-gray-900 p-8 rounded-lg shadow-xl text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Time's Up! 🕒</h2>
        <div className="mb-6">
          <p className="text-xl text-gray-300">Final Score: <span className={getScoreClass()}>{score}</span></p>
          <p className="text-gray-400">Best Streak: {bestStreak}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => {
              setScore(0);
              setStreak(0);
              startGame();
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center justify-center"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Play Again
          </button>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSelectedDifficulty(null);
              setGameStatus('setup');
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center justify-center"
          >
            <Book className="w-5 h-5 mr-2" />
            Change Settings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
            <span className={`font-bold ${getScoreClass()}`}>{score}</span>
          </div>
          <div className="flex items-center">
            <Rocket className="w-5 h-5 text-blue-500 mr-2" />
            <span className="text-white font-bold">×{streak}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSound(!sound)}
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white"
          >
            {sound ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
          <div className="flex items-center">
            <Timer className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-white font-bold">{timeLeft}s</span>
          </div>
        </div>
      </div>

      {currentWord && (
        <div className={`transition-all duration-300 ${animation === 'correct' ? 'scale-105' : animation === 'wrong' ? 'shake' : ''}`}>
          <div className="bg-gray-800 p-6 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                {getDifficultyIcon(currentWord.difficulty)}
                <span className={`px-2 py-1 rounded text-xs ${
                  currentWord.difficulty === 'easy' ? 'bg-green-600' :
                  currentWord.difficulty === 'medium' ? 'bg-yellow-600' :
                  'bg-red-600'
                }`}>
                  {currentWord.difficulty.toUpperCase()}
                </span>
              </div>
              <span className="text-gray-400">{currentWord.category}</span>
            </div>
            
            <div className="text-center mb-4">
              <p className="text-3xl font-bold text-white tracking-wider">
                {currentWord.scrambled.split('').map((letter, index) => (
                  <span
                    key={index}
                    className="inline-block mx-1 bg-gray-700 px-3 py-2 rounded"
                  >
                    {letter}
                  </span>
                ))}
              </p>
            </div>

            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value.toUpperCase())}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your answer..."
              maxLength={currentWord.word.length}
            />

            {!showHint && selectedDifficulty && (
              <button
                onClick={() => {
                  setShowHint(true);
                  setUsedHints(h => h + 1);
                }}
                className="mt-4 text-yellow-500 hover:text-yellow-400 text-sm flex items-center justify-center"
              >
                <Lightbulb className="w-4 h-4 mr-1" />
                Use Hint (-{difficultySettings[selectedDifficulty].hintPenalty} points)
              </button>
            )}

            {showHint && (
              <div className="mt-4 text-gray-400 text-sm">
                <p className="flex items-center">
                  <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" />
                  {currentWord.hint}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={handleGuess}
            disabled={!guess}
            className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
              !guess
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white transform hover:scale-105'
            }`}
          >
            Check Answer
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}