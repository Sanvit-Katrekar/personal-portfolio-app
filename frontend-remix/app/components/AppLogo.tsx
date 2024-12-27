import classnames from "classnames";

export interface AppLogoProps {
  className?: string;
  fill?: string;
  height?: number;
}

export const AppLogo = (props: AppLogoProps) => {
  return (
    <>
      <img src="/images/branding/logo.png" alt="Logo Light" className="block dark:hidden h-11 pointer-events-none" />
      <img src="/images/branding/logo-dark.png" alt="Logo Dark" className="hidden dark:block h-11 pointer-events-none" />
    </>
  );
};
