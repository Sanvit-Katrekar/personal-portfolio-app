import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { MetaFunction } from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

import { AppFooter } from "~/components/AppFooter";
import { BASE_URL } from "~/config/settings.server";
import { AppHeader } from "~/components/AppHeader";
import { AppHeaderMobile } from "~/components/AppHeaderMobile";
import {
  SITE_DESCRIPTION,
  SITE_SHARE_IMAGE,
  SITE_TITLE,
  SITE_URL,
} from "~/config/constants";
import { useIntro } from "~/hooks/useIntro";
import { usePageTracking } from "~/hooks/usePageTracking";

import styles from "~/styles/index.css";
import tailwind from "~/tailwind.css";

import clsx from "clsx"
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from "remix-themes"
 
import { themeSessionResolver } from "./sessions.server"
import { Toaster } from "~/components/ui/toaster";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwind },
    { rel: "stylesheet", href: styles },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request)
  return {
    theme: getTheme(),
  }
}


export const meta: MetaFunction = (args) => {
  return [
    {
      title: SITE_TITLE,
    },
    {
      name: "image",
      content: `${SITE_URL}${SITE_SHARE_IMAGE}`,
    }
    // ...getMetaData({
    //   canonical: args.data?.canonical,
    // })
  ];
};

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>()
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <App />
    </ThemeProvider>
  )
}

export function App() {
  // Hooks
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme()

  // Setup
  const favicon = "/favicon.ico";
  const manifest = "/manifest.json";

  // Life Cycle
  useIntro();
  usePageTracking();

  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <link href={favicon} rel="apple-touch-icon" sizes="48x48" />
        <link href={favicon} rel="favicon" />
        <link href={favicon} rel="icon" type="image/svg+xml" />
        <link href={favicon} rel="mask-icon" type="image/svg+xml" />
        <link href={manifest} rel="manifest" />

        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />

        <Links />
        <Meta />
      </head>
      <body>
        <AppHeader />
        <AppHeaderMobile />
        <main>
          <Toaster />
          <Outlet />
        </main>
        <AppFooter />

        {/* Remix */}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
