import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const email = body.email;

  return NextResponse.json(
    { email, message: "logged in successfully" },
    { status: 200 }
  );
}
