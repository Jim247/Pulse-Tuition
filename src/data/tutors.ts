export interface Tutor {
  id: string;
  name: string;
  instruments: string[];
  locations: string[];
  coverage: string[];
  calendly: string;
  bio: string;
  photo: string;
}

const tutors = [
  {
    id: 'tutor-a',
    name: 'Tutor A',
    instruments: ['Acoustic Guitar', 'Electric Guitar'],
    locations: ['Mobile'],
    coverage: ['BS1', 'BS3'],
    calendly: 'https://calendly.com/tutor-a',
    bio: 'Experienced guitarist specializing in acoustic and rock styles.',
    photo: '/src/assets/images/tutors/tutorA.jpg',
  },
  {
    id: 'tutor-b',
    name: 'Tutor B',
    instruments: ['Piano/Keyboard'],
    locations: ['Mobile', 'Location 2'],
    coverage: ['BS2', 'BS4'],
    calendly: 'https://calendly.com/tutor-b',
    bio: 'Classically trained pianist with a passion for modern pop.',
    photo: '/src/assets/images/tutors/tutorC.jpg',
  }
];

export default tutors;