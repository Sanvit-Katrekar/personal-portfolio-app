import type { MetaFunction } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { AppHero } from "~/components/AppHero";
import { PortfolioPreview } from "~/components/PortfolioPreview";
import { SITE_AUTHOR, SITE_TITLE } from "~/config/constants";

export const meta: MetaFunction = (args) => {
  return [
    {
      title: `Featured Work | ${SITE_TITLE}`,
    },
    {
      name: "description",
      content: `A collection of ramblings by ${SITE_AUTHOR}.`,
    },

    // ...getMetaData({
    //   canonical: args.parentsData?.root?.canonical,
    // })
  ];
};

/*
export default function () {
  // Hooks
  const data = useLoaderData<LoaderData>();

  // Setup
  const current = data.filter((node) => node.current);
  const recent = data.filter((node) => !node.current);

  return (
    <>
      <section>
        <div className="bg-color-background-dark text-color-background">
          <AppHero
            className="py-20 md:py-40"
            copy="Right now..."
            highlight="What I'm building"
            tag="h1"
          />
        </div>
        <div className="mx-auto md:max-w-6xl">
          <div className="my-20 grid grid-cols-1 gap-16 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {current.map((node) => (
              <PortfolioPreview current={true} data={node} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="border-0 border-b border-t border-color-border bg-color-background-light text-color-background-dark">
          <AppHero
            className="py-20 md:py-40"
            copy="In the past..."
            highlight="What I've built"
            tag="h2"
          />
        </div>
        <div className="mx-auto md:max-w-6xl">
          <div className="my-20 grid grid-cols-1 gap-16 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {recent.map((node) => (
              <PortfolioPreview current={false} data={node} key={node.slug} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
*/
const projects = [
  {
    title: "Project B7: Real time cards simulator",
    img: "/project-cards.png",
    description: `
    Real-time cards game using flask + sockets
    `
  },
  {
    title: "UniCMS",
    img: "/project-campus.png",
    description: `A Campus Management System using MySQL and Angular with ExpressJS

This project aims to create a simple campus management system that maintains:
Library,
Canteen,
Hostel,
Academics`,
  },
  {
    title: "Rearrange the Code Game",
    img: "/project-code.png",
    description: `Flask app for the Rearranging Code Lines game`
  }
];

export default function Portfolio() {
  return (
    <>
      <section>
        <div className="bg-color-background-dark text-color-background">
          <AppHero
            className="py-20 md:py-40"
            copy="Right now..."
            highlight="What I'm building"
            tag="h1"
          />
        </div>
        <div className="mx-auto md:max-w-6xl">
          <div className="my-20 grid grid-cols-1 gap-16 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {projects.map((project, index) => (
              <div key={index} className="work-preview text-color-copy">
                <img
                  alt={project.title}
                  className="w-full border transition-all hover:rotate-3 hover:scale-110 my-10"
                  src={project.img}
                />
                <h3 className="m-0 font-font-serif text-xl font-bold">
                  {project.title}
                </h3>
                <p>{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}