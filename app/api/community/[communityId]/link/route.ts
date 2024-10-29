import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { communityId: string } }
) {
  const { title, url } = await request.json();

  if(!title || !url || !params.communityId) {
    return new NextResponse("Invalid user data", { status: 400 });
  }

  try {
        const link = await db.link.create({
          data: {
            title,
            url,
            communityId: params.communityId
          }
        })

        return NextResponse.json(link, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}