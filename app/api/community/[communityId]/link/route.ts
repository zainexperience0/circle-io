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

export async function PUT(req: Request) {
  const user = await currentUser()
  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { list } = await req.json()

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

}