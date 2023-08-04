import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { CreateSectionDTO } from "types/section";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const body: CreateSectionDTO = await req.json();
  console.log("POST /api/section/[id] body:", body);
  const userId = (
    await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    })
  ).sub;

  await prisma.section
    .upsert({
      where: {
        id: body.id,
      },
      update: {
        name: body.name,
      },
      create: {
        id: body.id,
        name: body.name,
      },
    })
    .then(async () => {
      body.LayoutItems.forEach(async (item) => {
        await prisma.layoutItem.upsert({
          where: {
            i: item.i,
          },
          update: {
            name: item.i,
            x: item.x,
            y: item.y,
            w: item.w,
            h: item.h,
            static: item.static,
            sectionId: body.id,
          },
          create: {
            i: item.i,
            name: item.i,
            x: item.x,
            y: item.y,
            w: item.w,
            h: item.h,
            static: item.static,
            sectionId: body.id,
          },
        });
      });
    });

  const result = await prisma.section.findUnique({
    where: {
      id: body.id,
    },
    include: {
      LayoutItems: true,
    },
  });
  console.log(result);

  return NextResponse.json(result);
}

export async function GET(
  req: NextApiRequest,
  { params }: { params: { id: string } },
  res: NextApiResponse
) {
  const sectionId = params.id;
  console.log("GET /api/section/[id]", sectionId);

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log("requesting user", session.sub);

  const section = await prisma.section.findUnique({
    where: {
      id: sectionId,
    },
    include: {
      LayoutItems: true,
    },
  });
  console.log("section", Object(section));

  return NextResponse.json(section);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const sectionId = params.id;
  console.log("DELETE /api/section/[id] ", sectionId);
  await prisma.section.delete({
    where: {
      id: sectionId,
    },
  });

  return NextResponse.json({ message: "success" });
}
