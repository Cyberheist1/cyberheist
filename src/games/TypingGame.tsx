import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, RefreshCw, Timer, Command, Trophy, Award, Download } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import Certificate from '../components/Certificate';

const hackingCommands = [
  { command: 'nmap -sS -sV -O target.com', description: 'Service and OS detection scan' },
  { command: 'sqlmap -u "http://target.com/page.php?id=1" --dbs', description: 'Database enumeration' },
  { command: 'hydra -l admin -P wordlist.txt ssh://target.com', description: 'SSH brute force' },
  { command: 'gobuster dir -u http://target.com -w wordlist.txt', description: 'Directory enumeration' },
  { command: 'wireshark -i eth0 -w capture.pcap', description: 'Network packet capture' },
  { command: 'hashcat -m 0 -a 0 hash.txt wordlist.txt', description: 'Hash cracking' },
  { command: 'msfconsole -q -x "use exploit/multi/handler"', description: 'Metasploit handler' },
  { command: 'john --wordlist=rockyou.txt hash.txt', description: 'Password cracking' },
  { command: 'tcpdump -i eth0 -n -w capture.pcap', description: 'Packet capture' },
  { command: 'dirb http://target.com -r -w', description: 'Web content scanning' },
  { command: 'nikto -h target.com -C all', description: 'Web server scanning' },
  { command: 'wpscan --url http://target.com --enumerate u', description: 'WordPress scanning' }
];

const timeOptions = [
  { value: 60, label: '1 Minute' },
  { value: 120, label: '2 Minutes' },
  { value: 300, label: '5 Minutes' },
  { value: 600, label: '10 Minutes' }
];

const trophies = {
  speed: [
    { wpm: 100, name: 'Speed Demon', icon: '🏃' },
    { wpm: 80, name: 'Swift Hacker', icon: '⚡' },
    { wpm: 60, name: 'Quick Fingers', icon: '🎯' }
  ],
  accuracy: [
    { accuracy: 98, name: 'Precision Master', icon: '🎯' },
    { accuracy: 95, name: 'Sharp Eye', icon: '👁️' },
    { accuracy: 90, name: 'Steady Hand', icon: '🤚' }
  ],
  endurance: [
    { time: 600, commands: 50, name: 'Marathon Hacker', icon: '🏆' },
    { time: 300, commands: 25, name: 'Persistent Coder', icon: '💪' },
    { time: 120, commands: 15, name: 'Quick Sprint', icon: '🏃' }
  ]
};

