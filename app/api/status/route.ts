import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const config = await prisma.configuration.findUnique({
    where: {
      id: "MainConfig",
    },
  });
  const isUnderMaintenance = config?.is_under_maintenance || false;
  return NextResponse.json({ isUnderMaintenance });
}
