export const SectionEducation = () => {
  return (
    <section>
      <div>
        <h2 className="py-8 text-lg print:py-4 md:text-xl">Education</h2>
        <div className="mb-8 border-t border-solid border-color-border print:hidden" />
      </div>

      <h3>BITS Pilani, Dubai Campus</h3>
      <h4 className="font-normal">
        B.E. Computer Science Engineering{" "}
      </h4>

      <div className="mt-8">
        <p className="text-sm">
          Completed courses:
        </p>
      </div>
    <ul className="my-4 ml-4 list-disc text-sm font-light">
      <li className="my-1">C Programming</li>
      <li className="my-1">OOP with Java</li>
      <li className="my-1">Logic in CS</li>
      <li className="my-1">Discrete Structures in CS</li>
      <li className="my-1">Computer Architecture</li>
      <li className="my-1">Theory of Computation</li>
      <li className="my-1">Principles of Programming Languages</li>
      <li className="my-1">Operating Systems</li>
      <li className="my-1">Design and Analysis of Algorithms</li>
      <li className="my-1">Compiler Construction</li>
      <li className="my-1">Computer Networks</li>
      <li className="my-1">Data Mining</li>
      <li className="my-1">Neural Networks and Fuzzy Logic</li>
      <li className="my-1">Blockchain Technology</li>
    </ul>
    <div className="mt-8">
        <p className="text-sm">
          <b>CGPA:</b> 9.77
        </p>
      </div>
    </section>
  );
};
