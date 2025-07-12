import React, { useState, useEffect } from 'react';
import { Star, RefreshCw, Brain, Trophy, Timer, Target, CloudLightning as Lightning, Award } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  blanks: string[];
  answers: string[];
  hint: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

// Expanded question bank with different categories and difficulties
const questions: Question[] = [
  {
    id: 1,
    text: "The Constitution of India was adopted on ___ and came into effect on ___.",
    blanks: ["26th November 1949", "26th January 1950"],
    answers: ["26th November 1949", "26th January 1950"],
    hint: "Republic Day is celebrated on January 26th",
    category: "History",
    difficulty: "medium",
    points: 100
  },
  {
    id: 2,
    text: "The speed of light is ___ meters per second, and sound travels at ___ meters per second in air.",
    blanks: ["299,792,458", "343"],
    answers: ["299,792,458", "343"],
    hint: "Light travels much faster than sound",
    category: "Science",
    difficulty: "hard",
    points: 150
  },
  {
    id: 3,
    text: "Water freezes at ___ degrees Celsius and boils at ___ degrees Celsius at standard pressure.",
    blanks: ["0", "100"],
    answers: ["0", "100"],
    hint: "Think about the basic temperature scale",
    category: "Science",
    difficulty: "easy",
    points: 50
  },
  {
    id: 4,
    text: "The largest planet in our solar system is ___ and the smallest is ___.",
    blanks: ["Jupiter", "Mercury"],
    answers: ["Jupiter", "Mercury"],
    hint: "One is a gas giant, the other is closest to the Sun",
    category: "Science",
    difficulty: "medium",
    points: 100
  },
  {
    id: 5,
    text: "The first Prime Minister of India was ___ and the first President was ___.",
    blanks: ["Jawaharlal Nehru", "Dr. Rajendra Prasad"],
    answers: ["Jawaharlal Nehru", "Dr. Rajendra Prasad"],
    hint: "Both were freedom fighters",
    category: "History",
    difficulty: "medium",
    points: 100
  }
];

