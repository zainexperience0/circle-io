import { getCommunityForSidebar } from "@/actions/community"
import { LinksAccordion } from "./LinksAccordion"

interface Props{
    communityId: string
}

export const SpacesSidebar = async ({communityId}: Props) => {
  
  const {links, role} = await getCommunityForSidebar(communityId)
  
  return (
    <div className="p-4 flex flex-col text-primary w-full dark:bg-[#1e1f22] py-6 space-y-4 h-full justify-between">
        {<LinksAccordion data={links!} role={role!}/>}
        </div>
  )
}
