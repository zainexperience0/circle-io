"use client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MemberType } from "@prisma/client";
import { Plus } from "lucide-react";
import { SpacesItem } from "./SpacesItem";
import { SpaceGroupModel } from "@/components/models/SpaceGroup";
import { ActionTooltip } from "@/components/ActionTooltip";
import { ReOrder } from "@/components/models/SpaceGroup/ReOrder";

interface Props {
  spacesGroups:
    | {
        id: string;
        name: string;
        position: number;
        spaces: {
          id: string;
          name: string;
          icon: string;
          url: string;
          position: number;
        }[];
      }[]
    | undefined;
  communityUrl: string;
  communityId: string;
  role: MemberType;
}

export const SpacesAccordion = ({
  spacesGroups,
  communityUrl,
  role,
  communityId,
}: Props) => {
  return (
    <>
      <Accordion type="single" collapsible className="mt-4">
        {spacesGroups?.map((group) => (
          <AccordionItem value="item-1" key={group.id}>
            <AccordionTrigger className="flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline">
              <h1 className="text-sm font-medium">{group.name}</h1>
            </AccordionTrigger>
            <SpacesItem
              spaces={group.spaces}
              communityUrl={communityUrl}
              role={role}
            />
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};
