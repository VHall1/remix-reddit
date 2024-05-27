import { serverOnly$ } from "vite-env-only/macros";
import { requireAuth } from "~/middleware/require-auth";

export const middleware = serverOnly$([requireAuth]);

export default function NewPost() {
  return <p>new post</p>;
}
