import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const initialCommunity = async () => {
  const user = await currentUser();
  const community = await db.community.findFirst({
    where: {
      userId: user?.id,
    },
    select: {
      url: true,
    },
  });
  return community;
}

export const getCommunityByUrl = async (url: string) => {
  const user = await currentUser()
  if (!user?.id) {
    redirect('/auth/sign-in')
  }
  const community = await db.community.findUnique({
    where: {
      url
    }
  })
  return community
}

export const getCommunities = async () => {
  const user = await currentUser()
  if (!user?.id) {
    redirect('/auth/sign-in')
  }
  const communities = await db.community.findMany({
    where: {
      userId: user?.id
    },
    orderBy: {
      position: 'asc'
    },
    select: {
      id: true,
      url: true,
      name: true,
      position: true,
      logo: true
    }
  })
  return communities
}

export const getCommunityWithMemberRoles = async (url: string) => {
  const user = await currentUser()
  if (!user?.id) {
    redirect('/auth/sign-in')
  }
  const community = await db.community.findUnique({
    where: {
      url
    },
    include: {
      members: {
        include: {
          user: true
        }
      }
    }
  })

  const role = community?.members?.find(member => member.userId === user?.id)?.type
  return { community, role }
}

export const getCommunityForSidebar = async (id: string) => {
  const user = await currentUser()
  if (!user?.id) {
    redirect('/auth/sign-in')
  }

  const community = await db.community.findUnique({
    where: {
      id,
      userId: user?.id
    },
    select: {
      links: true,
      members: true
    }
  })

  return {
    links: community?.links,
    role: community?.members?.find(member => member.userId === user?.id)?.type
  }
}