export default function FillBlanks() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showHint, setShowHint] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [gameStats, setGameStats] = useState({
    gamesPlayed: 0,
    totalScore: 0,
    averageScore: 0
  });
  const [animation, setAnimation] = useState('');
  const [powerups, setPowerups] = useState({
    timeFreeze: 2,
    extraHint: 1,
    pointsBoost: 1
  });

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleGameOver();
    }
  }, [timeLeft, showResult]);

  useEffect(() => {
    setUserAnswers(new Array(questions[currentQuestion].blanks.length).fill(''));
  }, [currentQuestion]);

  const handleAnswer = (index: number, value: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };

  const calculatePoints = () => {
    const question = questions[currentQuestion];
    let points = question.points;
    
    // Time bonus
    const timeBonus = Math.floor(timeLeft / 10) * 5;
    points += timeBonus;

    // Streak bonus
    const streakBonus = Math.floor(streak / 3) * 20;
    points += streakBonus;

    // Hint penalty
    if (showHint) {
      points = Math.floor(points * 0.8);
    }

    return points;
  };

  const checkAnswers = () => {
    const correct = userAnswers.every(
      (answer, index) => answer.toLowerCase() === questions[currentQuestion].answers[index].toLowerCase()
    );

    if (correct) {
      const points = calculatePoints();
      setScore(score + points);
      setStreak(s => {
        const newStreak = s + 1;
        setBestStreak(Math.max(bestStreak, newStreak));
        return newStreak;
      });
      setAnimation('correct');
      playSound('correct');
    } else {
      setStreak(0);
      setAnimation('wrong');
      playSound('wrong');
    }
    
    setTimeout(() => {
      setAnimation('');
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setShowHint(false);
      } else {
        handleGameOver();
      }
    }, 1000);
  };

  const handleGameOver = () => {
    setShowResult(true);
    setGameStats(prev => ({
      gamesPlayed: prev.gamesPlayed + 1,
      totalScore: prev.totalScore + score,
      averageScore: Math.round((prev.totalScore + score) / (prev.gamesPlayed + 1))
    }));
    playSound('complete');
  };

  const playSound = (type: 'correct' | 'wrong' | 'complete') => {
    const sounds = {
      correct: 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3',
      wrong: 'https://assets.mixkit.co/active_storage/sfx/2001/2001-preview.mp3',
      complete: 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3'
    };
    new Audio(sounds[type]).play();
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setShowResult(false);
    setShowHint(false);
    setHintsUsed(0);
    setUserAnswers([]);
    setPowerups({
      timeFreeze: 2,
      extraHint: 1,
      pointsBoost: 1
    });
  };

  const usePowerup = (type: keyof typeof powerups) => {
    if (powerups[type] <= 0) return;

    setPowerups(prev => ({ ...prev, [type]: prev[type] - 1 }));

    switch (type) {
      case 'timeFreeze':
        setTimeLeft(prev => prev + 15);
        break;
      case 'extraHint':
        setShowHint(true);
        break;
      case 'pointsBoost':
        // Will be applied on next correct answer
        break;
    }
  };

  if (showResult) {
    return (
      <div className="bg-gray-900 p-8 rounded-lg shadow-xl text-center">
        <div className="mb-8">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Game Complete! 🎉</h2>
          <p className="text-xl text-green-400 mb-6">
            Score: {score} points
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <p className="text-white font-bold">{bestStreak}</p>
              <p className="text-gray-400 text-sm">Best Streak</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <Timer className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="text-white font-bold">{60 - timeLeft}s</p>
              <p className="text-gray-400 text-sm">Time Used</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <Brain className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <p className="text-white font-bold">{hintsUsed}</p>
              <p className="text-gray-400 text-sm">Hints Used</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <Award className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-white font-bold">{gameStats.averageScore}</p>
              <p className="text-gray-400 text-sm">Avg Score</p>
            </div>
          </div>
        </div>
        <button
          onClick={resetGame}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg flex items-center mx-auto"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Play Again
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Timer className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="text-white font-bold">{timeLeft}s</span>
          </div>
          <div className="flex items-center">
            <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="text-white font-bold">{score}</span>
          </div>
          <div className="flex items-center">
            <Lightning className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="text-white font-bold">×{streak}</span>
          </div>
        </div>

        <div className="flex space-x-2">
          {powerups.timeFreeze > 0 && (
            <button
              onClick={() => usePowerup('timeFreeze')}
              className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 transition-all"
              title="Time Freeze"
            >
              <Timer className="w-4 h-4" />
              <span className="text-xs">×{powerups.timeFreeze}</span>
            </button>
          )}
          {powerups.extraHint > 0 && (
            <button
              onClick={() => usePowerup('extraHint')}
              className="bg-purple-600 p-2 rounded-lg hover:bg-purple-700 transition-all"
              title="Extra Hint"
            >
              <Brain className="w-4 h-4" />
              <span className="text-xs">×{powerups.extraHint}</span>
            </button>
          )}
          {powerups.pointsBoost > 0 && (
            <button
              onClick={() => usePowerup('pointsBoost')}
              className="bg-green-600 p-2 rounded-lg hover:bg-green-700 transition-all"
              title="Points Boost"
            >
              <Target className="w-4 h-4" />
              <span className="text-xs">×{powerups.pointsBoost}</span>
            </button>
          )}
        </div>
      </div>

      <div className={`mb-8 transition-all duration-300 ${animation === 'correct' ? 'scale-105' : animation === 'wrong' ? 'shake' : ''}`}>
        <div className="flex justify-between items-center mb-4">
          <span className={`px-2 py-1 rounded text-xs ${
            question.difficulty === 'easy' ? 'bg-green-600' :
            question.difficulty === 'medium' ? 'bg-yellow-600' :
            'bg-red-600'
          }`}>
            {question.difficulty.toUpperCase()}
          </span>
          <span className="text-yellow-500 text-sm">{question.points} pts</span>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg text-white">
          {question.text.split('___').map((part, index) => (
            <React.Fragment key={index}>
              {part}
              {index < question.blanks.length && (
                <input
                  type="text"
                  value={userAnswers[index] || ''}
                  onChange={(e) => handleAnswer(index, e.target.value)}
                  className="mx-2 bg-gray-700 text-white px-3 py-1 rounded w-40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Type answer..."
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {!showHint && (
          <button
            onClick={() => {
              setShowHint(true);
              setHintsUsed(h => h + 1);
            }}
            className="mt-4 text-yellow-500 hover:text-yellow-400 text-sm flex items-center"
          >
            <Brain className="w-4 h-4 mr-1" />
            Need a hint? (-20% points)
          </button>
        )}
        {showHint && (
          <p className="mt-4 text-gray-400 text-sm italic flex items-center">
            <Brain className="w-4 h-4 mr-2 text-yellow-500" />
            {question.hint}
          </p>
        )}
      </div>

      <button
        onClick={checkAnswers}
        disabled={userAnswers.some(answer => !answer)}
        className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
          userAnswers.some(answer => !answer)
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 text-white transform hover:scale-105'
        }`}
      >
        Check Answer
      </button>

      <div className="mt-4 flex justify-between text-sm text-gray-400">
        <span>Question {currentQuestion + 1}/{questions.length}</span>
        <span>{question.category}</span>
      </div>

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