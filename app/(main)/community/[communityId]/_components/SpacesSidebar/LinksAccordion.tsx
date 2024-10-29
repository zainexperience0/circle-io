import { ActionTooltip } from "@/components/ActionTooltip";
import LinkModal from "@/components/models/Link/LinkModel";
import { Reorder } from "@/components/models/Link/Reorder";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MemberType, Link as PLink } from "@prisma/client";
import { ArrowUpRight, Plus, Settings } from "lucide-react";
import Link from "next/link";

interface Props {
  data: {
    communityId: string;
    id: string;
    position: number;
    url: string;
    title: string;
}[] | undefined ;
  role: MemberType;
  communityId: string;
}
export const LinksAccordion = ({ data, role, communityId }: Props) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline">
          <h1 className="text-sm font-medium">Links</h1>
        </AccordionTrigger>
        <AccordionContent className="pt-1 text-neutral-700">
          {data?.map((link) => (
            <Link href={link.url} key={link.id} target="_blank">
              <Button
                variant={"primaryOutline"}
                size="sm"
                className="w-full font-normal justify-start pl-10 mb-1"
              >
                <ArrowUpRight className="mr-2 h-4 w-4" />
                <h1 className="text-sm">{link.title}</h1>
              </Button>
            </Link>
          ))}
          {(role === "ADMIN" || role === "MODERATOR") && (
            <div className="flex items-center justify-between">
              <LinkModal communityId={communityId}>
                <Button variant="ghost" size="sm">
                  <ActionTooltip label="Add Link">
                    <Plus className="mr-2 h-4 w-4" />
                  </ActionTooltip>
                </Button>
              </LinkModal>
              <Reorder data={data!} communityId={communityId}/>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
