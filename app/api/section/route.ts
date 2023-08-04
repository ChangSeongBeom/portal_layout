import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest, res: NextResponse) {
  console.log("GET /api/section");

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log("requesting user", session.sub);

  const sections = await prisma.section.findMany({
    orderBy: { createdAt: "asc" },
  });
  console.log("section", Object(sections));
  return NextResponse.json(sections);
}
