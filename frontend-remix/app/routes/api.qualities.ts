import type { LoaderFunction } from "@remix-run/node";

const qualities = [
  "Software Engineer 🧑‍💻",
  "A problem solver 🧩",
  "A creative thinker 🤔",
  "A team player 🤝",
  "An innovator 💡",
  "A perpetual learner 📚"
];

export const loader: LoaderFunction = async (_args) => {
  return getQuote();
};

export const getQuote = (value?: string): string => {
  const random = Math.floor(Math.random() * qualities.length);
  const quote = qualities[random];

  if (quote === value) return getQuote(value);

  return qualities[random];
};
