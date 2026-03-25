import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      message: "Profile API is available without auth",
    },
    { status: 200 },
  );
}
