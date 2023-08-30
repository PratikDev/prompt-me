import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.formData();

  const file = data.get("file");
  const userId = data.get("userId");
  const prefAvatarLinkAvailable = data.get("prefAvatarLinkAvailable");

  console.log({
    userId,
    prefAvatarLinkAvailable,
    file,
  });

  return NextResponse.json(
    { success: false, message: "Avatar Upload is still under development" },
    { status: 500 }
  );
}
