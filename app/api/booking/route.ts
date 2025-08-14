import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  //   const passedApiKey = request.headers.get("x-api-key");
  //   if (passedApiKey !== process.env.API_KEY) {
  //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  //   }

  const body = await request.json();
  console.log("Hello", body.firstName);

  return NextResponse.json({ message: "Booking created successfully" });
}
