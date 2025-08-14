import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("Hello", body.firstName);

  return NextResponse.json({ message: "Booking created successfully" });
}