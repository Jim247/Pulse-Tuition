import React from 'react';
import { HiCursorArrowRays } from 'react-icons/hi2';
import { FaGraduationCap, FaMedal, FaTrophy } from 'react-icons/fa';

const instruments = [
  { icon: '/assets/images/custom-icons/microphone.png', title: 'Singing' },
  { icon: '/assets/images/custom-icons/piano.png', title: 'Piano/Keyboard' },
  { icon: '/assets/images/custom-icons/electric-guitar.png', title: 'Electric Guitar' },
  { icon: '/assets/images/custom-icons/acoustic-guitar.png', title: 'Acoustic Guitar' },
  { icon: '/assets/images/custom-icons/bass-guitar.png', title: 'Bass Guitar' },
];

// Tutor data array
const tutorsData = [
  {
    id: 'tutor-a',
    name: 'George',
    teachingStartYear: 2018, // Replace boolean flags with start year
    instruments: ['Acoustic Guitar', 'Electric Guitar', 'Bass Guitar', 'Piano/Keyboard'],
    Studio: 'BS3',
    mobile: null,
    online: true,
    hasDegree: true,
    bio: 'Experienced pianist and guitarist with a variety of skills and expertise.',
    photo: '/assets/images/tutors/George-Guitar.png',
  },
  {
    id: 'tutor-b',
    name: 'Tom',
    teachingStartYear: 2018,
    instruments: ['Electric Guitar', 'Acoustic Guitar', 'Bass Guitar'],
    Studio: 'BS3',
    mobile: ['Available at additional cost'],
    online: true,
    hasDegree: true,
    bio: 'Guitarist and music educator with a first-class BMus in Jazz, years of teaching experience, and a passion for helping students grow.',
    photo: 'assets/images/tutors/tom-guitar.png',
  },
];

function Tutors() {
  const calculateExperienceYears = (startYear) => {
    const currentYear = new Date().getFullYear();
    return currentYear - startYear;
  };

  const getExperienceBadge = (startYear) => {
    const years = calculateExperienceYears(startYear);

    if (years >= 10) {
      return (
        <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm">
          <FaTrophy className="w-4 h-4" />
          <span>{years}+ Years Teaching</span>
        </div>
      );
    }
    if (years >= 5) {
      return (
        <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm">
          <FaMedal className="w-4 h-4" />
          <span>{years}+ Years Teaching</span>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="max-w-7xl mx-auto py-8 px-4">
      <h2 className="text-3xl text-center font-bold mb-6">Meet Our Tutors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorsData.map((tutor) => (
          <div
            key={tutor.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
          >
            {/* Tutor Photo */}
            <img src={tutor.photo} alt={`${tutor.name} photo`} className="w-full h-64 object-cover object-center" />

            {/* Tutor Details */}
            <div className="p-4 flex flex-col flex-1">
              {/* Tutor Name and Badges */}
              <div className="mb-3">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{tutor.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {tutor.hasDegree && (
                    <div className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm">
                      <FaGraduationCap className="w-4 h-4" />
                      <span>Music Graduate</span>
                    </div>
                  )}
                  {getExperienceBadge(tutor.teachingStartYear)}
                </div>
              </div>

              {/* Tutor Bio */}
              <p className="text-gray-600 text-sm mb-3 line-clamp-5">{tutor.bio}</p>

              {/* Instruments */}
              <h4 className="text-sm font-medium text-gray-800 mb-1">
                <strong>Instruments:</strong>
              </h4>
              <ul className="text-gray-600 text-sm list-none space-y-2 mb-4">
                {tutor.instruments.map((instrument) => {
                  const instrumentData = instruments.find((inst) => inst.title === instrument);
                  return (
                    <li key={instrument} className="flex items-center">
                      {instrumentData && <img src={instrumentData.icon} alt={instrument} className="w-5 h-5 mr-2" />}
                      {instrument}
                    </li>
                  );
                })}
              </ul>

              {/* Studio and Coverage (Optional Fields) */}
              <div className="mt-auto space-y-1">
                {tutor.Studio && (
                  <p className="text-sm text-gray-700">
                    <strong> Studio:</strong> {tutor.Studio}
                  </p>
                )}
                {tutor.mobile && (
                  <p className="text-sm text-gray-700">
                    <strong>Mobile Coverage:</strong> {tutor.mobile.join(', ')}
                  </p>
                )}
                {tutor.online && (
                  <p className="text-sm text-green-600 flex items-center">
                    <HiCursorArrowRays className="w-5 h-5 mr-2" />
                    Online Available
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Tutors;
