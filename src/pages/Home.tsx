import React, { useState, useEffect, useRef } from 'react';
import {
  Skull, Zap, Users, Target, Play, MessageCircle, Send,
  X, Minimize2, Maximize2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [username, setUsername] = useState('');
  const [tempUsername, setTempUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();


  const connectToChat = () => {
    if (tempUsername.trim()) {
      setUsername(tempUsername);
      setIsConnected(true);
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'system',
        message: `${tempUsername} has joined the secure channel`,
        timestamp: new Date().toLocaleTimeString()
      }]);
      setOnlineUsers(['ghost_admin', 'cipher_007', tempUsername]);
    }
  };

  const disconnectFromChat = () => {
    setIsConnected(false);
    setUsername('');
    setTempUsername('');
    setMessages([]);
    setOnlineUsers([]);
  };

  const sendMessage = () => {
    if (currentMessage.trim() && isConnected) {
      const newMessage = {
        id: Date.now(),
        type: 'user',
        username,
        message: currentMessage,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, newMessage]);
      setCurrentMessage('');

      setTimeout(() => {
        const responses = [
          "Roger that, agent.",
          "Mission parameters received.",
          "Standing by for further instructions.",
          "Encryption protocol confirmed.",
          "Channel secured."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          type: 'user',
          username: 'cipher_007',
          message: randomResponse,
          timestamp: new Date().toLocaleTimeString()
        }]);
      }, 1000 + Math.random() * 3000);
    }
  };

  const handleChatKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isConnected) {
        sendMessage();
      } else {
        connectToChat();
      }
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 text-white px-6 py-12 pt-20">
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
              Welcome to the underground network. Your mission: infiltrate secure systems,
              decode encrypted messages, and complete high-stakes digital operations without detection.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="ml-14 mb-12 relative">
          <div className="flex flex-col gap-4 max-w-sm">
            <button
      onClick={() => navigate('/signup')}
      className="bg-red-700 hover:bg-red-800 text-white px-5 py-4 rounded-lg text-xl font-bold transition-all duration-300 shadow-lg hover:shadow-red-500/30 transform hover:scale-105"
    >
      Activate Protocol
    </button>
    <button
      onClick={() => navigate('/games')}
      className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-4 rounded-lg text-xl font-bold transition-all duration-300 shadow-lg hover:shadow-gray-500/30 transform hover:scale-105"
    >
      Launch Missions
    </button>
          </div>

          {/* Featured Game */}
          <div className="absolute -top-28 right-0 w-80 bg-gray-800/30 border border-red-500/30 rounded-lg p-6 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-red-500/20">
            <div className="flex items-center mb-3">
              <Play className="text-red-400 mr-2" size={24} />
              <h3 className="text-red-400 font-bold text-lg">FEATURED MISSION</h3>
            </div>
            <h4 className="text-white font-bold text-xl mb-3">CyberHeist Battleship Strike</h4>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              Engage in tactical warfare. Command your fleet, strategically position vessels,
              and sink enemy ships in this classic battle combat simulation.
            </p>
            <button
              onClick={() => window.open('https://cybeheist-battleship.netlify.app/', '_blank')}
              className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-red-500/30 transform hover:scale-105 flex items-center justify-center"
            >
              <Play className="mr-2" size={20} />
              Deploy Mission
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {[
            { icon: <Users size={40} />, label: 'Ghost Agents', value: '342' },
            { icon: <Target size={40} />, label: 'Targets Breached', value: '1.8K' },
            { icon: <Zap size={40} />, label: 'Success Rate', value: '97%' },
            { icon: <Skull size={40} />, label: 'Detection Rate', value: '∅' },
          ].map(({ icon, label, value }, i) => (
            <div key={i} className="text-center">
              <div className="flex justify-center mb-3 text-red-400">{icon}</div>
              <div className="text-red-400 text-3xl font-bold">{value}</div>
              <div className="text-gray-400 text-sm">{label}</div>
            </div>
          ))}
        </div>

        {/* Warning */}
        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 mb-16">
          <div className="flex items-center mb-3">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-xs">!</span>
            </div>
            <h3 className="text-red-400 font-bold text-lg">SECURITY ALERT</h3>
          </div>
          <p className="text-gray-300 text-sm">
            All operations are conducted in simulated environments. Unauthorized access
            to real systems is prohibited and may result in legal consequences.
          </p>
        </div>
      </div>

      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 bg-red-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Box */}
      {isChatOpen && (
        <div className={`fixed bottom-20 right-6 w-96 bg-black border-2 border-green-500 rounded-lg shadow-2xl transition-all duration-300 z-40 ${isMinimized ? 'h-12' : 'h-96'}`}>
          {/* Header */}
          <div className="bg-green-600 text-black p-3 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2" />
              <div className="w-3 h-3 bg-green-500 rounded-full mr-4" />
              <span className="font-mono text-sm">~/CyberHeist/secure_chat</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setIsMinimized(!isMinimized)} className="hover:bg-green-700 p-1 rounded">
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button onClick={() => setIsChatOpen(false)} className="hover:bg-green-700 p-1 rounded">
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Content */}
          {!isMinimized && (
            <div className="p-4 h-full flex flex-col">
              <div className="text-center mb-4">
                <h2 className="text-green-400 font-mono text-xl font-bold">CyberHeist</h2>
                <p className="text-green-400 font-mono text-sm">&gt; secure_chat_protocol v1.0</p>
              </div>

              {!isConnected ? (
                <div className="bg-gray-900 p-4 rounded border border-green-500/30 mb-4">
                  <p className="text-green-400 font-mono text-sm mb-3">&gt; Enter username to establish connection...</p>
                  <div className="mb-3">
                    <span className="text-green-400 font-mono">&gt; </span>
                    <input
                      type="text"
                      value={tempUsername}
                      onChange={(e) => setTempUsername(e.target.value)}
                      onKeyDown={handleChatKeyPress}
                      placeholder="username"
                      className="bg-transparent text-white font-mono outline-none border-none placeholder-gray-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={connectToChat}
                      className="bg-green-600 hover:bg-green-700 text-black px-4 py-2 rounded font-mono text-sm transition-colors"
                    >
                      Connect
                    </button>
                    <button
                      onClick={() => setTempUsername('')}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-mono text-sm transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-2">
                    <p className="text-green-400 font-mono text-xs">Online: {onlineUsers.join(', ')}</p>
                  </div>
                  <div className="flex-1 overflow-y-auto bg-gray-900 p-3 rounded border border-green-500/30 mb-3 font-mono text-sm">
                    {messages.map((msg) => (
                      <div key={msg.id} className="mb-2">
                        {msg.type === 'system' ? (
                          <p className="text-yellow-400 text-xs">[{msg.timestamp}] {msg.message}</p>
                        ) : (
                          <p className="text-white">
                            <span className="text-green-400">[{msg.timestamp}]</span>{' '}
                            <span className="text-red-400">{msg.username}:</span>{' '}
                            {msg.message}
                          </p>
                        )}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyDown={handleChatKeyPress}
                      placeholder="Type message..."
                      className="flex-1 bg-gray-900 text-white p-2 rounded border border-green-500/30 font-mono text-sm outline-none focus:border-green-500"
                    />
                    <button
                      onClick={sendMessage}
                      className="bg-green-600 hover:bg-green-700 text-black p-2 rounded transition-colors"
                    >
                      <Send size={16} />
                    </button>
                  </div>

                  <button
                    onClick={disconnectFromChat}
                    className="mt-2 text-red-400 hover:text-red-300 font-mono text-xs underline"
                  >
                    Disconnect
                  </button>
                </>
              )}

              <div className="mt-4 text-center">
                <p className="text-gray-500 font-mono text-xs">[ This connection is not monitored by E Corp ]</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;