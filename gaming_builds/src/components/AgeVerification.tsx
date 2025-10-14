import React, { useState } from 'react';

interface AgeVerificationProps {
  onVerified: () => void;
}

const AgeVerification: React.FC<AgeVerificationProps> = ({ onVerified }) => {
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState('');

  const handleVerification = () => {
    if (!birthDate) {
      setError('Please enter your birth date');
      return;
    }

    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    if (age < 18) {
      setError('You must be 18 or older to access this platform');
      return;
    }

    // Store verification in localStorage
    localStorage.setItem('age_verified', 'true');
    localStorage.setItem('age_verified_date', new Date().toISOString());
    onVerified();
  };

  const handleReject = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-8 max-w-md mx-4 text-center border-4 border-hot-pink shadow-2xl shadow-hot-pink/50">
        <div className="text-6xl mb-6 animate-pulse">🔞</div>
        
        <h2 className="text-3xl font-bold text-hot-pink mb-4 animate-pulse">Age Verification Required</h2>
        
        <p className="text-gray-300 mb-6 text-lg">
          This platform contains content intended for adults only. 
          You must be 18 years or older to proceed.
        </p>

        <div className="mb-6">
          <label className="block text-left text-hot-pink mb-2 font-bold">
            Enter your birth date:
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full p-3 rounded bg-gray-800 text-white border-2 border-hot-pink focus:border-fluorescent-pink focus:outline-none focus:shadow-lg focus:shadow-hot-pink/50"
            max={new Date().toISOString().split('T')[0]}
            placeholder="Select your birth date"
            title="Enter your birth date to verify you are 18 or older"
          />
        </div>

        {error && (
          <div className="bg-hot-pink/20 border-2 border-hot-pink rounded p-3 mb-4 animate-pulse">
            <p className="text-hot-pink font-bold">{error}</p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={handleVerification}
            className="flex-1 bg-hot-pink hover:bg-fluorescent-pink text-black font-bold py-3 px-6 rounded transition-all duration-300 transform hover:scale-105 shadow-lg shadow-hot-pink/50"
          >
            I am 18 or older
          </button>
          
          <button
            onClick={handleReject}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded transition-all duration-300 border-2 border-hot-pink"
          >
            I am under 18
          </button>
        </div>

        <p className="text-xs text-hot-pink mt-4 font-semibold animate-pulse">
          By proceeding, you confirm that you are of legal age and consent to viewing adult content.
        </p>
      </div>
    </div>
  );
};

export default AgeVerification;