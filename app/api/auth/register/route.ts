import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id, password } = await req.json();
  const exists = await prisma.user2.findUnique({
    where: {
      id: id,
    },
  });
  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  } else {
    const user = await prisma.user2.create({
      data: {
        id,
        password: await hash(password, 10),
      },
    });
    return NextResponse.json(user);
  }
}
