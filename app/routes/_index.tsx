import { Link, useLoaderData } from "@remix-run/react";
import { Shell } from "~/components/shell";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { db } from "~/services/database.server";
import { timeSince } from "~/utils/time";

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <Shell className="bg-accent pt-2 pb-6">
      <div className="container max-w-screen-lg">
        <div
          className="h-32 w-full rounded-lg bg-center bg-cover mb-4 border"
          style={{
            backgroundImage:
              "url('https://styles.redditmedia.com/t5_2savw/styles/bannerBackgroundImage_3e4vaale0qg41.jpg?format=pjpg&s=11eed5d0d926f002858a845d40cddc6609c8e2fc')",
          }}
        />
        <div className="grid gap-4">
          {posts.map((post) => (
            <Card key={`post-${post.id}`}>
              <CardHeader className="text-sm pb-0 mb-1">
                <span>
                  <Link to="#" className="font-medium">
                    {post.author.username}
                  </Link>{" "}
                  &bull;{" "}
                  <span
                    className="text-muted-foreground"
                    suppressHydrationWarning
                  >
                    {timeSince(new Date(post.createdAt))}{" "}
                  </span>
                </span>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-medium mb-2">{post.title}</div>
                <p className="leading-7">{post.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Shell>
  );
}

export async function loader() {
  const posts = await db.post.findMany({
    where: { published: true },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      author: { select: { username: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  });
  return { posts };
}
