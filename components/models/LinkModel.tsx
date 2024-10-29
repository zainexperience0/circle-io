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
import { useParams, useRouter } from "next/navigation";
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
    fields: {
      title: "",
      url: "",
    },
    loading: false,
    error: false,
    success: false,
  });

  const onSubmit = async () => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
      error: false, // Reset error before submission
    }));

    try {
      const res = await axios.post(
        `/api/community/${communityId}/link`,
        {
          title: state.fields.title,
          url: state.fields.url,
        }
      );

      setState((prevState) => ({
        ...prevState,
        loading: false,
        success: true,
      }));

      setTimeout(() => {
        setOpen(false);
        router.refresh();
      }, 2000);
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: true,
      }));
      console.log(error);
    }
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
              value={state.fields.title}
              onChange={(e) =>
                setState({
                  ...state,
                  fields: { ...state.fields, title: e.target.value },
                })
              }
              placeholder="Keep this under 20 characters."
              maxLength={20}
            />
          </div>
          <div className="grid gap-2">
            <Label>Link URL</Label>
            <Input
              value={state.fields.url}
              onChange={(e) =>
                setState({
                  ...state,
                  fields: { ...state.fields, url: e.target.value },
                })
              }
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
          {state.success && `Link created!`}
          {state.error && "Failed to create!"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}