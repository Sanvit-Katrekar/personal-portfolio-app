export const SectionHardware = () => {
  // Setup
  const laptop = `https://support.apple.com/en-ae/111869`;
  const desk = `https://navoergonomics.com/navodesk/standing-desk/height-adjustable-smart-standing-desk`;

  const linkProps = {
    rel: "noreferrer",
    target: "_blank"
  };

  // Styles
  const cssHardware = `flex gap-4 items-center justify-center flex-1 rounded-md border border-solid border-color-border bg-color-background-light px-4 py-8`;

  return (
    <section className="m-auto max-w-6xl py-20 px-4 md:my-10">
      <h2 className="pb-8 text-3xl">
        Hardware <span className="ml-2">💻</span>
      </h2>
      <p>
        I've been happily grinding on my Mac over the 3+ years, and I love it.
        Never experienced any Mac issues ever, best OS ever. Windows gang, it's time you guys buy a Mac.
        (Suffer my pain)
      </p>

      {/*
      <div className="my-10 grid grid-cols-3 gap-4">
        <div className={cssHardware}>
          <h2 className="text-xl text-color-copy-dark">Laptop</h2>
        </div>
        <div className={cssHardware}>
          <h2 className="text-xl text-color-copy-dark">Monitor</h2>
        </div>
        <div className={cssHardware}>
          <h2 className="text-xl text-color-copy-dark">Desk</h2>
        </div>
        <div className={cssHardware}>
          <h2 className="text-xl text-color-copy-dark">Peripherals</h2>
        </div>
        <div className={cssHardware}>
          <h2 className="text-xl text-color-copy-dark">Storage</h2>
        </div>
      </div>
      */}

      <ul className="my-10 list-disc columns-1 pl-4 md:columns-2 lg:columns-3">
        <li>
          Laptop -{" "}
          <a {...linkProps} href={laptop}>
            MacBook Pro 13"
          </a>
        </li>
        <li className="ml-4">M2 Pro with 8GB of RAM</li>
        <li>
          Desk -{" "}
          <a {...linkProps} href={desk}>
            Adjustable height Desk
          </a>
        </li>
      </ul>
    </section>
  );
};
