export interface Tutor {
  id: string;
  name: string;
  instruments: string[];
  coverage: {
    mobile: string[] | null;
    location: string | null;
    online: boolean;
  };
  bio: string;
  photo: string;
  graduate: boolean;
  experience: number;
  reviews: number;
}

const tutors = [
  {
    id: 'tutor-a',
    name: 'George',
    instruments: ['Acoustic Guitar', 'Electric Guitar', 'Bass Guitar', 'Piano/Keyboard'],
    coverage: {
      mobile: null,
      location: 'BS3',
      online: true,
    },
    bio: 'Experienced guitarist specializing in acoustic and rock styles.',
    photo: '/assets/images/tutors/tutorA.jpg',
  },
  {
    id: 'tutor-b',
    name: 'Tutor B',
    instruments: ['Piano/Keyboard'],
    coverage: {
      mobile: ['BS3, BS5, BS6, BS7'],
      location: 'BS3',
      online: true,
    },
    bio: 'Classically trained pianist with a passion for modern pop.',
    photo: 'assets/images/tutors/tutorB.jpg',
  },
];

export default tutors;
