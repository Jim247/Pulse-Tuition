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
    details: '',
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
      calendly: 'https://bbc.co.uk',
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
    if (step === 3 && !formData.details) {
      alert('Please provide more details about the student.');
      return;
    }
    if (step === 4 && (!formData.name || !formData.email || !formData.phone)) {
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
    <form className="space-y-6 p-4 sm:p-6 rounded-lg shadow-md max-w-md sm:max-w-xl mx-auto sticky top-0 bg-transparent">
      <h2 className="text-2xl font-bold text-center">Contact Us</h2>

      {step === 1 && (
        <>
          <p className="text-center font-bold">Please select an Instrument</p>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {instruments.map((instrument) => (
              <button
                key={instrument.title}
                type="button"
                onClick={() => handleInstrumentSelect(instrument.title)}
                className={`w-full flex flex-col items-center justify-center space-y-4 py-4 px-6 rounded-lg border-2 ${
                  formData.instrument === instrument.title
                    ? 'border-cyan-800 text-black bg-cyan-50'
                    : 'border-grey-800 text-gray-800 bg-white shadow-lg'
                } shadow-sm hover:bg-cyan-50 transition-all duration-200 ease-in-out`}
              >
                <img
                  src={instrument.icon}
                  alt={instrument.title}
                  className={`${instrument.iconClass || 'w-25 h-25'} max-w-full`}
                />
                <p className="font-bold text-lg text-center">{instrument.title}</p>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={handleNextStep}
            className="w-full py-2 rounded-md bg-cyan-700 text-white hover:bg-cyan-600 mt-4"
          >
            Next
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <p className="text-center font-bold">Please select a Location</p>
          <div className="grid grid-cols-1 gap-4">
            {instrumentLocations[formData.instrument]?.map((location) => (
              <button
                key={location}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, location }))}
                className={`w-full py-2 rounded-md ${
                  formData.location === location
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-cyan-200'
                }`}
              >
                {location}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={handleNextStep}
            className="w-full py-2 mt-4 rounded-md bg-cyan-700 text-white hover:bg-cyan-600"
          >
            Next
          </button>
          <button
            type="button"
            onClick={handlePreviousStep}
            className="w-full py-2 mt-4 rounded-md bg-slate-300 text-black hover:bg-cyan-200"
          >
            Back
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <p className="text-center font-bold">Please provide details</p>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleInputChange}
            placeholder="Please provide additional details about your student..."
            rows="4"
            className="w-full p-2 border rounded-md mt-2"
          />
          <button
            type="button"
            onClick={handleNextStep}
            className="w-full py-2 mt-4 rounded-md bg-cyan-700 text-white hover:bg-cyan-600"
          >
            Next
          </button>
          <button
            type="button"
            onClick={handlePreviousStep}
            className="w-full py-2 mt-4 rounded-md bg-slate-300 text-black hover:bg-cyan-200"
          >
            Back
          </button>
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
          <button
            type="button"
            onClick={handleNextStep}
            className="w-full py-2 mt-4 rounded-md bg-cyan-700 text-white hover:bg-cyan-600"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handlePreviousStep}
            className="w-full py-2 mt-4 rounded-md bg-slate-300 text-black hover:bg-cyan-200"
          >
            Back
          </button>
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
        </>
      )}
    </form>
  );
};

export default ConditionalForm;
