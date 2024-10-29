import LinkModal from "@/components/models/LinkModel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link as PLink } from "@prisma/client";
import { ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";

interface Props {
  data: PLink[] | null;
  role: "ADMIN" | "MODERATOR" | "GUEST";
}
export const LinksAccordion = ({ data, role }: Props) => {
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
         {(role === "ADMIN" || role === "MODERATOR") && <LinkModal communityId={data?.[0].communityId}>
            <Button
              variant="ghost"
              size="sm"
              className="w-full font-normal justify-start mb-1 hover:bg-gray-200"
            >
              <Plus className="mr-2 h-4 w-4" />
              <h1 className="text-sm">Add Link</h1>
            </Button>
          </LinkModal>}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
