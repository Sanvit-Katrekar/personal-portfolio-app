import axios from 'axios';
import { useEffect, useState } from 'react';

import { BACKEND_BASE_URL } from '~/config/constants';

export interface Data {
  className: string;
  company: string;
  image: string;
  url: string;
}

export const myDescriptions: Record<string, string> = {
  default: `This is a <b class="font-bold">non exhaustive</b> list of tools and technologies I use to make products come to life.`,
  Python: `I've been using Python for quite a bit now, and I have to say this language is the peak we have reached for programming. I can literally do anything with this.`,
  Flask: `Flask is a lightweight, micro web framework for Python, designed to be simple and easy to use while providing the flexibility to scale as needed. It allows developers to quickly build web applications with minimal setup and offers powerful tools, libraries, and extensions to create complex, production-ready apps.`,
  Django: `Django is a high-level, open-source web framework for Python that encourages rapid development and clean, pragmatic design. With its built-in features like an ORM, authentication, and routing, Django helps developers create secure, scalable web applications quickly, making it a popular choice for building complex, data-driven websites.`,
  FastAPI: `FastAPI is a modern, high-performance web framework for building APIs with Python. It is designed to be fast, easy to use, and scalable, with automatic generation of interactive documentation. FastAPI is built on top of Python's type hints, offering strong data validation and performance comparable to Go and Node.js, making it ideal for creating fast and efficient APIs.`,
  TypeScript: `TypeScript is a programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language. It is designed for the development of large applications and transpiles to JavaScript.`,
  Remix: `Remix is a full stack web framework that lets you focus on the user interface and work back through web standards to deliver a fast, slick, and resilient user experience. People are gonna love using your stuff.`,
  React: `React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta and a community of individual developers and companies.`,
  "Node.js": `Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.`,
  BootstrapCSS: `Bootstrap is a powerful front-end framework that provides pre-built, responsive, and customizable components. It enables developers to quickly build websites and applications with a consistent design and layout.`,
  TailwindCSS: `TailwindCSS is a framework like no other. Rather than constraining you to a set design, it gives you the tools and the standardization to build exactly what you want.`,
  DevOps: `Working on small(er) teams has allowed me to venture out of my comfort zone and into fields like DevOps. The opportunity to impact the Developer experience every step of the way has been incredibly rewarding.`,
  Javascript: `I've been using Javascript for quite a bit now, and I've only continued to find myself more excited about the language and accelerated growth it has seen.`,
  Java: `Java is a widely-used, object-oriented programming language known for its platform independence and portability. With the 'write once, run anywhere' philosophy, Java allows developers to create robust, secure, and scalable applications for a variety of platforms, from mobile devices to enterprise-level systems.`,
  SpringBoot: `Spring Boot is a Java-based framework used to create stand-alone, production-grade Spring applications. It simplifies the setup and configuration of Spring-based applications, offering pre-configured templates and tools to quickly develop and deploy microservices and enterprise-level applications with minimal effort. Spring Boot helps developers focus on writing business logic while managing complex configurations behind the scenes.`,
  GitHub: `GitHub is a platform for version control and collaboration that allows developers to store, manage, and share code. Built around Git, it enables teams to work together on software projects, track changes, and contribute through pull requests, making it an essential tool for modern software development and open-source projects.`,
  C: `C is a general-purpose, procedural programming language that has influenced many modern languages. Known for its efficiency and low-level memory access, C is commonly used for system programming, embedded systems, and developing performance-critical applications. Its simplicity and control over hardware make it a foundational language in computer science.`,
  "C#": `C# is a modern, object-oriented programming language developed by Microsoft as part of the .NET framework. Known for its ease of use and versatility, C# is used for developing a wide range of applications, from web and desktop software to mobile apps and games. With a rich set of libraries and tools, C# offers robust features for both enterprise and consumer-level software development.`,
  Unity: `Unity is a powerful, cross-platform game development engine that allows developers to create 2D, 3D, augmented reality (AR), and virtual reality (VR) experiences. With a user-friendly interface and support for various platforms, Unity is widely used for creating interactive games, simulations, and multimedia applications, making it a top choice for both beginners and professionals in the gaming industry.`
};
export const data: Record<string, string> = {};

async function fetchSkills(
  setSkills: (skills: Record<string, string>) => void,
  existingSkills: Record<string, string>
) {
  try {
    const response = await axios.get(`${BACKEND_BASE_URL}/skills`);
    const skills = response.data;
    const skillsData: Record<string, string> = {};
    skills.forEach((skill: { skill: string; description: string }) => {
      skillsData[skill.skill] = skill.description;
    });

    // Compare existing skills with fetched skills
    const hasChanged =
      Object.keys(skillsData).length !== Object.keys(existingSkills).length ||
      Object.entries(skillsData).some(
        ([key, value]) => existingSkills[key] !== value
      );

    if (hasChanged) {
      setSkills(skillsData);
    }
  } catch (error) {
    console.error('Error fetching skills:', error);
  }
}

export function useSkills() {
  const [skills, setSkills] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchSkills(setSkills, skills);
  }, [skills]);

  return skills;
}
