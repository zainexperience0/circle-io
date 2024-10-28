"use client";

import { ActionTooltip } from "@/components/ActionTooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

interface NavigationItemProps {
  name: string;
  url: string;
  logo?: string;
  id: string
}
export const Item = ({ name, url, logo, id }: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();
  const isActive = params.communityId === url;
  return (
    <ActionTooltip side="right" align="center" label={name}>
      <div
        onClick={() => router.push(`/community/${url}/getting-started`)}
        className="flex justify-center items-center mt-4 group"
      >
        <Button variant={isActive ? "sidebarOutline" : "sidebar"} size={"icon"}>
          {logo ? (
            <Avatar>
              <AvatarImage src={logo} />
              <AvatarFallback />
            </Avatar>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-lg font-semibold">
                {name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </Button>
      </div>
    </ActionTooltip>
  );
};
