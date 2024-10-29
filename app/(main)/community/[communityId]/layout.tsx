import { getCommunityByUrl } from "@/actions/community";
import { CommunitySidebar } from "./_components/CommunitySidebar";
import { redirect } from "next/navigation";
import { Navbar } from "./_components/Navbar";
import { SpacesSidebar } from "./_components/SpacesSidebar";

interface Props {
  params: {
    communityId: string;
  };
  children: React.ReactNode;
}

const layout = async ({ children, params }: Props) => {
  const community = await getCommunityByUrl(params.communityId);
  if (!community) {
    redirect("/community/create");
  }
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed">
        <CommunitySidebar />
      </div>
      <div className="fixed h-[60px] w-full border-b-2 border-violet-500 pl-[72px]">
        <Navbar community_0={community} />
      </div>
      <main className="md:pl-[72px] h-full pt-[60px] flex ">
      <div className="hidden md:flex h-full w-64 border-r-2 z-30 flex-col inset-y-0">
    <SpacesSidebar communityId={community.id} />
      </div>
      <div className="flex-1">{children}</div>
      </main>
    </div>
  );
};

export default layout;
