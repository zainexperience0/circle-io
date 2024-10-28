"use client";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowUpDown, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Props {
  data: {
    id: string;
    name: string;
    logo: string | null;
    position: number;
    url: string;
  }[];
}
export const Reorder = ({ data }: Props) => {
  const [communities, setCommunities] = useState(data);
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setCommunities(data);
  }, [data]);
  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put("/api/community", { list: updateData });
      toast.success("Communities reordered successfully.");
      router.refresh();
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Failed to reorder communities.");
    } finally {
      setIsUpdating(false);
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(communities);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedCommunities = items.slice(startIndex, endIndex + 1);

    setCommunities(items);

    const bulkUpdateData = updatedCommunities.map((community) => ({
      id: community.id,
      position: items.findIndex((item) => item.id === community.id),
    }));

    onReorder(bulkUpdateData);
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={"ghost"}>
          <ArrowUpDown className="group-hover:text-white transition" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="px-6">
        <SheetHeader>
          <SheetTitle>My Communities</SheetTitle>
        </SheetHeader>
        {isUpdating ? (
          <div className="h-[50vh] bg-slate-500/20 rounded-m flex items-center justify-center">
            <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
          </div>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="chapters">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {communities.map((community, index) => (
                    <Draggable
                      key={community.id}
                      draggableId={community.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className={`flex items-center gap-x-2 bg-gray-200 border-gray-200 border text-gray-700 rounded-md mb-4 text-sm                                       `}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <div
                            className={`px-2 py-3 border-r border-r-gray-200 hover:bg-gray-300 rounded-l-md transition
                                         
                                            `}
                            {...provided.dragHandleProps}
                          >
                            <Grip className="h-5 w-5" />
                          </div>
                          {community.name}
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
