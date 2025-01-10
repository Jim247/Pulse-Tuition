import React, { useState } from 'react';
import { IoCarOutline } from "react-icons/io5";
import { HiOutlineHome } from "react-icons/hi2";

const instruments = [
  {
    icon: '/src/assets/images/custom-icons/microphone.png',
    title: 'Singing',
  },
  {
    icon: '/src/assets/images/custom-icons/piano.png',
    title: 'Piano/Keyboard',
  },
  {
    icon: '/src/assets/images/custom-icons/electric-guitar.png',
    title: 'Electric Guitar',
  },
  {
    icon: '/src/assets/images/custom-icons/acoustic-guitar.png',
    title: 'Acoustic Guitar',
  },
  {
    icon: '/src/assets/images/custom-icons/bass-guitar.png',
    title: 'Bass Guitar',
  }
];

const tutorsData = [
  { 
    id: 1, 
    name: "John Doe", 
    instruments: ["Piano/Keyboard", "Acoustic Guitar"], 
    bio: "Experienced piano and guitar teacher with over 10 years of teaching experience",
    availability: "Mon-Fri, 9AM-6PM",
    photo: "/assets/images/tutors/tutorA.jpg",
    mobile: true,
    mobileCoverage: ["BS1", "BS2", "BS3"],
    studio: true,
    studioPostcode: "BS1 1AA"
  },
  {
    id: 2,
    name: "Sarah Smith",
    instruments: ["Singing", "Piano/Keyboard"],
    bio: "Professional vocalist and piano instructor specializing in contemporary styles",
    availability: "Tue-Sat, 10AM-7PM",
    photo: "/assets/images/tutors/tutorB.jpg",
    mobile: true, 
    mobileCoverage: ["BS4", "BS5"],
    studio: false,
    studioPostcode: ""
  },
  {
    id: 3,
    name: "Mike Johnson",
    instruments: ["Electric Guitar", "Bass Guitar"],
    bio: "Rock and blues specialist with recording studio experience",
    availability: "Mon-Sun, 11AM-8PM",
    photo: "/assets/images/tutors/tutorC.jpg",
    mobile: false,
    mobileCoverage: [],
    studio: true,
    studioPostcode: "BS6 2RR"
  },
  {
    id: 4,
    name: "Emma Wilson",
    instruments: ["Singing", "Acoustic Guitar"],
    bio: "Folk and acoustic specialist focusing on songwriting and performance",
    availability: "Wed-Sun, 12PM-8PM",
    photo: "/assets/images/tutors/tutorB.jpg",
    mobile: true,
    mobileCoverage: ["BS1", "BS7", "BS8"],
    studio: true,
    studioPostcode: "BS8 4AB"
  }
];

const TutorSelect = () => {
    const [selectedInstrument, setSelectedInstrument] = useState('');
    const [filteredTutors, setFilteredTutors] = useState([]); // Initialize as empty
  
    const handleInstrumentChange = (e) => {
      const instrument = e.target.value;
      setSelectedInstrument(instrument);
      setFilteredTutors(
        instrument === '' 
          ? [] // Return empty array when no instrument selected
          : tutorsData.filter(tutor => tutor.instruments.includes(instrument))
      );
    };
  

    return (
        <div className="max-w-7xl mx-auto p-4">
          <select
            value={selectedInstrument}
            onChange={handleInstrumentChange}
            className="w-full max-w-md mx-auto block mb-8 p-2 border rounded-md"
          >
            <option value="">Select Instrument</option>
            {instruments.map((instrument) => (
              <option key={instrument.title} value={instrument.title}>
                {instrument.title}
              </option>
            ))}
          </select>
    
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTutors.map((tutor) => (
              <div key={tutor.id} className="border rounded-lg shadow-md hover:shadow-md bg-white overflow-hidden">
                {/* Profile Photo */}
                <div className="w-full h-[300px]">
                  <img 
                    src={tutor.photo} 
                    alt={tutor.name}
                    className="w-full h-full object-contain"
                  />
                </div>
    
                {/* Content Container */}
                                <div className="p-4">
                                  {/* Name and Instruments */}
                                  <h3 className="font-semibold text-lg text-start mb-2">{tutor.name}</h3>
                                  <div className="flex justify-start gap-2 mb-3">
                                    {tutor.instruments.map(instrument => {
                                      const instrumentData = instruments.find(i => i.title === instrument);
                                      return instrumentData && (
                                        <img 
                                          key={instrument}
                                          src={instrumentData.icon}
                                          alt={instrument}
                                          className="w-8 h-8 object-contain"
                                        />
                                      );
                                    })}
                                  </div>

{/* Bio and Locations */}
<p className="text-sm text-gray-600 mb-3">{tutor.bio}</p>
<div className="text-sm space-y-2 mb-4">
  <div className="flex items-center gap-2">
    <IoCarOutline className={`w-6 h-6 flex-shrink-0 ${tutor.mobile ? 'text-sky-800' : 'text-gray-300'}`} />
    <span className={tutor.mobile ? 'text-gray-700' : 'text-gray-400'}>
      {tutor.mobile ? `Mobile: ${tutor.mobileCoverage.join(", ")}` : 'Mobile Service Not Available'}
    </span>
  </div>
  <div className="flex items-center gap-2">
    <HiOutlineHome className={`w-6 h-6 flex-shrink-0 ${tutor.studio ? 'text-sky-800' : 'text-gray-300'}`} />
    <span className={tutor.studio ? 'text-gray-700' : 'text-gray-400'}>
      {tutor.studio ? `Studio: ${tutor.studioPostcode}` : 'Studio Service Not Available'}
    </span>
  </div>
</div>
                    
                                  {/* Book Button */}
                  <button 
                    className="w-full bg-sky-900 text-white py-2 rounded text-sm font-medium hover:bg-sky-600 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };

export default TutorSelect;