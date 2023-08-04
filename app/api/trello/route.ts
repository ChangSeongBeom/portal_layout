import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]/route";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { ToDoList } from "types/trello";

//* initial data
export async function GET(req: NextRequest, res: NextResponse) {
  console.log("GET /api/trello");

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log("requesting user", session.sub);

  const board = await prisma.toDoList.findMany({
    where: {
      ownerId: session.sub,
    },
    orderBy: { createdAt: "asc" },
    include: {
      ToDoCards: {
        orderBy: { order: "asc" },
      },
    },
  });
  console.log("trello", Object(board));
  return NextResponse.json(board);
}
