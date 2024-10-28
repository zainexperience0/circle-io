import { auth } from "@/next-auth"
import { useSession } from "next-auth/react"

export const currentUser = async () => {
    const session = await auth()
    return session?.user
}


export const useAuth = () => {
    const session = useSession()
    return session.data?.user
}