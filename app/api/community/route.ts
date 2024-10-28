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
                position: "desc"
            },
        })
        const position = lastCommunity ? lastCommunity.position + 1 : 1

        const community = await db.community.create({
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
                url: true
            }
        })
        return NextResponse.json(community, { status: 200 })

    } catch (error) {

    }
}

export async function PUT(req: Request) {
    const user = await currentUser()
    if(!user?.id){
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { list } = await req.json()

    for(let item of list){
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