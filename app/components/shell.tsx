import { type ReactNode } from "react";
import { cn } from "~/utils/cn";
import { Button } from "./ui/button";

export function Shell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-2 flex h-14 items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="ml-auto">
          <Button>Log in</Button>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden md:block border-r w-[280px]">side</aside>
        <main className={cn("flex-1", className)}>{children}</main>
      </div>
    </div>
  );
}
