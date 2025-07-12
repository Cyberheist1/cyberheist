import React, { useState, useEffect, useCallback } from 'react';
import { Timer, Trophy, Zap, Star, RefreshCw, Target, Rocket, Crown, Medal, Gift } from 'lucide-react';

interface Problem {
  question: string;
  answer: number;
  options: number[];
}

interface Car {
  id: string;
  name: string;
  position: number;
  color: string;
  isPlayer: boolean;
}

export default function MathRace() {
  const [cars, setCars] = useState<Car[]>([
    { id: 'player', name: 'You', position: 0, color: 'bg-blue-600', isPlayer: true },
    { id: 'ai1', name: 'SpeedBot', position: 0, color: 'bg-red-600', isPlayer: false },
    { id: 'ai2', name: 'MathMaster', position: 0, color: 'bg-green-600', isPlayer: false },
    { id: 'ai3', name: 'QuickCalc', position: 0, color: 'bg-purple-600', isPlayer: false }
  ]);
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameStatus, setGameStatus] = useState<'setup' | 'racing' | 'finished'>('setup');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [raceLength, setRaceLength] = useState(100);
  const [streak, setStreak] = useState(0);
  const [totalProblems, setTotalProblems] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const difficultySettings = {
    easy: { range: 12, operators: ['+', '-'], timeLimit: 15 },
    medium: { range: 25, operators: ['+', '-', '*'], timeLimit: 12 },
    hard: { range: 50, operators: ['+', '-', '*', '/'], timeLimit: 10 }
  };

  const generateProblem = useCallback(() => {
    const settings = difficultySettings[difficulty];
    const operator = settings.operators[Math.floor(Math.random() * settings.operators.length)];
    let num1 = Math.floor(Math.random() * settings.range) + 1;
    let num2 = Math.floor(Math.random() * settings.range) + 1;
    
    // Ensure division results in whole numbers
    if (operator === '/') {
      num2 = Math.floor(Math.random() * 10) + 1;
      num1 = num2 * (Math.floor(Math.random() * 10) + 1);
    }
    
    // Ensure subtraction doesn't result in negative numbers
    if (operator === '-' && num1 < num2) {
      [num1, num2] = [num2, num1];
    }

    let answer;
    switch (operator) {
      case '+': answer = num1 + num2; break;
      case '-': answer = num1 - num2; break;
      case '*': answer = num1 * num2; break;
      case '/': answer = num1 / num2; break;
      default: answer = 0;
    }

    const question = `${num1} ${operator} ${num2}`;
    
    // Generate wrong options
    const wrongOptions = [];
    for (let i = 0; i < 3; i++) {
      let wrongAnswer;
      do {
        wrongAnswer = answer + Math.floor(Math.random() * 20) - 10;
      } while (wrongAnswer === answer || wrongAnswer < 0 || wrongOptions.includes(wrongAnswer));
      wrongOptions.push(wrongAnswer);
    }

    const options = [answer, ...wrongOptions].sort(() => Math.random() - 0.5);

    setCurrentProblem({ question, answer, options });
    setTimeLeft(settings.timeLimit);
    setSelectedAnswer(null);
  }, [difficulty]);

  useEffect(() => {
    if (gameStatus === 'racing' && timeLeft > 0 && selectedAnswer === null) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && selectedAnswer === null) {
      handleTimeout();
    }
  }, [gameStatus, timeLeft, selectedAnswer]);

  const startRace = () => {
    setCars(cars.map(car => ({ ...car, position: 0 })));
    setGameStatus('racing');
    setStreak(0);
    setTotalProblems(0);
    setCorrectAnswers(0);
    generateProblem();
  };

  const handleTimeout = () => {
    setStreak(0);
    setTotalProblems(t => t + 1);
    simulateAIMovement();
    
    setTimeout(() => {
      if (cars.some(car => car.position >= raceLength)) {
        setGameStatus('finished');
      } else {
        generateProblem();
      }
    }, 1500);
  };

  const handleAnswer = (answer: number) => {
    setSelectedAnswer(answer);
    setTotalProblems(t => t + 1);
    
    const isCorrect = answer === currentProblem?.answer;
    if (isCorrect) {
      setCorrectAnswers(c => c + 1);
      setStreak(s => s + 1);
      
      // Move player car forward
      const moveDistance = 8 + Math.min(streak * 2, 10); // Bonus for streak
      setCars(cars => cars.map(car => 
        car.isPlayer 
          ? { ...car, position: Math.min(car.position + moveDistance, raceLength) }
          : car
      ));
    } else {
      setStreak(0);
    }

    simulateAIMovement();
    
    setTimeout(() => {
      if (cars.some(car => car.position >= raceLength)) {
        setGameStatus('finished');
      } else {
        generateProblem();
      }
    }, 1500);
  };

  const simulateAIMovement = () => {
    setCars(cars => cars.map(car => {
      if (!car.isPlayer) {
        const moveChance = Math.random();
        const moveDistance = moveChance > 0.3 ? Math.floor(Math.random() * 8) + 3 : 0;
        return { ...car, position: Math.min(car.position + moveDistance, raceLength) };
      }
      return car;
    }));
  };

  const resetGame = () => {
    setGameStatus('setup');
    setCars(cars.map(car => ({ ...car, position: 0 })));
    setCurrentProblem(null);
    setSelectedAnswer(null);
    setStreak(0);
    setTotalProblems(0);
    setCorrectAnswers(0);
  };

  if (gameStatus === 'setup') {
    return (
      <div className="bg-gray-900 p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center">
          <Rocket className="w-8 h-8 mr-3 text-yellow-500" />
          Math Race Challenge
        </h2>
        
        <div className="mb-8">
          <h3 className="text-white font-semibold mb-4">Select Difficulty</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(['easy', 'medium', 'hard'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`p-4 rounded-lg transition-all duration-300 ${
                  difficulty === level
                    ? 'bg-blue-600 text-white transform scale-105'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <div className="text-center">
                  <h4 className="font-bold capitalize">{level}</h4>
                  <p className="text-sm mt-1">
                    {difficultySettings[level].operators.join(', ')} • {difficultySettings[level].timeLimit}s
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={startRace}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg flex items-center justify-center"
        >
          <Zap className="w-6 h-6 mr-2" />
          Start Race!
        </button>
      </div>
    );
  }

  if (gameStatus === 'finished') {
    const winner = cars.reduce((prev, current) => 
      current.position > prev.position ? current : prev
    );
    const playerPosition = cars
      .sort((a, b) => b.position - a.position)
      .findIndex(car => car.isPlayer) + 1;

    return (
      <div className="bg-gray-900 p-8 rounded-lg shadow-xl text-center">
        <div className="mb-8">
          {playerPosition === 1 ? (
            <>
              <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">🏆 Victory! 🏆</h2>
              <p className="text-green-400 text-xl">You won the race!</p>
            </>
          ) : (
            <>
              <Medal className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">Race Complete!</h2>
              <p className="text-gray-400 text-xl">You finished in {playerPosition}{playerPosition === 2 ? 'nd' : playerPosition === 3 ? 'rd' : 'th'} place</p>
            </>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 p-4 rounded-lg">
            <Target className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className="text-white font-bold">{correctAnswers}</p>
            <p className="text-gray-400 text-sm">Correct</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <Trophy className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="text-white font-bold">{totalProblems}</p>
            <p className="text-gray-400 text-sm">Total</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <p className="text-white font-bold">{Math.round((correctAnswers / totalProblems) * 100)}%</p>
            <p className="text-gray-400 text-sm">Accuracy</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <Zap className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <p className="text-white font-bold">{streak}</p>
            <p className="text-gray-400 text-sm">Best Streak</p>
          </div>
        </div>

        <button
          onClick={resetGame}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg flex items-center mx-auto"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Race Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-xl">
      {/* Race Track */}
      <div className="mb-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-bold">Race Progress</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Timer className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="text-white font-bold">{timeLeft}s</span>
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="text-white font-bold">×{streak}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            {cars.map((car) => (
              <div key={car.id} className="relative">
                <div className="flex items-center mb-1">
                  <span className="text-white text-sm w-20">{car.name}</span>
                  <div className="flex-1 bg-gray-700 h-8 rounded-lg relative overflow-hidden">
                    <div
                      className={`${car.color} h-full rounded-lg transition-all duration-1000 flex items-center justify-end pr-2`}
                      style={{ width: `${(car.position / raceLength) * 100}%` }}
                    >
                      <div className="text-white text-xs">🏎️</div>
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm w-12 text-right">
                    {Math.round((car.position / raceLength) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Math Problem */}
      {currentProblem && (
        <div className="mb-6">
          <div className="bg-gray-800 p-6 rounded-lg mb-4">
            <h3 className="text-2xl font-bold text-white text-center mb-6">
              {currentProblem.question} = ?
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {currentProblem.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectedAnswer === null && handleAnswer(option)}
                  disabled={selectedAnswer !== null}
                  className={`p-4 rounded-lg text-xl font-bold transition-all duration-300 ${
                    selectedAnswer === null
                      ? 'bg-gray-700 hover:bg-gray-600 text-white transform hover:scale-105'
                      : option === currentProblem.answer
                      ? 'bg-green-600 text-white'
                      : option === selectedAnswer
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="text-center text-gray-400 text-sm">
        Solve problems correctly to move your car forward! Streak bonuses give extra speed!
      </div>
    </div>
  );
}