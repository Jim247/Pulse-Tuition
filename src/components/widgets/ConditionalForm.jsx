import React, { useState } from 'react';

const ConditionalForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    instrument: '',
    location: '',
    tutor: '',
    details: '', // Added field for details
  });

  // Tutors data
  const tutors = [
    {
      name: 'Tutor A',
      instruments: ['Guitar', 'Singing'],
      locations: ['Location 1'],
      calendly: 'https://bbc.co.uk',
    },
    {
      name: 'Tutor B',
      instruments: ['Piano'],
      locations: ['Location 2', 'Mobile'],
      calendly: 'https://calendly.com/tutor-b',
    },
    {
      name: 'Tutor C',
      instruments: ['Guitar'],
      locations: ['Location 1', 'Location 2'],
      calendly: 'https://calendly.com/tutor-c',
    },
  ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate UK phone number
  const isValidUKPhoneNumber = (phone) => {
    const regex = /^(\+44\s?7\d{3}|\(?07\d{3}\)?|\+447\d{3})\s?\d{3}\s?\d{3}$/;
    return regex.test(phone);
  };

  // Step navigation
  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.instrument) {
        alert('Please select an instrument.');
        return;
      }
    }
    if (step === 2) {
      if (!formData.location) {
        alert('Please select a location.');
        return;
      }
    }
    if (step === 3 && !formData.details) {
      alert('Please provide more details about the student.');
      return;
    }
    if (step === 4) {
      if (!formData.name || !formData.email || !formData.phone) {
        alert('Please fill out all fields.');
        return;
      }
      if (!isValidUKPhoneNumber(formData.phone)) {
        alert('Please enter a valid UK phone number.');
        return;
      }
    }
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  // Filter tutors based on selections
  const availableTutors = tutors.filter(
    (tutor) =>
      tutor.instruments.includes(formData.instrument) &&
      tutor.locations.includes(formData.location)
  );

  const handleTutorSelect = (tutor) => {
    setFormData((prev) => ({ ...prev, tutor: tutor.name }));
    window.location.href = tutor.calendly; // Redirect to Calendly
  };

  const handleRestart = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      instrument: '',
      location: '',
      tutor: '',
      details: '', // Reset additional details
    });
    setStep(1); // Restart from the first step
  };

  return (
    <form className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-center">Contact Us</h2>

      {step === 1 && (
        <>
          <p className="text-center font-bold">Please select an Instrument</p>
          <div>
            {['Guitar', 'Singing', 'Piano'].map((instrument) => (
              <button
                key={instrument}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, instrument }))}
                className={`w-full py-2 rounded-md ${
                  formData.instrument === instrument
                    ? 'bg-blue-600'
                    : 'bg-blue-800'
                } text-white mb-2 hover:bg-blue-700`}
              >
                {instrument}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={handleNextStep}
            className="w-full py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Next
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <p className="text-center font-bold">Please select a Location</p>
          <div>
            {['Location 1', 'Mobile'].map((location) => (
              <button
                key={location}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, location }))}
                className={`w-full py-2 rounded-md ${
                  formData.location === location
                    ? 'bg-blue-600'
                    : 'bg-blue-800'
                } text-white mb-2 hover:bg-blue-700`}
              >
                {location}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={handleNextStep}
            className="w-full py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Next
          </button>
          <button
            type="button"
            onClick={handlePreviousStep}
            className="w-full py-2 rounded-md bg-gray-400 text-white mt-2 hover:bg-gray-500"
          >
            Back
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <div>
            <label htmlFor="details" className="block text-sm font-medium mb-1">
              Please tell us more about yourself or the student (level, genres, interests, goals)
            </label>
            <textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              rows="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="button"
            onClick={handleNextStep}
            className="w-full py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Next
          </button>
          <button
            type="button"
            onClick={handlePreviousStep}
            className="w-full py-2 rounded-md bg-gray-400 text-white mt-2 hover:bg-gray-500"
          >
            Back
          </button>
        </>
      )}

      {step === 4 && (
        <>
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+44 7123 456789"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="button"
            onClick={handleNextStep}
            className="w-full py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Next
          </button>
          <button
            type="button"
            onClick={handlePreviousStep}
            className="w-full py-2 rounded-md bg-gray-400 text-white mt-2 hover:bg-gray-500"
          >
            Back
          </button>
        </>
      )}

      {step === 5 && availableTutors.length > 0 && (
        <>
          <p className="text-center font-bold">
            Thank you! The following tutors match your requirements. Please book via their calendar.
          </p>
          {availableTutors.map((tutor) => (
            <button
              key={tutor.name}
              type="button"
              onClick={() => handleTutorSelect(tutor)}
              className="w-full py-2 rounded-md bg-blue-800 text-white mb-2 hover:bg-blue-700"
            >
              {tutor.name} ({tutor.instruments.join(', ')})
            </button>
          ))}
        </>
      )}

      {step === 5 && availableTutors.length === 0 && (
        <>
          <p className="text-center text-red-500">No tutors available for your selection.</p>
          <button
            type="button"
            onClick={handleRestart}
            className="w-full py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Return to Start
          </button>
        </>
      )}
    </form>
  );
};

export default ConditionalForm;
