import { useLocation } from "@remix-run/react";
import {
  SOCIAL_GITHUB,
  SOCIAL_LINKEDIN
} from "../config/constants";

export const AppFooter = () => {
  // Hooks
  const { pathname } = useLocation();

  // Setup
  const isResume = pathname.startsWith("/resume");

  // 🔌 Short Circuit
  if (isResume) return null;

  const imgSize = 32;
  return (
    <footer className="mt-10 justify-center gap-2 text-center text-sm print:hidden md:mt-20">
      <div className="m-auto flex justify-center gap-4">
        <a
          className="p-2"
          href={SOCIAL_LINKEDIN}
          target="_blank"
          rel="noreferrer"
        >
          <img
            alt="Follow me on LinkedIn"
            className="footer-social"
            height={imgSize}
            loading="lazy"
            src="/images/svg/linkedin-dark.svg"
            width={imgSize}
          />
        </a>
        <a
          className="p-2"
          href={SOCIAL_GITHUB}
          target="_blank"
          rel="noreferrer"
        >
          <img
            alt="Follow me on GitHub"
            className="footer-social"
            height={32}
            loading="lazy"
            src="/images/svg/github-dark.svg"
            width={32}
          />
        </a>
      </div>
    </footer>
  );
};
