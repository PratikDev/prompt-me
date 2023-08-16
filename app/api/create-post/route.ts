import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { createPost } = await import("@/schema/schema");
  const schemaParseResponse = createPost.safeParse(body);

  if (!schemaParseResponse.success) {
    const message = schemaParseResponse.error.issues[0].message;
    return NextResponse.json({ success: false, message }, { status: 400 });
  }

  return NextResponse.json(
    { success: true, message: "Post created successfully" },
    { status: 200 }
  );
}
