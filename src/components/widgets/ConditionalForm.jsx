import React, { useState } from 'react';

const ConditionalForm = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    console.log('Current step:', step);
    setStep(step + 1);
    console.log('Advanced to step:', step + 1);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-center">Contact Us</h2>

      {step === 1 && (
        <>
          <p>Step 1 Content</p>
          <button
            type="button"
            onClick={handleNextStep}
            className="w-full py-2 rounded-md bg-blue-800 text-white"
          >
            Next
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <p>Step 2 Content</p>
          <button
            type="button"
            onClick={handleNextStep}
            className="w-full py-2 rounded-md bg-blue-800 text-white"
          >
            Next
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <p>Step 3 Content</p>
          <button
            type="button"
            onClick={() => alert('Form completed!')}
            className="w-full py-2 rounded-md bg-blue-800 text-white"
          >
            Finish
          </button>
        </>
      )}
    </div>
  );
};

export default ConditionalForm;