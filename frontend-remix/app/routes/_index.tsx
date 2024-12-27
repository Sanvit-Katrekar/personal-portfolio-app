import { json, type MetaFunction } from "@remix-run/react";
import * as React from "react";
import { AppHero } from "~/components/AppHero";
import { getQuote } from "~/routes/api.qualities";
import { BACKEND_BASE_URL, QUOTE_DURATION, SITE_AUTHOR, SITE_DESCRIPTION, SITE_TITLE } from "~/config/constants";
import { SectionCompanies } from "~/components/SectionCompanies";
import { SectionTechnology } from "~/components/SectionTechnology";
import { SectionAmbitions } from "~/components/SectionAmbitions";
// import { SectionFireworks } from "~/components/SectionFireworks";
// import { getMetaData } from "~/metadata";

import axios from 'axios';

export const meta: MetaFunction = (args) => {
  return [
    {
      title: `${SITE_TITLE}`,
    },
    {
      name: "description",
      content: SITE_DESCRIPTION,
    }

    // {
    //   name: "canonical",
    //   content: args.data?.canonical
    // }
    // ...getMetaData({
    //   canonical: args.parentsData?.root?.canonical,
    // })
  ];
};

export const loader = async () => {
  try {
    const response = await axios.get(`${BACKEND_BASE_URL}/skills`);
    const skills = response.data;
    const skillsData: Record<string, string> = {};
    skills.forEach((skill: { skill: string; description: string }) => {
      skillsData[skill.skill] = skill.description;
    });
    return new Response(JSON.stringify(skillsData), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error('Error fetching skills:', error);
    throw new Response('Failed to fetch skills', { status: 500 });
  }
};

export default function () {
  // Hooks
  const [heading, setHeading] = React.useState("Software Engineer 🧑‍💻");

  // Handlers
  React.useEffect(() => {
    let isMounted = true;

    const fetchQuote = async () => {
      const data = await getQuote(heading);
      if (isMounted) {
        setHeading(data);
      }
    };

    const intervalId = setInterval(fetchQuote, QUOTE_DURATION);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [heading]);

  const onClick = async () => {
    const data = await getQuote(heading);
    setHeading(data);
  };

  return (
    <>
      <div className="relative lg:h-screen">
        {/* <SectionFireworks /> */}
        <section className="relative z-0 m-auto flex max-w-6xl flex-col-reverse items-center justify-center gap-4 py-20 md:flex-row md:py-40">
          <AppHero
            className="py-10 md:py-20 md:text-right"
            copy={<span className="whitespace-nowrap">{heading}</span>}
            highlight={SITE_AUTHOR}
            tag="h1"
          />
          <div>
            <img
              alt={SITE_AUTHOR}
              className="custom-bg-gradient aspect-square max-h-32 cursor-pointer overflow-hidden rounded-full p-1 transition-transform hover:scale-110 active:rotate-6 md:max-h-40"
              height="auto"
              loading="eager"
              onClick={onClick}
              src="/images/assets/sanvit.jpeg"
              width="auto"
            />
          </div>
        </section>
      </div>
      <section className="border-0 border-b border-t border-solid border-color-border custom-bg-gradient px-8 py-20 text-color-background-light md:px-0">
        <blockquote className="mx-auto my-20 max-w-4xl text-2xl font-normal md:my-40 md:text-3xl">
          Passionate about <b>quality code</b>, building apps as far as my <b>imagination</b> can take me,
          and aiming for {" "}
          <b>perfection</b>.
        </blockquote>
      </section>
      <SectionAmbitions />
      <section className="bg-color-background-dark py-20 text-color-background-light">
        <SectionTechnology />
      </section>
      <SectionCompanies />
    </>
  );
}