export function TypingGame() {
  const [targetCommand, setTargetCommand] = useState(hackingCommands[0]);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [wpm, setWpm] = useState(0);
  const [selectedTime, setSelectedTime] = useState(60);
  const [timeLeft, setTimeLeft] = useState(selectedTime);
  const [gameActive, setGameActive] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [completedCommands, setCompletedCommands] = useState(0);
  const [earnedTrophies, setEarnedTrophies] = useState<string[]>([]);
  const [gameEnded, setGameEnded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

   useEffect(() => {
    let timer: number;
    if (gameActive && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft(time => time - 1);
        calculateWPM();
      }, 1000);
    } else if (timeLeft === 0 && gameActive) {
      endGame();
    }
    return () => clearInterval(timer);
  }, [gameActive, timeLeft]);

  const calculateWPM = () => {
    const minutes = (selectedTime - timeLeft) / 60;
    if (minutes > 0) {
      const words = totalKeystrokes / 5;
      setWpm(Math.round(words / minutes));
    }
  };

 const startGame = () => {
    setScore(0);
    setTimeLeft(selectedTime);
    setGameActive(true);
    setGameEnded(false);
    setMistakes(0);
    setTotalKeystrokes(0);
    setAccuracy(100);
    setWpm(0);
    setInput('');
    setCompletedCommands(0);
    setEarnedTrophies([]);
    setTargetCommand(hackingCommands[Math.floor(Math.random() * hackingCommands.length)]);
    inputRef.current?.focus();
  };

  const checkTrophies = () => {
    const newTrophies: string[] = [];
    trophies.speed.forEach(trophy => {
      if (wpm >= trophy.wpm && !earnedTrophies.includes(trophy.name)) {
        newTrophies.push(`${trophy.icon} ${trophy.name}`);
      }
    });
    trophies.accuracy.forEach(trophy => {
      if (accuracy >= trophy.accuracy && !earnedTrophies.includes(trophy.name)) {
        newTrophies.push(`${trophy.icon} ${trophy.name}`);
      }
    });
    trophies.endurance.forEach(trophy => {
      if (selectedTime >= trophy.time && completedCommands >= trophy.commands && !earnedTrophies.includes(trophy.name)) {
        newTrophies.push(`${trophy.icon} ${trophy.name}`);
      }
    });
    if (newTrophies.length > 0) {
      setEarnedTrophies(prev => [...prev, ...newTrophies]);
    }
  };

  const getPerformanceLevel = () => {
  if (wpm >= 60 && accuracy >= 95) return { level: 'Expert', color: 'text-purple-600', bgColor: 'bg-purple-100' };
  if (wpm >= 40 && accuracy >= 90) return { level: 'Advanced', color: 'text-blue-600', bgColor: 'bg-blue-100' };
  if (wpm >= 25 && accuracy >= 85) return { level: 'Intermediate', color: 'text-green-600', bgColor: 'bg-green-100' };
  return { level: 'Beginner', color: 'text-orange-600', bgColor: 'bg-orange-100' };
};

    const endGame = async () => {
    setGameActive(false);
    setGameEnded(true);
    checkTrophies();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('profiles')
          .update({
            points: score,
            level: score > 800 ? 'advanced' : score > 400 ? 'intermediate' : 'beginner'
          })
          .eq('id', user.id);
      }
    } catch (error) {
      console.error('Error updating score:', error);
    }
  };


  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!gameActive) return;
    const newInput = e.target.value;
    setInput(newInput);
    setTotalKeystrokes(prev => prev + 1);

    if (newInput === targetCommand.command) {
      setScore(s => s + 100);
      setCompletedCommands(prev => prev + 1);
      setInput('');
      setTargetCommand(hackingCommands[Math.floor(Math.random() * hackingCommands.length)]);
    } else if (
      newInput.length > targetCommand.command.length ||
      !targetCommand.command.startsWith(newInput)
    ) {
      setMistakes(prev => prev + 1);
      setAccuracy(Math.max(0, Math.round((1 - mistakes / totalKeystrokes) * 100)));
    }
  };

  const progress = input.length > 0 ? Math.min((input.length / targetCommand.command.length) * 100, 100) : 0;
  const performance = getPerformanceLevel();

  return (
    <div className="max-w-4xl mx-auto bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800">
      {gameEnded ? (
        <div className="text-center">
  <h2 className="text-2xl font-bold text-white mb-4">Test Completed!</h2>

     {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">{wpm}</div>
            <div className="text-sm font-medium text-blue-800">Words Per Minute</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <div className="text-3xl font-bold text-green-600 mb-2">{accuracy}%</div>
            <div className="text-sm font-medium text-green-800">Accuracy</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 mb-2">{selectedTime}s</div>
            <div className="text-sm font-medium text-purple-800">Time Taken</div>
          </div>
        </div>

       {/* Performance Level */}
<div className="text-center mb-8">
  <div className={`inline-flex items-center space-x-2 px-6 py-3 ${performance.bgColor} rounded-full`}>
    <Award className={`w-5 h-5 ${performance.color}`} />
    <span className={`font-bold ${performance.color}`}>
      Performance Level: {performance.level}
    </span>
  </div>
</div>

  <Link
    to="/certificate"
    state={{ wpm, accuracy, timeSpent: selectedTime }}
    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform"
  >
    Get Certificate
  </Link>
</div>

      ) : !gameActive && timeLeft === selectedTime ? (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Hacker Command Typing Challenge</h2>
          <p className="text-gray-400 mb-6">
            Master the art of typing security commands quickly and accurately.
            Choose your challenge duration!
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {timeOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setSelectedTime(option.value)}
                className={`p-4 rounded-lg transition-colors ${
                  selectedTime === option.value
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <button
            onClick={startGame}
            className="bg-red-600 text-white py-3 px-8 rounded-lg hover:bg-red-700 transition-colors"
          >
            Start Challenge
          </button>
        </div>
      ) : (
        <>
          {/* Add stats, progress bar, and typing logic UI here as you had earlier */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-black/30 p-4 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">WPM</div>
              <div className="text-2xl font-bold text-green-500">{wpm}</div>
            </div>
            <div className="bg-black/30 p-4 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Accuracy</div>
              <div className="text-2xl font-bold text-blue-500">{accuracy}%</div>
            </div>
            <div className="bg-black/30 p-4 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Progress</div>
              <div className="text-2xl font-bold text-purple-500">{Math.round(progress)}%</div>
            </div>
            <div className="bg-black/30 p-4 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Time</div>
              <div className="text-2xl font-bold text-yellow-500">{timeLeft}s</div>
            </div>
          </div>

          <div className="bg-black/30 rounded-lg p-4 mb-6">
            <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-400 text-center">
              Command Progress: {input.length}/{targetCommand.command.length} characters
            </div>
          </div>

          <div className="mb-6">
            <div className="text-gray-400 mb-2">Type this command:</div>
            <div className="bg-black p-4 rounded-lg font-mono text-green-500 mb-2">
              {targetCommand.command}
            </div>
            <div className="text-sm text-gray-500">
              Purpose: {targetCommand.description}
            </div>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInput}
            className="w-full bg-black border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-500 font-mono focus:border-red-500 focus:ring-red-500"
            placeholder="Type the command here..."
            disabled={!gameActive}
          />
        </>
      )}
    </div>
  );
}