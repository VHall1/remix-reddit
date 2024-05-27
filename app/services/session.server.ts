import { createCookieSessionStorage } from "@remix-run/node";
import invariant from "tiny-invariant";

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

export const { commitSession, destroySession, getSession } =
  createCookieSessionStorage<SessionData>({
    cookie: {
      name: "remix-reddit__session",
      sameSite: "lax",
      path: "/",
      httpOnly: true,
      // 14 days
      maxAge: 60 * 60 * 24 * 14,
      secrets: [process.env.SESSION_SECRET],
      secure: process.env.NODE_ENV !== "development",
    },
  });
