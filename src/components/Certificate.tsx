import React from 'react';
import { Award, Download, RotateCcw } from 'lucide-react';

interface CertificateProps {
  wpm: number;
  accuracy: number;
  timeSpent: number;
  participantName: string;
  setParticipantName: (name: string) => void;
  onReset?: () => void;
}

const Certificate: React.FC<CertificateProps> = ({
  wpm,
  accuracy,
  timeSpent,
  participantName,
  setParticipantName,
  onReset,
}) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const getPerformanceLevel = () => {
    if (wpm >= 60 && accuracy >= 95)
      return { level: 'Expert', color: 'text-purple-600', bgColor: 'bg-purple-100' };
    if (wpm >= 40 && accuracy >= 90)
      return { level: 'Advanced', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (wpm >= 25 && accuracy >= 85)
      return { level: 'Intermediate', color: 'text-green-600', bgColor: 'bg-green-100' };
    return { level: 'Beginner', color: 'text-orange-600', bgColor: 'bg-orange-100' };
  };

  const performance = getPerformanceLevel();

  const handleDownload = () => {
    window.print(); // Replace with html2canvas + jsPDF if needed
  };

  return (
    <div className="max-w-4xl mx-auto p-6 pt-24">
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium mb-4">
          <Award className="w-5 h-5" />
          <span>Test Completed Successfully!</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Typing Certificate</h1>
        <p className="text-white text-2xl">Congratulations on completing the typing test!</p>
      </div>

      {/* Certificate Content */}
      <div
  id="certificate"
  className="bg-white rounded-2xl shadow-2xl border-4 border-gradient-to-br from-blue-500 to-purple-500 p-12 mb-8 print:shadow-none print:border-2 print:border-gray-300 print:p-4"
>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Certificate of Achievement</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Participant Name */}
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 mb-6">This certifies that</p>

          {/* Input for name (hidden in print view) */}
          <div className="mb-6">
            <div className="print:hidden">
              <input
                type="text"
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                placeholder="Enter your name"
                className="text-center text-2xl font-bold text-gray-900 outline-none border-b border-gray-400 w-full max-w-md mx-auto"
              />
            </div>

            {/* Display name only in print view */}
            <div className="hidden print:block text-3xl font-bold text-center text-gray-900 border-b-2 border-dashed border-gray-300 pb-4">
              {participantName || 'Typing Test Participant'}
            </div>
          </div>

          <p className="text-lg text-gray-600 mb-8">
            has successfully completed a 1-minute typing test with exceptional performance.
          </p>
        </div>

        {/* Stats Section */}
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
            <div className="text-3xl font-bold text-purple-600 mb-2">{timeSpent}s</div>
            <div className="text-sm font-medium text-purple-800">Time Taken</div>
          </div>
        </div>

        {/* Performance Level */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center space-x-2 px-6 py-3 ${performance.bgColor} rounded-full`}>
            <Award className={`w-5 h-5 ${performance.color}`} />
            <span className={`font-bold ${performance.color}`}>Performance Level: {performance.level}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-200">
          <div>
            <div className="text-sm font-medium text-gray-600">Date Issued</div>
            <div className="text-lg font-semibold text-gray-900">{currentDate}</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-600">Certified by</div>
            <div className="text-lg font-semibold text-gray-900">CyberHeist</div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
        <button
          onClick={handleDownload}
          className="flex items-center justify-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Download className="w-5 h-5" />
          <span>Download Certificate</span>
        </button>

        {onReset && (
          <button
            onClick={onReset}
            className="flex items-center justify-center space-x-2 px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 font-medium"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Take Another Test</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Certificate;
