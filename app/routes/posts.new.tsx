import { serverOnly$ } from "vite-env-only/macros";
import { Shell } from "~/components/shell";
import { requireAuth } from "~/middleware/require-auth";

export const middleware = serverOnly$([requireAuth]);

export default function NewPost() {
  return (
    <Shell>
      <p>new post</p>
    </Shell>
  );
}

export function loader() {
  return null;
}
