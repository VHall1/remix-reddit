import { serverOnly$ } from "vite-env-only/macros";
import { Shell } from "~/components/shell";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { requireAuth } from "~/middleware/require-auth";

export default function NewPost() {
  return (
    <Shell className="py-6 container max-w-screen-lg">
      <Card>
        <CardContent className="py-6 grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" placeholder="Title" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Content (optional)"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Post</Button>
        </CardFooter>
      </Card>
    </Shell>
  );
}

export const middleware = serverOnly$([requireAuth]);

// need this loader here otherwise the middleware won't be called
export function loader() {
  return null;
}
