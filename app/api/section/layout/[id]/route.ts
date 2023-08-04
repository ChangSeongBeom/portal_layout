import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { CreateSectionDTO } from "types/section";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const sectionId = params.id;
  console.log("DELETE /api/section/[id] ", sectionId);
  await prisma.layoutItem.delete({
    where: {
      i: sectionId,
    },
  });

  return NextResponse.json({ message: "success" });
}
