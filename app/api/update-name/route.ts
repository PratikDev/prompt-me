import { NextResponse } from "next/server";

export async function POST(request: Request) {
  return NextResponse.json(
    { success: false, message: "Username update failed" },
    { status: 500 }
  );
}
