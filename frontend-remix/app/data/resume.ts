export interface Experience {
  company: string;
  companyUrl: string;
  contract?: boolean;
  date: string;
  dateRange?: [start: Date, end?: Date];
  description: string;
  highlights: string[];
  image?: string;
  title: string;
}

export const experience: Experience[] = [
  // {
  //   company: "Rocket CMS",
  //   companyUrl: "https://rocketcms.org/",
  //   date: `Feb 2022 - Present`,
  //   description: `<p>RocketCMS lets anyone manage your website using the components you've designed.</p>`,
  //   highlights: [
  //     `Delivered a full rebuild & rebrand of the Python + Django website to NextJS`,
  //     `Migrated to a (nearly) fully containerized stack and development workflow`,
  //     `Introduced GraphQL and strong (generated) types across services`,
  //     `Abstracted a core style-guide used across services`
  //   ],
  //   image: `https://rocketcms.org/favicon.ico`,
  //   tags: [
  //      "NodeJS",
  //      "TailwindCSS",
  //      "TypeScript"
  //   ],
  //   title: `Founder`
  // },

  {
    company: "Veehive",
    companyUrl: "https://veehive.ai/",
    date: `June 2023 - August 2023`,
    dateRange: [new Date(2022, 9, 6)],
    description: `
      <p>
        A solid 2 months grind in and we had made a really cool web app useful for anyone.
      </p>
    `,
    highlights: [
      'Worked on video content generation tools',
      'Full stack web development using FastAPI and React',
      'Experience with cloud hosting using Azure VM',
    ],
    image: `/images/assets/veehive.png`,
    title: `GenAI Intern`,
  }
];

export interface Social {
  icon: string;
  title: string;
  url: string;
}

export const social: Social[] = [
  {
    icon: `/images/svg/envelope.svg`,
    title: `katrekarsanvit2`,
    url: `mailto:katrekarsanvit2@gmail.com`,
  },
  // {
  //   icon: `/images/svg/phone.svg`,
  //   title: `(415) 722-7481`,
  //   url: `tel:+14157227481`
  // },
  {
    icon: `/images/svg/github.svg`,
    title: `/Sanvit-Katrekar`,
    url: `https://github.com/Sanvit-Katrekar`,
  },
  {
    icon: `/images/svg/linkedin.svg`,
    title: `/in/sanvit-katrekar`,
    url: `https://www.linkedin.com/in/sanvit-katrekar-1089452b2`,
  }
];
