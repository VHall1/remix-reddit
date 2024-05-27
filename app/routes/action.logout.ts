import { unstable_defineAction } from "@remix-run/node";
import { SessionContext } from "~/middleware/session";

export const action = unstable_defineAction(({ context }) => {
  const session = context.get(SessionContext);
  session.unset("userId");
  return null;
});
