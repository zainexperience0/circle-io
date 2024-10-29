"use client";

import { MemberType } from "@prisma/client";
import { AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { ActionTooltip } from "@/components/ActionTooltip";
import { Plus } from "lucide-react";

interface SpacesItemProps {
  spaces: {
    id: string;
    name: string;
    icon: string;
    url: string;
    position: number;
  }[];
  communityUrl: string;
  role: MemberType;
}
export const SpacesItem = ({ spaces, communityUrl, role }: SpacesItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname.includes(`/community/${communityUrl}/c/${path}`);
  return (
    <AccordionContent className="pt-1">
      {spaces.map((space) => (
        <Button
          variant={isActive(space.url) ? "sidebarOutline" : "sidebar"}
          size={"sm"}
          className="w-full font-normal justify-start pl-5 mb-1"
          onClick={() =>
            router.push(`/community/${communityUrl}/c/${space.url}`)
          }
          key={space.id}
        >
          {space.icon}
          <span>{space.name}</span>
        </Button>
      ))}
      {(role === "ADMIN" || role === "MODERATOR") && (
        <Button variant="ghost" size="sm">
          <ActionTooltip label="Add Space">
            <Plus className="mr-2 h-4 w-4" />
          </ActionTooltip>
        </Button>
      )}
    </AccordionContent>
  );
};
