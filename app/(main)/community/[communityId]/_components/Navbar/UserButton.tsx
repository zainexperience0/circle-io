"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export const UserButton = () => {
  const user = useAuth();
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src={user?.image!} />
          <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <div className="space-y-2">
          <div className="space-y-1">
            <p className="text-sm font-medium">{user?.username}</p>
            <p className="text-sm  text-muted-foreground">{user?.email}</p>
          </div>
          <Separator />
          <Button
            variant={"danger"}
            className="w-full"
            onClick={() => signOut()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const ActionItem = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <button className="flex items-center w-full px-2 py-1 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
    {icon}
    <span>{label}</span>
  </button>
);
