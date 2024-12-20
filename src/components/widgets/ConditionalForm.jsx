import React, { useState } from 'react';
import { IconHome, IconCar } from '@tabler/icons-react';

const ConditionalForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    instrument: '',
    location: '',
    tutor: '',
    details: '',
    ageRange: '',
    ability: '',
  });

  const instruments = [
    { title: 'Acoustic Guitar', icon: '/src/assets/custom-icons/acoustic-guitar.png', iconClass: 'w-25 h-25' },
    { title: 'Piano/Keyboard', icon: '/src/assets/custom-icons/piano.png', iconClass: 'w-20 h-20' },
    { title: 'Electric Guitar', icon: '/src/assets/custom-icons/electric-guitar.png', iconClass: 'w-25 h-25' },
    { title: 'Singing', icon: '/src/assets/custom-icons/microphone.png', iconClass: 'w-20 h-20' },
    { title: 'Bass Guitar', icon: '/src/assets/custom-icons/bass-guitar.png', iconClass: 'w-25 h-25' },
  ];

  const tutors = [
    {
      name: 'Tutor A',
      instruments: ['Acoustic Guitar'],
      locations: ['Mobile'],
      calendly: 'https://calendly.com/tutor-a',
    },
    {
      name: 'Tutor B',
      instruments: ['Piano/Keyboard'],
      locations: ['Location 2', 'Mobile'],
      calendly: 'https://calendly.com/tutor-b',
    },
    {
      name: 'Tutor C',
      instruments: ['Electric Guitar'],
      locations: ['Mobile', 'Location 2'],
      calendly: 'https://calendly.com/tutor-c',
    },
    {
      name: 'Tutor D',
      instruments: ['Singing'],
      locations: ['Mobile'],
      calendly: 'https://calendly.com/tutor-d',
    },
    {
      name: 'Tutor E',
      instruments: ['Bass Guitar'],
      locations: ['Location 2'],
      calendly: 'https://calendly.com/tutor-e',
    },
  ];

  const instrumentLocations = tutors.reduce((acc, tutor) => {
    tutor.instruments.forEach((instrument) => {
      if (!acc[instrument]) {
        acc[instrument] = new Set();
      }
      tutor.locations.forEach((location) => {
        acc[instrument].add(location);
      });
    });
    return acc;
  }, {});

  Object.keys(instrumentLocations).forEach((instrument) => {
    instrumentLocations[instrument] = Array.from(instrumentLocations[instrument]);
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInstrumentSelect = (instrument) => {
    setFormData((prev) => ({ ...prev, instrument, location: '' }));
  };

  const handleNextStep = () => {
    if (step === 1 && !formData.instrument) {
      alert('Please select an instrument.');
      return;
    }
    if (step === 2 && !formData.location) {
      alert('Please select a location.');
      return;
    }
    if (
      step === 3 &&
      (!formData.ageRange || !formData.ability || !formData.details)
    ) {
      alert('Please provide age range, ability, and additional details.');
      return;
    }
    if (
      step === 4 &&
      (!formData.name || !formData.email || !formData.phone)
    ) {
      alert('Please fill out all fields.');
      return;
    }
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleRestart = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      instrument: '',
      location: '',
      tutor: '',
      details: '',
      ageRange: '',
      ability: '',
    });
    setStep(1);
  };

  // Find the tutor based on instrument and location
  const matchedTutor = tutors.find(
    (tutor) =>
      tutor.instruments.includes(formData.instrument) &&
      tutor.locations.includes(formData.location)
  );

  return (
    <form className="space-y-6 p-4 sm:p-6 rounded-lg shadow-md max-w-md sm:max-w-xl mx-auto bg-transparent">
      <h2 className="text-2xl font-bold text-center">Make a Booking</h2>

      {step === 1 && (
  <>
    <p className="text-center font-bold">Please select an Instrument</p>
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
      {instruments.map((instrument) => (
        <button
          key={instrument.title}
          type="button"
          onClick={() => handleInstrumentSelect(instrument.title)}
          className={`w-full flex flex-col items-center justify-center space-y-4 py-4 px-6 rounded-lg border-2 ${
            formData.instrument === instrument.title
              ? 'border-cyan-800 text-black bg-cyan-50'
              : 'border-cyan-800 text-gray-800 bg-white shadow-lg'
          } shadow-sm hover:bg-cyan-50 transition-all duration-200 ease-in-out`}
        >
          <img
            src={instrument.icon}
            alt={instrument.title}
            className={`w-20 h-20 max-w-full`} // Ensuring all icons are the same size
          />
          <p className="font-bold text-lg text-center">{instrument.title}</p>
        </button>
      ))}
    </div>
    <div className="flex justify-end gap-4 mt-4">
      <button
        type="button"
        onClick={handleNextStep}
        className="w-full py-2 rounded-md bg-cyan-700 text-white hover:bg-cyan-600"
      >
        Next
      </button>
    </div>
  </>
)}


      {step === 2 && (
        <>
          <p className="text-center font-bold">Please select a Location</p>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 justify-center">
            {instrumentLocations[formData.instrument]?.map((location) => (
              <button
                key={location}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, location }))}
                className={`w-full flex flex-col items-center justify-center space-y-4 py-4 px-6 rounded-lg border-2 ${
                  formData.location === location
                    ? 'border-cyan-800 text-black bg-cyan-50'
                    : 'border-cyan-800 text-gray-800 bg-white shadow-lg'
                } shadow-sm hover:bg-cyan-50 transition-all duration-200 ease-in-out`}
              >
                {location === 'Mobile' ? (
                  <IconCar className="w-20 h-20 text-cyan-800" style={{ strokeWidth: 0.5 }} />
                ) : (
                  <IconHome className="w-20 h-20 text-cyan-800" style={{ strokeWidth: 0.5 }} />
                )}
                <p className="font-bold text-lg text-center">{location}</p>
              </button>
            ))}
          </div>
          <div className="flex justify-between gap-4 mt-4">
            <button
              type="button"
              onClick={handlePreviousStep}
              className="w-full py-2 rounded-md bg-slate-300 text-black hover:bg-slate-200"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full py-2 rounded-md bg-cyan-700 text-white hover:bg-cyan-600"
            >
              Next
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <p className="text-center font-bold">Please provide details</p>

          <label className="block mt-2">
            Age Range:
            <select
              name="ageRange"
              value={formData.ageRange}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md mt-1"
            >
              <option value="">Select Age Range</option>
              <option value="7-11">7-11</option>
              <option value="12-18">12-18</option>
              <option value="18+">18+</option>
            </select>
          </label>

          <label className="block mt-2">
            Ability:
            <select
              name="ability"
              value={formData.ability}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md mt-1"
            >
              <option value="">Select Ability Level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="not sure">Not Sure</option>
            </select>
          </label>

          <label className="block mt-2">
            Please provide any additional details about you/the student:
            <textarea
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              placeholder="Goals, musical interests, any additional requirements..."
              rows="4"
              className="w-full p-2 border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-cyan-800"
            />
          </label>

          <div className="flex justify-between gap-4 mt-4">
            <button
              type="button"
              onClick={handlePreviousStep}
              className="w-full py-2 rounded-md bg-slate-300 text-black hover:bg-slate-200"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full py-2 rounded-md bg-cyan-700 text-white hover:bg-cyan-600"
            >
              Next
            </button>
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <p className="text-center font-bold">Please enter your contact details</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="w-full p-2 border rounded-md mt-2"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            className="w-full p-2 border rounded-md mt-2"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="w-full p-2 border rounded-md mt-2"
          />
          <div className="flex justify-between gap-4 mt-4">
            <button
              type="button"
              onClick={handlePreviousStep}
              className="w-full py-2 rounded-md bg-slate-300 text-black hover:bg-slate-200"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full py-2 rounded-md bg-cyan-700 text-white hover:bg-cyan-600"
            >
              Submit
            </button>
          </div>
        </>
      )}

      {step === 5 && matchedTutor && (
        <>
          <p className="text-center font-bold">You are matched with</p>
          <div className="text-center mt-4">
            <h3 className="text-xl">{matchedTutor.name}</h3>
            <a
              href={matchedTutor.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 mt-4 rounded-md bg-green-700 text-white hover:bg-green-600 text-xl font-semibold flex items-center justify-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 12H4"></path>
                <path d="M12 4v16"></path>
              </svg>
              <span>Book Now</span>
            </a>
          </div>
          <button
            type="button"
            onClick={handleRestart}
            className="w-full py-2 mt-4 rounded-md bg-slate-300 text-black hover:bg-slate-200"
          >
            Restart
          </button>
        </>
      )}
    </form>
  );
};

export default ConditionalForm;