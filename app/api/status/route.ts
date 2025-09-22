import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const isUnderMaintenance = await prisma.configuration.findUnique({
    where: {
      id: "MainConfig",
    },
  });
  return NextResponse.json({ isUnderMaintenance });
}
