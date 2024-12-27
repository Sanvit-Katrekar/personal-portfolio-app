import { createCookieSessionStorage } from "@remix-run/node";
import { createThemeSessionResolver } from "remix-themes";

const isProduction = process.env.NODE_ENV === "production";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: ["s3cr3t"],
  },
});

export const themeSessionResolver = createThemeSessionResolver(sessionStorage);

const authSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: ["s3cr3t"],
    secure: isProduction,
  },
});

export const { getSession, commitSession, destroySession } = authSessionStorage;