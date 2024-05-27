import { redirect } from "@remix-run/node";
import { createContext } from "remix-create-express-app/context";
import { type MiddlewareFunctionArgs } from "remix-create-express-app/middleware";
import { getSession } from "~/services/session.server";

export const AuthContext = createContext<{ userId: string }>();

export async function requireAuth({
  request,
  context,
  next,
}: MiddlewareFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  if (!userId) {
    throw redirect("/login");
  }
  context.set(AuthContext, { userId });
  return next();
}
