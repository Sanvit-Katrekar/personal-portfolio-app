export const SectionMisc = () => {
  return (
    <section className="m-auto max-w-6xl px-4 md:my-20">
      <div className="flex flex-col gap-10 md:flex-row">
        <div>
          <h2 className="mb-8 text-3xl">
            Miscellaneous <span className="ml-2">🧩</span>
          </h2>
          <p>
            Well, for fun I do a lot of random stuff.
            This includes grinding, solving Rubik's cubes, playing badminton,
            playing my OG Xbox 360 + Kinect console, procrastinating for no reason,
            waiting for the last day to start studying for exams, and more!
          </p>
        </div>
        <div className="flex flex-shrink-0 flex-wrap gap-4">
          <img
            className="aspect-square max-w-[47%] flex-grow"
            height="auto"
            loading="lazy"
            src="/images/assets/sanvit-on-grind.jpg"
            width={200}
          />
          <img
            className="aspect-square max-w-[47%] flex-grow"
            height="auto"
            loading="lazy"
            src="/images/assets/legend.png"
            width={200}
          />
          <img
            className="aspect-square flex-grow"
            height="auto"
            loading="lazy"
            src="/images/assets/sanvit-badminton.jpg"
            width={200}
          />
        </div>
      </div>
    </section>
  );
};
