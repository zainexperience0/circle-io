"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { CheckCircle, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
  communityId: string | undefined;
  initialData?: {
    id: string;
    name: string;
  };
}

export const SpaceGroupModel = ({
  communityId,
  children,
  initialData,
}: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    name: initialData?.name || "",
    loading: false,
    error: false,
    success: false,
  });

  const onSubmit = async () => {
    setState((prev) => ({ ...prev, loading: true, error: false }));

    try {
      if (initialData) {
        // Edit existing link (PUT request)
        await axios.patch(
          `/api/community/${communityId}/spaceGroup?action=edit`,
          {
            id: initialData.id,
            name: state.name,
          }
        );
      } else {
        // Create new link (POST request)
        await axios.post(`/api/community/${communityId}/spaceGroup`, {
          name: state.name,
        });
      }

      setState((prev) => ({
        ...prev,
        loading: false,
        success: true,
        fields: { title: "", url: "" },
      }));

      setTimeout(() => {
        setOpen(false);
        router.refresh();
        setState((prev) => ({
          ...prev,
          success: false,
          error: false,
          loading: false,
        }));
      }, 2000);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: true,
      }));
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, name: e.target.value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {initialData ? "Edit SpaceGroup" : "Add SpaceGroup"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input
              name="name"
              value={state.name}
              onChange={handleChange}
              placeholder="Keep this under 20 characters."
              maxLength={20}
            />
          </div>
        </div>
        <Button
          onClick={onSubmit}
          disabled={state.loading || state.success || state.error}
          className="w-full"
          variant={"super"}
        >
          {state.loading ? (
            <>
              <Loader className="h-4 w-4 mr-2 animate-spin" />
              {initialData ? "Updating..." : "Creating..."}
            </>
          ) : state.success ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              {initialData ? "SpaceGroup updated!" : "SpaceGroup created!"}
            </>
          ) : state.error ? (
            "Failed to create!"
          ) : initialData ? (
            "Update"
          ) : (
            "Create"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
