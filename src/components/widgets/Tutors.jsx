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
    mobile: ['Available at additional cost'],
    online: true,
    hasDegree: true,
    bio: 'Guitarist and music educator with a first-class BMus in Jazz, and a passion for helping students grow.',
    photo: '/assets/images/tutors/tom-guitar.png',
  },
];

const Divider = () => <hr className="border-t border-gray-300 my-4" />;

function Tutors() {
  const calculateExperienceYears = (startYear) => {
    const currentYear = new Date().getFullYear();
    return currentYear - startYear;
  };

  const getExperienceBadge = (startYear) => {
    const years = calculateExperienceYears(startYear);

    if (years >= 10) {
      return (
        <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full flex items-center gap-1 text-xs">
          <FaTrophy className="w-4 h-4" />
          <span>{years}+ Years Teaching</span>
        </div>
      );
    }
    if (years >= 5) {
      return (
        <div className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full flex items-center gap-1 text-xs">
          <FaMedal className="w-4 h-4" />
          <span>{years}+ Years Teaching</span>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="max-w-full mx-auto py-8 px-4">
      <h2 className="text-3xl text-center font-bold mb-6">Meet Our Tutors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tutorsData.map((tutor) => (
          <div
            key={tutor.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-200"
          >
            {/* Tutor Photo */}
            <img 
              src={tutor.photo} 
              alt={`${tutor.name} photo`} 
              className="w-full h-72 object-cover object-center" 
            />

            {/* Tutor Details */}
            <div className="p-6 flex flex-col flex-1">
              {/* Tutor Name and Badges */}
              <h3 className="text-2xl font-bold text-gray-900">{tutor.name}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {tutor.hasDegree && (
                  <div className="flex items-center gap-1 bg-sky-100 text-sky-800 px-2 py-1 rounded-full text-xs">
                    <FaGraduationCap className="w-4 h-4" />
                    <span>Music Graduate</span>
                  </div>
                )}
                {getExperienceBadge(tutor.teachingStartYear)}
              </div>
              <Divider />

              {/* Tutor Bio */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-4">{tutor.bio}</p>

              {/* Instruments */}
              <h4 className="text-sm font-medium text-gray-800 mb-2">
                <strong>Instruments:</strong>
              </h4>
              <ul className="text-gray-600 text-sm list-none space-y-1 mb-4">
                {Array.from({ length: 4 }).map((_, i) => {
                  const instrument = tutor.instruments[i];
                  if (instrument) {
                    const instrumentData = instruments.find((inst) => inst.title === instrument);
                    return (
                      <li key={i} className="flex items-center gap-2">
                        {instrumentData && (
                          <img 
                            src={instrumentData.icon} 
                            alt={instrument} 
                            className="w-5 h-5"
                          />
                        )}
                        <span>{instrument}</span>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
              <Divider />

              {/* Studio and Coverage */}
              <div className="mt-auto">
                <p className="text-sm text-gray-700">
                  <strong>Studio:</strong> {tutor.Studio || 'N/A'}
                </p>
                {tutor.mobile && (
                  <p className="text-sm text-gray-700">
                    <strong>Mobile Coverage:</strong> {tutor.mobile.join(', ')}
                  </p>
                )}
                {tutor.online && (
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <HiCursorArrowRays className="w-5 h-5" />
                    <span>Online Available</span>
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