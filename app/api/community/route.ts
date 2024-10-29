import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
export async function POST(req: Request) {
    try {
        const user = await currentUser()
        if (!user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        const { name, url } = await req.json()
        if (!name || !url) {
            return NextResponse.json({ error: "Missing name or url" }, { status: 400 })
        }
        const lastCommunity = await db.community.findFirst({
            where: {
                userId: user.id
            },
            orderBy: {
                position: "desc",
            },
        })
        const position = lastCommunity ? lastCommunity.position + 1 : 1
        const community = await db.$transaction(async (tx) => {
            const community_0 = await tx.community.create({
                data: {
                    name,
                    url,
                    position,
                    userId: user.id,
                    type: "PUBLIC",
                    inviteCode: nanoid(5),
                    enableFeed: true,
                    enableGettingStarted: true
                },
                select: {
                    url: true,
                    id: true
                }
            })
            const spaceGroup = await tx.spaceGroup.create({
                data: {
                    name: "Get started",
                    communityId: community_0.id,
                    userId: user.id,
                    position: 0
                },
            });

            const spaces = await tx.space.createMany({
                data: [
                    {
                        name: "Start Here",
                        icon: "🏠",
                        spaceGroupId: spaceGroup.id,
                        userId: user.id,
                        communityId: community_0.id,
                        url: "start-here",
                        position: 0
                    },
                    {
                        name: "Say Hello",
                        icon: "🖐️",
                        spaceGroupId: spaceGroup.id,
                        userId: user.id,
                        communityId: community_0.id,
                        url: "say-hello",
                        position: 1
                    },
                    {
                        name: "Resources",
                        icon: "📚",
                        spaceGroupId: spaceGroup.id,
                        userId: user.id,
                        communityId: community_0.id,
                        url: "resources",
                        position: 2
                    },
                ],
            });
            const spaceIds = await tx.space.findMany({
                where: { spaceGroupId: spaceGroup.id },
                select: { id: true },
            });

            const memberData: any = spaceIds.map((space) => ({
                userId: user.id,
                spaceGroupId: spaceGroup.id,
                communityId: community_0.id,
                spaceId: space.id,
                type: "ADMIN",
            }));
            await tx.member.createMany({ data: memberData });
            return community_0
        })

        return NextResponse.json(community, { status: 200 })

    } catch (error) {

    }
}

export async function PUT(req: Request) {
    const user = await currentUser()
    if (!user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { list } = await req.json()

    for (let item of list) {
        await db.community.update({
            where: {
                id: item.id
            },
            data: {
                position: item.position
            }
        })
    }

    return NextResponse.json("Success", { status: 200 })
}