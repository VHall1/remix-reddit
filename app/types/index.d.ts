import type { ServerContext } from "remix-create-express-app/context";

declare global {
  type SessionData = {
    userId: string;
  };
}

declare module "@remix-run/server-runtime" {
  export interface AppLoadContext extends ServerContext {}
}

export {};
