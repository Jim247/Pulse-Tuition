import { getPermalink, getBlogPermalink, getWorkPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'About Our Lessons',
      href: getPermalink('/about'),
    },
    {
      text: 'Work With Us',
      href: getWorkPermalink(),
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
  ],
  actions: [{ text: 'Book Now', href: './contact', target: 'primary' }],
};

export const footerData = {
  links: [],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
  ],
  footNote: `
    <img class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm" src="https://onwidget.com/favicon/favicon-32x32.png" alt="onWidget logo" loading="lazy"></img>
    Made by <a class="text-white underline dark:text-muted" href="#ß
    "></a> · All rights reserved.
  `,
};
