export const SectionSoftware = () => {
  // Setup
  const linkProps = {
    className: "font-font-serif text-base text-color-copy-light",
    rel: "noreferrer",
    target: "_blank"
  };

  return (
    <section className="m-auto max-w-5xl px-4 py-20">
      <h2 className="mb-8 text-3xl">
        Software <span className="ml-2">👨‍💻</span>
      </h2>

      {/*
      <p>
        I am actually pleasantly surprised how small this list is... These
        programs are at the core of everything I do daily. While we can write
        code in in VIM or a text editor, life is just better with the right
        tools.
      </p>
      */}

      <div className="my-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-10">
        <div>
          <h3 className="my-4 text-xl">
            <a {...linkProps} href="https://code.visualstudio.com/insiders">
              <span className="mr-2">🧰</span> Visual Studio Code
            </a>
          </h3>
          <p>
            Is my editor of choice and I could not be happier! It 100% does
            everything I need it to and I am continuously impressed by the
            improvements I've seen to date.
          </p>
        </div>

        <div>
          <h3 className="my-4 text-xl">
            <a {...linkProps} href="https://iterm2.com/">
              <span className="mr-2">$</span> Iterm2 + ZSH/Powerlevel10k
            </a>
          </h3>
          <p>
            As far as terminal use goes, I use it heavily. Iterm2 is
            free and full of features I use and many that I don't even know
            exist. Tabs, split-view, fast and reliable.
          </p>
        </div>

        <div>
          <h3 className="my-4 text-xl">
            <a
              {...linkProps}
              href="https://www.docker.com/products/docker-desktop"
            >
              <span className="mr-2">📬</span> Postman
            </a>
          </h3>
          <p>
            At the core of the modern API development workflow is Postman. I can't
            begin to explain how nice it is to have a streamlined workflow for building/testing an API.
          </p>
        </div>

        <div>
          <h3 className="my-4 text-xl">
            <span className="mr-2">🎨</span>{" "}
            <a {...linkProps} href="https://www.figma.com/">
              Figma
            </a>
          </h3>
          <p>
            It's not that often that get to play designer but I do enjoy keeping
            up with the tools. Figma is available in the browser + app,
            incredibly fast, powerful, and FREE. I love it!
          </p>
        </div>
      </div>
    </section>
  );
};
