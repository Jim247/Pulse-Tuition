import React, { useState, useMemo, useCallback } from 'react';
import { IoHomeOutline, IoCarOutline } from "react-icons/io5";

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
    { title: 'Acoustic Guitar', icon: '/src/assets/custom-icons/acoustic-guitar.png' },
    { title: 'Piano/Keyboard', icon: '/src/assets/custom-icons/piano.png' },
    { title: 'Electric Guitar', icon: '/src/assets/custom-icons/electric-guitar.png' },
    { title: 'Singing', icon: '/src/assets/custom-icons/microphone.png' },
    { title: 'Bass Guitar', icon: '/src/assets/custom-icons/bass-guitar.png' },
  ];

  const tutors = [
    {
      name: 'Tutor A',
      instruments: ['Acoustic Guitar', 'Electric Guitar'],
      locations: ['Mobile'],
      coverage: ['BS1', 'BS3'],
      calendly: 'https://calendly.com/tutor-a',
      bio: 'Experienced guitarist specializing in acoustic and rock styles.',
      photo: '/src/assets/images/tutors/tutorA.jpg',
    },
    {
      name: 'Tutor B',
      instruments: ['Piano/Keyboard'],
      locations: ['Location 2', 'Mobile'],
      coverage: ['BS2', 'BS4'],
      calendly: 'https://calendly.com/tutor-b',
      bio: 'Classically trained pianist with a passion for modern pop.',
      photo: '/src/assets/images/tutors/tutorB.jpg',
    },
    {
      name: 'Tutor C',
      instruments: ['Electric Guitar'],
      locations: ['Mobile', 'Location 2'],
      coverage: ['BS5'],
      calendly: 'https://calendly.com/tutor-c',
      bio: 'Rock and metal guitarist with extensive teaching experience.',
      photo: '/src/assets/images/tutors/tutorC.jpg',
    },
    {
      name: 'Tutor D',
      instruments: ['Singing'],
      locations: ['Mobile'],
      coverage: ['BS6'],
      calendly: 'https://calendly.com/tutor-d',
      bio: 'Vocal coach specializing in vocal range development and technique.',
      photo: '/src/assets/images/tutors/tutorD.jpg',
    },
    {
      name: 'Tutor E',
      instruments: ['Bass Guitar'],
      locations: ['Location 2'],
      coverage: ['BS7'],
      calendly: 'https://calendly.com/tutor-e',
      bio: 'Seasoned bassist teaching everything from funk to rock grooves.',
      photo: '/src/assets/images/tutors/tutorE.jpg',
    },
  ];

  const instrumentLocations = useMemo(() => {
    const acc = {};
    tutors.forEach((tutor) => {
      tutor.instruments.forEach((instrument) => {
        if (!acc[instrument]) acc[instrument] = new Set();
        tutor.locations.forEach((loc) => acc[instrument].add(loc));
      });
    });
    Object.keys(acc).forEach((instrument) => {
      acc[instrument] = Array.from(acc[instrument]);
    });
    return acc;
  }, [tutors]);

  const locationCoverageMap = useMemo(() => {
    const coverageAcc = {};
    if (formData.instrument && instrumentLocations[formData.instrument]) {
      instrumentLocations[formData.instrument].forEach((loc) => {
        const coverageData = tutors
          .filter(
            (t) =>
              t.instruments.includes(formData.instrument) &&
              t.locations.includes(loc) &&
              t.coverage
          )
          .flatMap((t) => t.coverage);
        coverageAcc[loc] = coverageData;
      });
    }
    return coverageAcc;
  }, [formData.instrument, instrumentLocations, tutors]);

  const matchedTutors = useMemo(() => {
    return tutors.filter(
      (tutor) =>
        tutor.instruments.includes(formData.instrument) &&
        tutor.locations.includes(formData.location)
    );
  }, [formData.instrument, formData.location]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleInstrumentSelect = useCallback((instrument) => {
    setFormData((prev) => ({ ...prev, instrument, location: '' }));
  }, []);

  const handleNextStep = useCallback(() => {
    if (step === 1 && !formData.instrument) {
      alert('Please select an instrument.');
      return;
    }
    if (step === 2 && !formData.location) {
      alert('Please select a location.');
      return;
    }
    if (step === 3 && (!formData.ageRange || !formData.ability || !formData.details)) {
      alert('Please provide age range, ability, and additional details.');
      return;
    }
    if (step === 4 && (!formData.name || !formData.email || !formData.phone)) {
      alert('Please fill out all fields.');
      return;
    }
    setStep((prev) => prev + 1);
  }, [step, formData]);

  const handlePreviousStep = useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

  const handleSubmitAnyway = useCallback(() => {
    alert('Details submitted. We will contact you soon.');
  }, []);

  const handleRestart = useCallback(() => {
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
  }, []);

  return (
    <form className="space-y-6 p-4 sm:p-6 rounded-lg shadow-md max-w-md sm:max-w-xl mx-auto bg-transparent">
      {/* Step 1: Select Instrument */}
      {step === 1 && (
        <>
          <p className="text-center font-bold">Please select an Instrument</p>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
            {instruments.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => handleInstrumentSelect(item.title)}
                className={`w-full flex flex-col items-center justify-center space-y-4 py-4 px-6 rounded-lg border-2 ${
                  formData.instrument === item.title
                    ? 'border-sky-800 text-black bg-cyan-50'
                    : 'border-sky-800 text-gray-800 bg-white shadow-lg'
                } shadow-sm hover:bg-cyan-50 transition-all duration-200 ease-in-out`}
              >
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-20 h-20 max-w-full"
                />
                <p className="font-bold text-lg text-center">{item.title}</p>
              </button>
            ))}
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full py-2 rounded-md bg-sky-800 text-white hover:bg-sky-600"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Step 2: Select Location */}
      {step === 2 && (
        <>
          <p className="text-center font-bold">Please select a Location</p>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 justify-center">
            {instrumentLocations[formData.instrument]?.map((location) => (
              <button
                key={location}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, location }))}
                className={`w-full flex flex-col items-center justify-center space-y-2 py-4 px-6 rounded-lg border-2 ${
                  formData.location === location
                    ? 'border-sky-800 text-black bg-cyan-50'
                    : 'border-sky-800 text-gray-800 bg-white shadow-lg'
                } shadow-sm hover:bg-cyan-50 transition-all duration-200 ease-in-out`}
              >
                {location === 'Mobile' ? (
                  <IoCarOutline className="w-20 h-20 text-sky-800" style={{ strokeWidth: 0.2 }} />
                ) : (
                  <IoHomeOutline className="w-20 h-20 text-sky-800" style={{ strokeWidth: 0.2 }} />
                )}
                <p className="font-bold text-lg text-center">{location}</p>
                {locationCoverageMap[location]?.length > 0 && (
                  <p className="text-xs text-gray-500">
                    {locationCoverageMap[location].join(', ')}
                  </p>
                )}
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
              className="w-full py-2 rounded-md bg-sky-800 text-white hover:bg-sky-600"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Step 3: Provide Details */}
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
              className="w-full p-2 border rounded-md mt-1 focus:ring-2 focus:ring-sky-800"
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
              className="w-full py-2 rounded-md bg-sky-800 text-white hover:bg-sky-600"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Step 4: Contact Info */}
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
              className="w-full py-2 rounded-md bg-sky-800 text-white hover:bg-sky-600"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Step 5: Show All Matched Tutors or "No Match" Option */}
      {step === 5 && (
        <>
          {matchedTutors.length > 0 ? (
            <div className="space-y-6">
              <h2 className="text-center text-2xl font-bold">Available Tutors</h2>
              {matchedTutors.map((tutor) => (
                <div
                  key={tutor.name}
                  className="p-4 border border-gray-200 rounded-md shadow-md space-y-2"
                >
                  {tutor.photo && (
                    <div className="flex justify-center mb-2">
                      <img
                        src={tutor.photo}
                        alt={tutor.name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    </div>
                  )}
                  <p className="text-xl font-semibold text-center">{tutor.name}</p>
                  <p className="text-center text-gray-600">Location: {formData.location}</p>
                  {tutor.bio && (
                    <p className="text-sm text-center text-gray-700 px-4">
                      {tutor.bio}
                    </p>
                  )}
                  <div className="flex justify-center mt-2">
                    <a
                      href={tutor.calendly}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-6 rounded-md bg-green-700 text-white hover:bg-green-600 text-sm font-medium flex items-center space-x-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
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
                </div>
              ))}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleSubmitAnyway}
                  className="py-2 px-6 rounded-md bg-blue-600 text-white hover:bg-blue-500 text-sm font-medium"
                >
                  Please Contact Me - I Need More Help
                </button>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="py-2 px-6 rounded-md bg-slate-300 text-black hover:bg-slate-200 text-sm"
                >
                  Restart
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-center text-xl font-bold">No Match Found</h2>
              <p className="text-center text-gray-600">
                Please submit your details, and we'll contact you with extra help.
              </p>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleSubmitAnyway}
                  className="py-2 px-6 rounded-md bg-blue-600 text-white hover:bg-blue-500 text-sm font-medium"
                >
                  Submit Details
                </button>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="py-2 px-6 rounded-md bg-slate-300 text-black hover:bg-slate-200 text-sm"
                >
                  Restart
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </form>
  );
};

export default ConditionalForm;