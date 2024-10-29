import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { communityId: string } }
) {
  const { title, url } = await request.json();

  if (!title || !url || !params.communityId) {
    return new NextResponse("Invalid user data", { status: 400 });
  }
  const lastLink = await db.link.findFirst({
    where: {
      communityId: params.communityId
    },
    orderBy: {
      position: "desc"
    }
  })

  const position = lastLink ? lastLink.position + 1 : 1
  try {
    await db.link.create({
      data: {
        title,
        url,
        communityId: params.communityId,
        position
      },
    })

    return NextResponse.json("Success", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const url_0 = new URL(req.url)
  const action = url_0.searchParams.get("action")
  const user = await currentUser()
  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { list, id, title, url } = await req.json()
  if (action === "edit" && id) {
    console.log(id, title, url, list, action);

    const link = await db.link.update({
      where: {
        id
      },
      data: {
        title,
        url
      },
      select: {
        id: true
      }
    })

    return NextResponse.json(link, { status: 200 })
  } else if (list && action === "reorder") {
    for (let item of list) {
      await db.link.update({
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
    await db.link.delete({
      where: {
        id
      }
    })
    return NextResponse.json("Success", { status: 200 })
  }

  return NextResponse.json({ error: "Invalid user data" }, { status: 400 })
}