"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Community, MemberType } from "@prisma/client";
import {
  BadgeDollarSign,
  Blocks,
  ChartNoAxesCombined,
  ChevronDown,
  CreditCard,
  DollarSign,
  ReceiptTextIcon,
  Settings,
  ShieldCheck,
  SquarePlay,
  Tv2,
  Users,
  Zap,
} from "lucide-react";

interface NavbarProps {
  community: Community | null;
  role: MemberType;
}
export const Actions = ({ community, role }: NavbarProps) => {
  return (
    <>
      {role === "ADMIN" ? (
        <Popover>
          <PopoverTrigger className="flex items-center gap-2">
            <h1 className="md:text-xl text-md font-semibold">
              {community?.name}&apos;s Community
            </h1>
            <ChevronDown className="ml-2 h-4 w-4" />
          </PopoverTrigger>
          <PopoverContent className="w-56">
            <div className="space-y-2">
              <div className="space-y-1">
                <ActionItem
                  icon={<Users className="mr-2 h-4 w-4" />}
                  label="Audience"
                />
                <ActionItem
                  icon={<ReceiptTextIcon className="mr-2 h-4 w-4" />}
                  label="Posts"
                />
                <ActionItem
                  icon={<Blocks className="mr-2 h-4 w-4" />}
                  label="Spaces"
                />
                <ActionItem
                  icon={<ShieldCheck className="mr-2 h-4 w-4" />}
                  label="Moderation"
                />
                <ActionItem
                  icon={<SquarePlay className="mr-2 h-4 w-4" />}
                  label="Live"
                />
                <ActionItem
                  icon={<Zap className="mr-2 h-4 w-4" />}
                  label="WorkFlows"
                />
                <ActionItem
                  icon={<DollarSign className="mr-2 h-4 w-4" />}
                  label="Paywalls"
                />
                <ActionItem
                  icon={<CreditCard className="mr-2 h-4 w-4" />}
                  label="Plans"
                />
                <ActionItem
                  icon={<ChartNoAxesCombined className="mr-2 h-4 w-4" />}
                  label="Analytics"
                />
                <ActionItem
                  icon={<BadgeDollarSign className="mr-2 h-4 w-4" />}
                  label="Affilates"
                />
                <ActionItem
                  icon={<Tv2 className="mr-2 h-4 w-4" />}
                  label="Site"
                />
                <ActionItem
                  icon={<Settings className="mr-2 h-4 w-4" />}
                  label="Settings"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <Button size={"sm"}>
          <h1 className="md:text-xl text-md font-semibold">
            {community?.name}&apos;s Community
          </h1>
        </Button>
      )}
    </>
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
