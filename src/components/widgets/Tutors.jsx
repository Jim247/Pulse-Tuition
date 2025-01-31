import React from 'react';
import { HiCursorArrowRays } from 'react-icons/hi2';

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
    instruments: ['Acoustic Guitar', 'Electric Guitar', 'Bass Guitar', 'Piano/Keyboard'],
    Studio: 'BS3',
    mobile: null,
    online: true,
    bio: 'Experienced guitarist specializing in acoustic and rock styles.',
    photo: '/assets/images/tutors/tutorA.jpg',
  },
  {
    id: 'tutor-b',
    name: 'Tutor B',
    instruments: ['Piano/Keyboard'],
    Studio: 'BS3',
    mobile: ['BS3', 'BS5', 'BS6', 'BS7'],
    online: true,
    bio: 'Classically trained pianist with a passion for modern pop.',
    photo: 'assets/images/tutors/tutorB.jpg',
  },
];

function Tutors() {
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
            <img
              src={tutor.photo}
              alt={`${tutor.name} photo`}
              className="w-full h-48 object-cover object-center"
            />

            {/* Tutor Details */}
            <div className="p-4 flex flex-col flex-1">
              {/* Tutor Name */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{tutor.name}</h3>

              {/* Tutor Bio */}
              <p className="text-gray-600 text-sm mb-3 line-clamp-3">{tutor.bio}</p>

              {/* Instruments */}
              <h4 className="text-sm font-medium text-gray-800 mb-1">Instruments:</h4>
              <ul className="text-gray-600 text-sm list-none space-y-2 mb-4">
                {tutor.instruments.map((instrument) => {
                  const instrumentData = instruments.find((inst) => inst.title === instrument);
                  return (
                    <li key={instrument} className="flex items-center">
                      {instrumentData && (
                        <img src={instrumentData.icon} alt={instrument} className="w-5 h-5 mr-2" />
                      )}
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
