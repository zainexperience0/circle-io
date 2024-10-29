"use client";

import { Button } from "@/components/ui/button";
import { MemberType } from "@prisma/client";
import { Layers3, ListChecks } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  role: MemberType;
  gettingStarted: boolean;
  feed: boolean;
  communityUrl: string;
}

export const Actions = ({
  role,
  gettingStarted,
  feed,
  communityUrl,
}: Props) => {
  const router = useRouter();
  const currentPath = usePathname();

  const isActive = (path: string) =>
    currentPath.includes(`/community/${communityUrl}/${path}`);
  return (
    <>
      <div className="w-full space-y-2">
        {role === "ADMIN" && gettingStarted && (
          <Button
            variant={isActive("getting-started") ? "sidebarOutline" : "sidebar"}
            className="w-full"
            onClick={() =>
              router.push(`/community/${communityUrl}/getting-started`)
            }
          >
            <ListChecks className="mr-2 h-4 w-4" />
            <span>Getting Started</span>
          </Button>
        )}
        {feed && (
          <Button
            variant={isActive("feed") ? "sidebarOutline" : "sidebar"}
            className="w-full justify-start"
            onClick={() => router.push(`/community/${communityUrl}/feed`)}
          >
            <Layers3 className="mr-2 h-4 w-4" />
            <span>Feed</span>
          </Button>
        )}
      </div>
    </>
  );
};
