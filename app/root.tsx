import { unstable_defineLoader, type LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { serverOnly$ } from "vite-env-only/macros";
import { SessionContext, createSessionMiddleware } from "~/middleware/session";
import { sessionStorage } from "~/services/session.server";
import stylesheet from "~/styles/tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const middleware = serverOnly$([
  createSessionMiddleware(sessionStorage),
]);

export const loader = unstable_defineLoader(({ context }) => {
  const session = context.get(SessionContext);
  const userId = session.get("userId");
  return { userId };
});

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="dark" suppressHydrationWarning>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
