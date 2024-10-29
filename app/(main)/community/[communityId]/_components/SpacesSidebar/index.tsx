import { getCommunityData } from "@/actions/community";
import { LinksAccordion } from "./LinksAccordion";
import { Plus, Video } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Actions } from "./Actions";
import { SpacesAccordion } from "./SpacesAccordion";
import { SpaceGroupModel } from "@/components/models/SpaceGroup";
import { ActionTooltip } from "@/components/ActionTooltip";
import { ReOrder } from "@/components/models/SpaceGroup/ReOrder";

interface Props {
  communityId: string;
}

export const SpacesSidebar = async ({ communityId }: Props) => {
  const { links, role, gettingStarted, feed, url, spaceGroups } =
    await getCommunityData(communityId);

  return (
    <div className="p-4 flex flex-col text-primary w-full border-r border-violet-500  py-6 gap-y-5 h-full justify-between">
      <ScrollArea className="flex-1">
        <Actions
          role={role!}
          gettingStarted={gettingStarted!}
          feed={feed!}
          communityUrl={url!}
        />
        <SpacesAccordion
          communityId={communityId}
          spacesGroups={spaceGroups!}
          communityUrl={url!}
          role={role!}
        />
        {(role === "ADMIN" || role === "MODERATOR") && (
          <div className="flex items-center mt-5">
            <span className="text-sm font-bold text-neutral-700">
              SpaceGroups
            </span>
            <div className="flex-1 justify-end ml-auto space-x-2">
              <SpaceGroupModel communityId={communityId}>
                <Button variant="superOutline" size="sm">
                  <ActionTooltip label="Add SpaceGroup">
                    <Plus className="h-4 w-4" />
                  </ActionTooltip>
                </Button>
              </SpaceGroupModel>
              {spaceGroups?.length !== 0 && (
                <ReOrder communityId={communityId} data={spaceGroups!} />
              )}
            </div>
          </div>
        )}
        <LinksAccordion data={links!} role={role!} communityId={communityId} />
      </ScrollArea>
      <Separator />
      {role === "ADMIN" && (
        <Button>
          <Video className="mr-2 h-4 w-4" />
          Go Live
        </Button>
      )}
    </div>
  );
};
