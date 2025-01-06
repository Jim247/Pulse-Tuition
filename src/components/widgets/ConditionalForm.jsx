import React, { useState, useMemo, useCallback } from 'react';
import { IoHomeOutline, IoCarOutline } from "react-icons/io5";

const ConditionalForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    instrument: '',
    tutor: '',
    name: '',
    email: '',
    phone: '',
    ageRange: '',
    ability: '',
    details: '',
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
      locations: ['Mobile', 'Location 2'],
      coverage: ['BS2', 'BS4'],
      calendly: 'https://calendly.com/tutor-b',
      bio: 'Classically trained pianist with a passion for modern pop.',
      photo: '/src/assets/images/tutors/tutorB.jpg',
    },
    // ...additional tutors...
  ];

  // For Step 2, filter tutors by instrument
  const matchedTutors = useMemo(
    () => tutors.filter((tutor) => tutor.instruments.includes(formData.instrument)),
    [formData.instrument]
  );

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleInstrumentSelect = useCallback((instrument) => {
    setFormData((prev) => ({ ...prev, instrument }));
    setStep(2);
  }, []);

  const handleNextStep = useCallback(() => {
    if (step === 2 && !formData.tutor) {
      alert('Please select a tutor.');
      return;
    }
    if (step === 3 && (!formData.name || !formData.email || !formData.phone)) {
      alert('Please fill out your contact info.');
      return;
    }
    if (step === 4 && (!formData.ageRange || !formData.ability || !formData.details)) {
      alert('Please provide age range, ability, and additional details.');
      return;
    }
    setStep((prev) => prev + 1);
  }, [step, formData]);

  const handlePreviousStep = useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

  const handleRestart = useCallback(() => {
    setFormData({
      instrument: '',
      tutor: '',
      name: '',
      email: '',
      phone: '',
      ageRange: '',
      ability: '',
      details: '',
    });
    setStep(1);
  }, []);

  return (
    <form className="space-y-6 p-4 sm:p-6 rounded-lg shadow-md max-w-md sm:max-w-xl mx-auto bg-transparent">
      {/* Step 1: Instrument Selection */}
      {step === 1 && (
        <>
          <h2 className="text-center font-bold">Select Your Instrument</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {instruments.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => handleInstrumentSelect(item.title)}
                className={`flex flex-col items-center p-4 border-2 rounded-md ${
                  formData.instrument === item.title
                    ? 'border-sky-900 bg-cyan-50'
                    : 'border-sky-900 bg-white'
                }`}
              >
                <img src={item.icon} alt={item.title} className="w-12 h-12 mb-2" />
                <p className="font-bold">{item.title}</p>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Step 2: Tutor Cards */}
      {step === 2 && (
        <>
          <h2 className="text-center font-bold mb-4">Available Tutors for {formData.instrument}</h2>
          {matchedTutors.length > 0 ? (
            matchedTutors.map((tutor) => (
              <div
                key={tutor.name}
                onClick={() => setFormData((prev) => ({ ...prev, tutor: tutor.name }))}
                className={`p-4 border-2 rounded-md mb-4 cursor-pointer ${
                  formData.tutor === tutor.name ? 'border-sky-900 bg-cyan-50' : 'border-gray-300 bg-white'
                }`}
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
                <h3 className="text-center font-bold">{tutor.name}</h3>
                {tutor.locations && (
                  <p className="text-center text-sm text-gray-700">
                    Locations: {tutor.locations.join(', ')}
                  </p>
                )}
                <p className="text-center text-gray-600 mt-2">{tutor.bio}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No tutors found for this instrument.</p>
          )}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handlePreviousStep}
              className="w-full py-2 rounded-md bg-slate-300 text-black hover:bg-slate-200 mr-2"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full py-2 rounded-md bg-sky-900 text-white hover:bg-sky-600 ml-2"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Step 3: Contact Info */}
      {step === 3 && (
        <>
          <h2 className="text-center font-bold">Contact Information</h2>
          <input
            name="name"
            type="text"
            className="w-full p-2 border rounded-md mt-2"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            name="email"
            type="email"
            className="w-full p-2 border rounded-md mt-2"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            name="phone"
            type="tel"
            className="w-full p-2 border rounded-md mt-2"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handlePreviousStep}
              className="w-full py-2 rounded-md bg-slate-300 text-black hover:bg-slate-200 mr-2"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full py-2 rounded-md bg-sky-900 text-white hover:bg-sky-600 ml-2"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Step 4: Student Info */}
      {step === 4 && (
        <>
          <h2 className="text-center font-bold">Student Information</h2>
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
            Additional Details:
            <textarea
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              rows="3"
              placeholder="Goals, music style interests, etc."
              className="w-full p-2 border rounded-md mt-1 focus:ring-2 focus:ring-sky-900"
            />
          </label>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handlePreviousStep}
              className="w-full py-2 rounded-md bg-slate-300 text-black hover:bg-slate-200 mr-2"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full py-2 rounded-md bg-sky-900 text-white hover:bg-sky-600 ml-2"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Step 5: Confirm/Submit */}
      {step === 5 && (
        <>
          <h2 className="text-center font-bold">Confirm Your Booking</h2>
          <div className="text-center text-sm my-4 space-y-1">
            <p>
              <strong>Instrument:</strong> {formData.instrument || 'N/A'}
            </p>
            <p>
              <strong>Tutor:</strong> {formData.tutor || 'N/A'}
            </p>
            <p>
              <strong>Name:</strong> {formData.name || 'N/A'}
            </p>
            <p>
              <strong>Email:</strong> {formData.email || 'N/A'}
            </p>
            <p>
              <strong>Phone:</strong> {formData.phone || 'N/A'}
            </p>
            <p>
              <strong>Age Range:</strong> {formData.ageRange || 'N/A'}
            </p>
            <p>
              <strong>Ability:</strong> {formData.ability || 'N/A'}
            </p>
            <p>
              <strong>Details:</strong> {formData.details || 'N/A'}
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={() => alert('Booking Confirmed!')}
              className="py-2 px-4 rounded-md bg-green-700 text-white hover:bg-green-600 text-sm font-medium"
            >
              Book Now
            </button>
            <button
              type="button"
              onClick={handleRestart}
              className="py-2 px-4 rounded-md bg-slate-300 text-black hover:bg-slate-200 text-sm"
            >
              Restart
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default ConditionalForm;