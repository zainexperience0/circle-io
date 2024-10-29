import { ActionTooltip } from "@/components/ActionTooltip";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUpDown, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Item } from "./Item";
import { Community } from "@prisma/client";
import { getCommunities } from "@/actions/community";
import { Separator } from "@/components/ui/separator";
import { Reorder } from "@/components/models/community/Reorder";

export const CommunitySidebar = async () => {
    const communuties = await getCommunities()
  return (
    <div className="space-y-4 px-2 flex flex-col h-full items-center w-full py-6 border-r-2 border-purple-300 bg-white">
      <ScrollArea className="w-full">
      {communuties.map((community) => (
          <Item
            id={community.id}
            key={community.id}
            name={community.name}
            url={community.url}
            logo={community.logo!}
          />
        ))}
      </ScrollArea>
     {communuties.length > 4 && <Reorder data={communuties}/>}
      <Separator />
      <ActionTooltip side="right" align="center" label="Add a community">
       <Button variant={"super"} size={"icon"}>
       <Link href="/community/create">
          <Plus className="group-hover:text-white transition" size={25} />
        </Link>
       </Button>
      </ActionTooltip>
    </div>
  );
};
