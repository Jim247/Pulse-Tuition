import React from 'react';

const ThankYouMessage = ({ onReset, message }) => {
  return (
    <div className="text-center p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-600 mb-4">{message}</h2>
      <p className="mb-6 text-gray-600">Your form has been submitted successfully.</p>
      <button onClick={onReset} className="bg-sky-900 hover:bg-sky-700 text-white px-6 py-2 rounded-md">
        Start Again
      </button>
    </div>
  );
};

export default ThankYouMessage;
