import { CommunitySidebar } from "./_components/CommunitySidebar"

interface Props {
    params: {
        communityId: string
    }
    children: React.ReactNode
}

const layout = async ({ children }: Props) => {
 
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
<CommunitySidebar />
      </div>
      <main className="md:pl-[72px] h-full pt-[60px] flex ">
        <div className="flex-1">
        {children}
        </div>
        </main>
    </div>
  )
}

export default layout