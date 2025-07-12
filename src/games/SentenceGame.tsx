import React, { useState } from 'react';
import { CheckCircle, XCircle, RefreshCw, Star } from 'lucide-react';

interface Sentence {
  id: number;
  incorrect: string;
  correct: string;
  explanation: string;
}

const sentences: Sentence[] = [
  {
    id: 1,
    incorrect: "The group of student are studying for their exam.",
    correct: "The group of students is studying for their exam.",
    explanation: "When using 'group of', the verb agrees with 'group' (singular), not 'students'."
  },
  {
    id: 2,
    incorrect: "Neither of the options are correct.",
    correct: "Neither of the options is correct.",
    explanation: "'Neither' is singular and takes a singular verb."
  },
  {
    id: 3,
    incorrect: "She is one of the student who have passed the exam.",
    correct: "She is one of the students who have passed the exam.",
    explanation: "'One of the' should be followed by a plural noun."
  },
  {
    id: 4,
    incorrect: "Every boy and girl have to complete their homework.",
    correct: "Every boy and girl has to complete their homework.",
    explanation: "When 'every' is used with compound subjects, the verb is singular."
  }
];

export default function SentenceGame() {
  const [currentSentence, setCurrentSentence] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'correct' | 'incorrect' | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const handleAnswer = (answer: 'correct' | 'incorrect') => {
    setSelectedAnswer(answer);
    const isCorrect = answer === 'incorrect';
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
    setShowExplanation(true);
  };

  const nextSentence = () => {
    if (currentSentence < sentences.length - 1) {
      setCurrentSentence(currentSentence + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      resetGame();
    }
  };

  const resetGame = () => {
    setCurrentSentence(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setStreak(0);
  };

  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
          <span className="text-white font-bold">Score: {score}</span>
        </div>
        <div className="flex items-center">
          <Star className="w-5 h-5 text-yellow-500 mr-2" />
          <span className="text-white font-bold">Streak: {streak}</span>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">Is this sentence correct?</h3>
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-white text-lg">
            {sentences[currentSentence].incorrect}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => !selectedAnswer && handleAnswer('correct')}
          disabled={selectedAnswer !== null}
          className={`p-4 rounded-lg flex items-center justify-center font-bold ${
            selectedAnswer === 'correct'
              ? 'bg-red-600 text-white'
              : 'bg-gray-800 hover:bg-gray-700 text-white'
          }`}
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          Correct
        </button>
        <button
          onClick={() => !selectedAnswer && handleAnswer('incorrect')}
          disabled={selectedAnswer !== null}
          className={`p-4 rounded-lg flex items-center justify-center font-bold ${
            selectedAnswer === 'incorrect'
              ? 'bg-green-600 text-white'
              : 'bg-gray-800 hover:bg-gray-700 text-white'
          }`}
        >
          <XCircle className="w-5 h-5 mr-2" />
          Incorrect
        </button>
      </div>

      {showExplanation && (
        <div className="mb-6">
          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <h4 className="text-white font-bold mb-2">Correct Sentence:</h4>
            <p className="text-green-400">
              {sentences[currentSentence].correct}
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-white font-bold mb-2">Explanation:</h4>
            <p className="text-gray-400">
              {sentences[currentSentence].explanation}
            </p>
          </div>
        </div>
      )}

      {showExplanation && (
        <button
          onClick={nextSentence}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg flex items-center justify-center"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          {currentSentence === sentences.length - 1 ? 'Play Again' : 'Next Sentence'}
        </button>
      )}

      <div className="mt-4 text-center text-gray-400">
        Question {currentSentence + 1} of {sentences.length}
      </div>
    </div>
  );
}