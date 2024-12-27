import classnames from "classnames";
import { useState, useEffect } from "react";

/**
 * @name SectionTechnology
 * @description Section with pills that toggles a bit more information
 */
import { useLoaderData } from '@remix-run/react';
import axios from 'axios';
import { API_CALL_REFRESH_DURATION, BACKEND_BASE_URL } from "~/config/constants";

export const SectionTechnology = () => {
  const initialSkills = useLoaderData(); // Get data from the loader
  const [skills, setSkills] = useState<Record<string, string>>(initialSkills as Record<string, string>);
  const [heading, setHeading] = useState<string>();
  
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(`${BACKEND_BASE_URL}/skills`);
        const fetchedSkills = response.data.reduce((acc: Record<string, string>, skill: { skill: string; description: string }) => {
          acc[skill.skill] = skill.description;
          return acc;
        }, {});

        // Check if skills have changed before updating state
        const hasChanged =
          Object.keys(fetchedSkills).length !== Object.keys(skills).length ||
          Object.entries(fetchedSkills).some(([key, value]) => skills[key] !== value);

        if (hasChanged) {
          setSkills(fetchedSkills);
        }
      } catch (error) {
        console.error('Error refetching skills:', error);
      }
    }, API_CALL_REFRESH_DURATION); // Refetch every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [skills]);

  const description = heading ? skills[heading] : skills.default;
  const keys = Object.keys(skills).filter((key) => key !== "default");

  return (
    <div className="mx-20 flex max-w-6xl flex-col gap-10 px-4 md:flex-row md:py-20 lg:mx-auto">
      <div className="basis-2/5">
        <h2 className="mb-8 text-xl md:text-3xl">
          Technologies
        </h2>

        <div className="work-details flex flex-wrap gap-2">
          {keys.map((key) => {
            const active = key === heading;
            return (
              <button
                className={classnames(`rounded-md px-2 py-1 text-sm hover:custom-bg-gradient active:custom-bg-gradient hover:bg-color-white active:bg-color-white`, {
                  active
                })}
                key={key}
                onClick={(e) => {
                  const newValue = heading === key ? undefined : key;
                  setHeading(newValue);
                  const button = e.currentTarget;
                  if (button.classList.contains("custom-bg-gradient")) {
                    button.classList.remove("custom-bg-gradient");
                  } else {
                    button.classList.add("custom-bg-gradient");
                  }
                }}
                type="button"
              >
                {key}
              </button>
            );
          })}
        </div>
      </div>

      <blockquote
        className="my-8 basis-3/5 text-xl font-light leading-relaxed"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};
