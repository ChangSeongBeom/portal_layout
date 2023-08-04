import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import {
  CreateToDoCardDTO,
  CreateToDoListDTO,
  UpdateToDoCardDTO,
} from "types/trello";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const body: CreateToDoCardDTO = await req.json();
  console.log("POST /api/trello/todocard body:", body);
  const userId = (
    await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    })
  ).sub;

  const result = await prisma.toDoCard.upsert({
    where: {
      id: body.id,
    },
    update: {
      title: body.title,
      description: body.description,
      listId: body.listId,
      order: body.order,
    },
    create: {
      id: body.id,
      title: body.title,
      listId: body.listId,
      description: body.description,
      order: body.order,
    },
  });
  console.log(result);

  return NextResponse.json(result);
}

export async function PATCH(req: NextRequest, res: NextApiResponse) {
  const body: UpdateToDoCardDTO = await req.json();
  console.log("PATCH /api/trello/todocard body:", body);
  const userId = (
    await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    })
  ).sub;

  const result = await prisma.toDoCard.update({
    where: {
      id: body.id,
    },
    data: body,
  });
  console.log(result);

  return NextResponse.json(result);
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log("GET /api/trello/todocard");

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
  console.log("DELETE /api/trello/todocard params:", params);
  const cardId = params.id;
  await prisma.toDoCard.delete({
    where: {
      id: cardId,
    },
  });

  return NextResponse.json({ message: "success" });
}
