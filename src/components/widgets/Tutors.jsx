import React from 'react';
import { HiCursorArrowRays } from 'react-icons/hi2';
import { FaGraduationCap, FaMedal, FaTrophy, FaBuilding, FaPhoneAlt } from 'react-icons/fa';

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
    teachingStartYear: 2018,
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
    mobile: ['Available'],
    online: true,
    hasDegree: true,
    bio: 'Guitarist and music educator with a first-class BMus in Jazz, years of teaching experience, and a passion for helping students grow.',
    photo: 'assets/images/tutors/tom-guitar.png',
  },
  {
    id: 'tutor-c',
    name: 'Jake',
    teachingStartYear: 2021,
    instruments: ['Piano/Keyboard', 'Singing', 'Electric Guitar', 'Acoustic Guitar', 'Bass Guitar'],
    Studio: 'TBC',
    mobile: ['Available'],
    online: true,
    hasDegree: false,
    bio: 'Multi-instrumentalist with 10 years of performance experience worldwide, offering insights in performance, recording, and production.',
    photo: 'assets/images/tutors/Jake.jpeg',
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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tutorsData.map((tutor) => (
          <div
            key={tutor.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
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

              {/* Updated Studio and Mobile Section */}
              <div className="mt-auto space-y-2">
                {tutor.Studio && (
                  <div className="flex items-center text-sm text-gray-700">
                    <FaBuilding className="w-4 h-4 mr-2" />
                    <span>
                      <strong>Studio: </strong> {tutor.Studio}
                    </span>
                  </div>
                )}
                {tutor.mobile && (
                  <div className="flex items-center text-sm text-gray-700">
                    <FaPhoneAlt className="w-4 h-4 mr-2" />
                    <span>
                      <strong>Mobile: </strong> {tutor.mobile.join(', ')}
                    </span>
                  </div>
                )}
                {tutor.online && (
                  <div className="flex items-center text-sm text-green-600">
                    <HiCursorArrowRays className="w-5 h-5" />
                    <span>Online Available</span>
                  </div>
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
