import React, { useState } from 'react';
import { IoCarOutline } from "react-icons/io5";
import { HiOutlineHome } from "react-icons/hi2";

const instruments = [
  { icon: '/assets/images/custom-icons/microphone.png', title: 'Singing' },
  { icon: '/assets/images/custom-icons/piano.png', title: 'Piano/Keyboard' },
  { icon: '/assets/images/custom-icons/electric-guitar.png', title: 'Electric Guitar' },
  { icon: '/assets/images/custom-icons/acoustic-guitar.png', title: 'Acoustic Guitar' },
  { icon: '/assets/images/custom-icons/bass-guitar.png', title: 'Bass Guitar' }
];

const tutorsData = [
  {
    id: 1,
    name: "John Doe",
    instruments: ["Piano/Keyboard", "Acoustic Guitar"],
    bio: "Experienced piano and guitar teacher...",
    photo: "/assets/images/tutors/tutorA.jpg",
    availability: "Mon-Fri, 9AM-6PM",
    mobile: true,
    mobileCoverage: ["BS1", "BS2", "BS3"],
    studio: true,
    studioPostcode: "BS1 1AA"
  },
  {
    id: 2,
    name: "Sarah Smith",
    instruments: ["Singing", "Piano/Keyboard"],
    bio: "Professional vocalist and piano instructor...",
    photo: "/assets/images/tutors/tutorB.jpg",
    availability: "Tue-Sat, 10AM-7PM",
    mobile: true,
    mobileCoverage: ["BS4", "BS5"],
    studio: false,
    studioPostcode: ""
  },
];

const placeholderTutors = Array(3).fill({
  id: "placeholder",
  name: "Select an Instrument",
  instruments: [],
  bio: "Choose your preferred instrument above to see available tutors",
  photo: "/assets/images/small-logo.png",
  mobile: false,
  mobileCoverage: [],
  studio: false,
  studioPostcode: ""
});

export default function TutorSelect() {
  const [selectedInstrument, setSelectedInstrument] = useState('');
  const [filteredTutors, setFilteredTutors] = useState([]);

  const handleInstrumentChange = (e) => {
    const instrument = e.target.value;
    setSelectedInstrument(instrument);

    if (!instrument) {
      // No selection => clear filtered tutors
      setFilteredTutors([]);
      return;
    }
    // Filter tutors for selected instrument
    const matched = tutorsData.filter((t) => t.instruments.includes(instrument));
    setFilteredTutors(matched);
  };

  let tutorsToDisplay;
  if (!selectedInstrument) {
    // Show placeholders only if no instrument is selected
    tutorsToDisplay = placeholderTutors;
  } else if (filteredTutors.length === 0) {
    // Instrument selected but no matches
    tutorsToDisplay = null;
  } else {
    // Display matching tutors
    tutorsToDisplay = filteredTutors;
    }

    return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="max-w-md mx-auto mb-8">
      <select
        value={selectedInstrument}
        onChange={handleInstrumentChange}
        className="w-full p-2 border rounded-md"
      >
        <option value="">Select Instrument</option>
        {instruments.map((inst) => (
        <option key={inst.title} value={inst.title}>
          {inst.title}
        </option>
        ))}
      </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tutorsToDisplay === null ? (
        <p className="col-span-full text-center text-gray-500"></p>
        ) : (
          tutorsToDisplay.map((tutor) => (
            <div
              key={tutor.id}
              className="border rounded-lg shadow-md bg-white overflow-hidden"
            >
              <div className="w-full h-[300px] flex items-center justify-center bg-gray-50">
                <img
                  src={tutor.photo}
                  alt={tutor.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-gray-700">
                  {tutor.name}
                </h3>
                {tutor.id !== "placeholder" && (
                  <div className="flex gap-2 mb-3">
                    {tutor.instruments.map((instr) => {
                      const data = instruments.find((i) => i.title === instr);
                      return data ? (
                        <img
                          key={instr}
                          src={data.icon}
                          alt={data.title}
                          className="w-8 h-8 object-contain"
                        />
                      ) : null;
                    })}
                  </div>
                )}
                <p className="text-sm text-gray-600 mb-3">{tutor.bio}</p>
                {tutor.id !== "placeholder" && (
                  <>
                    <div className="text-sm space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <IoCarOutline
                          className={`w-6 h-6 ${
                            tutor.mobile ? "text-sky-800" : "text-gray-300"
                          }`}
                        />
                        <span
                          className={tutor.mobile ? "text-gray-700" : "text-gray-400"}
                        >
                          {tutor.mobile
                            ? `Mobile: ${tutor.mobileCoverage.join(", ")}`
                            : "Mobile Service Not Available"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HiOutlineHome
                          className={`w-6 h-6 ${
                            tutor.studio ? "text-sky-800" : "text-gray-300"
                          }`}
                        />
                        <span
                          className={tutor.studio ? "text-gray-700" : "text-gray-400"}
                        >
                          {tutor.studio
                            ? `Studio: ${tutor.studioPostcode}`
                            : "Studio Service Not Available"}
                        </span>
                      </div>
                    </div>
                    <button className="w-full bg-sky-900 text-white py-2 rounded text-sm font-medium hover:bg-sky-600 transition">
                      Book Now
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}