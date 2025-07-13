import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Lock, Key } from 'lucide-react';

const RetroAuthGate = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [accessGranted, setAccessGranted] = useState(false);
  const [bootSequence, setBootSequence] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const SECRET_KEY = 'CYBERHEIST';

  const bootLines = [
    'INITIALIZING SECURE TERMINAL...',
    'LOADING ENCRYPTION PROTOCOLS...',
    'ESTABLISHING CONNECTION TO MAINFRAME...',
    'SCANNING FOR UNAUTHORIZED ACCESS...',
    'SYSTEM STATUS: OPERATIONAL',
    '',
    '╔════════════════════════════════════════════════════════════════╗',
    '║                    CYBERHEIST SECURITY GATE                   ║',
    '║                      ACCESS RESTRICTED                        ║',
    '╚════════════════════════════════════════════════════════════════╝',
    '',
    'ENTER AUTHORIZATION KEY TO PROCEED:',
    ''
  ];

  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor((prev) => !prev), 500);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      const timer = setInterval(() => {
        setCurrentLine((prev) => {
          if (prev < bootLines.length - 1) return prev + 1;
          clearInterval(timer);
          setTimeout(() => inputRef.current?.focus(), 500);
          return prev;
        });
      }, 200);
      return () => clearInterval(timer);
    }
  }, [isAuthenticated]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (inputValue.toUpperCase() === SECRET_KEY) {
        setAccessGranted(true);
        const grantedSequence = [
          'ACCESS GRANTED...',
          'DECRYPTING SECURE FILES...',
          'LOADING CYBERHEIST INTERFACE...',
          'WELCOME, AGENT.'
        ];
        setBootSequence(grantedSequence);
        let i = 0;
        const timer = setInterval(() => {
          if (i < grantedSequence.length) {
            setCurrentLine(bootLines.length + i);
            i++;
          } else {
            clearInterval(timer);
            setTimeout(() => {
              setIsAuthenticated(true);
              navigate('/home'); // Navigate to home page
            }, 1000);
          }
        }, 300);
      } else {
        setBootSequence([
          'ACCESS DENIED - INVALID KEY',
          'SECURITY BREACH DETECTED',
          'SYSTEM LOCKDOWN INITIATED...',
          ''
        ]);
        setInputValue('');
        setTimeout(() => {
          setBootSequence([]);
          setCurrentLine(bootLines.length - 1);
        }, 2000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/5 to-transparent pointer-events-none animate-pulse" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 197, 94, 0.03) 2px, rgba(34, 197, 94, 0.03) 4px)',
          animation: 'scanlines 0.1s linear infinite'
        }}
      />
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-4xl bg-black border-2 border-green-400 rounded-lg shadow-2xl shadow-green-400/20">
          <div className="bg-green-400 text-black p-3 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2" />
              <div className="w-3 h-3 bg-green-500 rounded-full mr-4" />
              <Terminal size={16} className="mr-2" />
              <span className="text-sm font-bold">SECURE_TERMINAL_v2.1</span>
            </div>
            <div className="flex items-center">
              <Lock size={16} className="mr-2" />
              <span className="text-xs">ENCRYPTED</span>
            </div>
          </div>
          <div className="p-8 h-96 overflow-hidden">
            <div className="space-y-1 text-sm">
              {bootLines.slice(0, currentLine + 1).map((line, idx) => (
                <div key={idx} className="flex items-center">
                  {line && <span className="text-green-400 mr-2">$</span>}
                  <span className={line.includes('╔') || line.includes('║') || line.includes('╚') ? 'text-green-300' : 'text-green-400'}>
                    {line}
                  </span>
                </div>
              ))}
              {bootSequence.map((line, idx) => (
                <div key={`boot-${idx}`} className="flex items-center">
                  <span className="text-green-400 mr-2">$</span>
                  <span className={line.includes('GRANTED') ? 'text-green-300' : line.includes('DENIED') ? 'text-red-400' : 'text-yellow-400'}>
                    {line}
                  </span>
                </div>
              ))}
              {currentLine >= bootLines.length - 1 && !accessGranted && (
                <div className="flex items-center mt-4">
                  <span className="text-green-400 mr-2">$</span>
                  <Key size={16} className="text-green-400 mr-2" />
                  <span className="text-green-400 mr-2">ACCESS_KEY:</span>
                  <input
                    ref={inputRef}
                    type="password"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="bg-transparent text-green-400 outline-none border-none font-mono caret-green-400 flex-1"
                    placeholder="Enter authorization key..."
                  />
                  <span className={`text-green-400 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>█</span>
                </div>
              )}
            </div>
            {currentLine >= bootLines.length - 1 && !accessGranted && (
              <div className="absolute bottom-8 left-8 right-8">
                <div className="text-xs text-green-600 border-t border-green-600 pt-4 space-y-1">
                  <p>HINT: The key is "CYBERHEIST" (case insensitive)</p>
                  <p>Press ENTER to submit • ESC to exit</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes scanlines {
          0% { background-position: 0 0; }
          100% { background-position: 0 4px; }
        }
      `}</style>
    </div>
  );
};

export default RetroAuthGate;