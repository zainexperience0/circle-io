"use client";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil, Settings, Trash } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ActionTooltip } from "@/components/ActionTooltip";
import LinkModal from "./LinkModel";
import { DeleteDialog } from "@/components/DeleteDialog";

interface Props {
  data: {
    communityId: string;
    id: string;
    position: number;
    url: string;
    title: string;
  }[];
  communityId: string | undefined;
}
export const Reorder = ({ data, communityId }: Props) => {
  const [links, setLinks] = useState(data);
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLinks(data);
  }, [data]);
  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.patch(`/api/community/${communityId}/link?action=reorder`, {
        list: updateData,
      });
      toast.success("Links reordered successfully.");
      router.refresh();
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Failed to reorder Links.");
    } finally {
      setIsUpdating(false);
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedLinks = items.slice(startIndex, endIndex + 1);

    setLinks(items);

    const bulkUpdateData = updatedLinks.map((link) => ({
      id: link.id,
      position: items.findIndex((item) => item.id === link.id),
    }));

    onReorder(bulkUpdateData);
  };

  const onDelete = async (id: string) => {
    try {
      setIsUpdating(true);
      await axios.patch(`/api/community/${communityId}/link?action=delete`, {
        id,
      });
      toast.success("Link deleted successfully.");
      router.refresh();
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete Link.");
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="danger" size="sm">
          <ActionTooltip label="Settings">
            <Settings className="mr-2 h-4 w-4" />
          </ActionTooltip>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="px-6">
        <SheetHeader>
          <SheetTitle>Community Links</SheetTitle>
        </SheetHeader>
        {isUpdating ? (
          <div className="h-[50vh] bg-slate-500/20 rounded-m flex items-center justify-center">
            <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
          </div>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="links">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {links.map((link, index) => (
                    <Draggable
                      key={link.id}
                      draggableId={link.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="flex items-center gap-x-2 bg-gray-200 border-gray-200 border text-gray-700 rounded-md mb-4 text-sm"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <div
                            className="px-2 py-3 border-r border-r-gray-200 hover:bg-gray-300 rounded-l-md transition"
                            {...provided.dragHandleProps}
                          >
                            <Grip className="h-5 w-5" />
                          </div>
                          {link.title}
                          <div className="ml-auto pr-2 flex items-center gap-x-2">
                            <LinkModal
                              initialData={link}
                              communityId={communityId}
                            >
                              <Button variant={"super"} size={"icon"}>
                                <ActionTooltip
                                  label={`Edit ${link.title}`}
                                  side="left"
                                >
                                  <Pencil className="w-4 h-4 cursor-pointer hover:opacity-75 transition" />
                                </ActionTooltip>
                              </Button>
                            </LinkModal>
                            <DeleteDialog
                            description="Are you sure you want to delete this link?"
                              title="Delete Link"
                              onAction={() => onDelete(link.id)}
                            >
                              <Button variant={"danger"} size={"icon"}>
                                <ActionTooltip
                                  label={`Delete ${link.title}`}
                                  side="right"
                                >
                                  <Trash className="w-4 h-4 cursor-pointer hover:opacity-75 transition" />
                                </ActionTooltip>
                              </Button>
                            </DeleteDialog>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </SheetContent>
    </Sheet>
  );
};
