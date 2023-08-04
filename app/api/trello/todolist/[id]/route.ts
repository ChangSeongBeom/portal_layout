import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { CreateToDoListDTO } from "types/trello";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const body: CreateToDoListDTO = await req.json();
  console.log("POST /api/trello/todolist body:", body);
  const userId = (
    await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    })
  ).sub;

  const result = await prisma.toDoList.upsert({
    where: {
      id: body.id,
    },
    update: {
      title: body.title,
    },
    create: {
      title: body.title,
      ownerId: userId,
      id: body.id,
    },
    include: { ToDoCards: true },
  });
  console.log(result);

  return NextResponse.json(result);
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
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
    orderBy: { createdAt: "desc" },
    include: { ToDoCards: true },
  });
  console.log("board", Object(board));

  return NextResponse.json(board);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const listId = params.id;
  console.log("listid", listId);
  await prisma.toDoList.delete({
    where: {
      id: listId,
    },
  });

  return NextResponse.json({ message: "success" });
}
