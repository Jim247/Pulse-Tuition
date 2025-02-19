import { getPermalink, getBlogPermalink, getWorkPermalink, getPricingPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Lessons',
      submenu: [
        {
          text: 'Guitar',
          href: getPermalink('/guitar-lessons-bristol'),
        },
        {
          text: 'Piano',
          href: getPermalink('piano-lessons-bristol'),
        },
        {
          text: 'Singing',
          href: getPermalink('singing-lessons-bristol'),
        },
      ],
    },
    {
      text: 'Our Tutors',
      href: getPermalink('tutors'),
    },
    {
      text: 'Pricing',
      href: getPricingPermalink(),
    },
    {
      text: 'Work With Us',
      href: getWorkPermalink(),
    },
    {
      text: 'Insights',
      href: getBlogPermalink(),
    },
  ],
  actions: [{ text: 'BOOK NOW ', href: '/booking', class: 'btn-primary' }],
};

export const footerData = {
  links: [],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    {
      ariaLabel: 'Instagram',
      icon: 'tabler:brand-instagram',
      href: 'https://www.instagram.com/pulse.tuition',
      class: 'w-8 h-8',
    },
    {
      ariaLabel: 'Facebook',
      icon: 'tabler:brand-facebook',
      href: 'https://www.facebook.com/pulse.tuition.uk',
      class: 'w-8 h-8',
    },
  ],
  footNote: `
    Pulse Tuition <a class="text-white underline dark:text-muted" href="#ß
    "></a> · All rights reserved.
  `,
};
