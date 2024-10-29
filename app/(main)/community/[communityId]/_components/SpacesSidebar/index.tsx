import { getCommunityData } from "@/actions/community"
import { LinksAccordion } from "./LinksAccordion"

interface Props{
    communityId: string
}

export const SpacesSidebar = async ({communityId}: Props) => {
  
  const {links, role} = await getCommunityData(communityId)
  
  return (
    <div className="p-4 flex flex-col text-primary w-full border-r border-violet-500  py-6 space-y-4 h-full justify-between">
        {<LinksAccordion data={links!} role={role!} communityId={communityId}/>}
        </div>
  )
}
