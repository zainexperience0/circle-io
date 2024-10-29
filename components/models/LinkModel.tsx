"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CheckCircle, Loader } from "lucide-react";

interface LinkModalProps {
  children: React.ReactNode;
  communityId: string | undefined;
}

export default function LinkModal({ children, communityId }: LinkModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    fields: { title: "", url: "" },
    loading: false,
    error: false,
    success: false,
  });

  const onSubmit = async () => {
    setState((prev) => ({ ...prev, loading: true, error: false }));

    try {
      await axios.post(`/api/community/${communityId}/link`, state.fields);

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
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      fields: { ...prev.fields, [name]: value },
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add link</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Link title</Label>
            <Input
              name="title"
              value={state.fields.title}
              onChange={handleChange}
              placeholder="Keep this under 20 characters."
              maxLength={20}
            />
          </div>
          <div className="grid gap-2">
            <Label>Link URL</Label>
            <Input
              name="url"
              value={state.fields.url}
              onChange={handleChange}
              placeholder="Links will open up in a new tab."
            />
          </div>
        </div>
        <Button
          onClick={onSubmit}
          disabled={state.loading || state.success}
          className="w-full"
          variant={"super"}
        >
          {state.loading && <Loader className="h-4 w-4 mr-2 animate-spin" />}
          {state.loading && "Creating..."}
          {!state.loading && !state.success && !state.error && "Submit"}
          {state.success && <CheckCircle className="h-4 w-4 mr-2" />}
          {state.success && "Link created!"}
          {state.error && "Failed to create!"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
