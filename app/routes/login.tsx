import { redirect, unstable_defineAction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { SessionContext } from "~/middleware/session";
import { db } from "~/services/database.server";

export default function Login() {
  return (
    <Form method="post">
      <main className="h-screen flex justify-center items-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Login</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              Sign in
            </Button>
          </CardFooter>
        </Card>
      </main>
    </Form>
  );
}

export const action = unstable_defineAction(async ({ request, context }) => {
  const formData = await request.formData();
  const username = formData.get("username")?.toString();
  if (!username) return null;
  const { id } = await db.user.upsert({
    where: { username },
    create: { username },
    update: {},
  });
  const session = context.get(SessionContext);
  session.set("userId", id);
  return redirect("/");
});
