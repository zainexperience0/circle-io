import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
    request: Request,
    { params }: { params: { communityId: string } }
) {
    const user = await currentUser();
    if (!user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { name } = await request.json();

    if (!name || !params.communityId) {
        return new NextResponse("Invalid user data", { status: 400 });
    }
    const lastSpaceGroup = await db.spaceGroup.findFirst({
        where: {
            communityId: params.communityId
        },
        orderBy: {
            position: "desc"
        }
    })

    const position = lastSpaceGroup ? lastSpaceGroup.position + 1 : 0
    try {
        await db.spaceGroup.create({
            data: {
                name,
                communityId: params.communityId,
                position,
                userId: user?.id
            },
        })
        return NextResponse.json("Success", { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse(`Something went wrong ${error}`, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    const url_0 = new URL(req.url)
    const action = url_0.searchParams.get("action")
    const user = await currentUser()
    if (!user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { list, id, name, description } = await req.json()
    if (action === "edit" && id) {
        const link = await db.spaceGroup.update({
            where: {
                id
            },
            data: {
                name,
                description
            },
            select: {
                id: true
            }
        })

        return NextResponse.json(link, { status: 200 })
    } else if (list && action === "reorder") {
        for (let item of list) {
            await db.spaceGroup.update({
                where: {
                    id: item.id
                },
                data: {
                    position: item.position
                },
                select: {
                    id: true
                }
            })
        }

        return NextResponse.json("Success", { status: 200 })
    } else if (id && action === "delete") {
        await db.spaceGroup.delete({
            where: {
                id
            }
        })
        return NextResponse.json("Success", { status: 200 })
    }

    return NextResponse.json({ error: "Invalid user data" }, { status: 400 })
}