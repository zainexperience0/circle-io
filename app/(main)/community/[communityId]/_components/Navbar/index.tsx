import { Community } from "@prisma/client"
import { Actions } from "./Actions"
import { getCommunityWithMemberRoles } from "@/actions/community"
import { UserButton } from "./UserButton"
import { SearchModal } from "./SearchModel"


interface NavbarProps {
    community_0: Community  | null
}
export const Navbar = async ({community_0}: NavbarProps) => {
  const {community, role} = await getCommunityWithMemberRoles(community_0?.url!)
  
  return (
    <div className="flex items-center justify-between  p-4">
        <Actions community={community} role={role!}/>
        <div className="flex items-center gap-2">
        <SearchModal />
        <UserButton />
        </div>
    </div>
  )
}
