import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { createPost } = await import("@/schema/schema");
    const schemaParseResponse = createPost.safeParse(body);

    if (!schemaParseResponse.success) {
      const message = schemaParseResponse.error.issues[0].message;
      return NextResponse.json({ success: false, message }, { status: 400 });
    }

    const data = schemaParseResponse.data;

    const { database, ID, Permission, Role } = await import(
      "@/AppwriteServices"
    );
    const { Database_ID, Prompt_Collection_ID } = await import(
      "@/AppwriteServices/IDs"
    );

    const post = await database.createDocument(
      Database_ID,
      Prompt_Collection_ID,
      ID.unique(),
      data,
      [
        Permission.update(Role.user(data.createdBy)),
        Permission.delete(Role.user(data.createdBy)),
      ]
    );

    return NextResponse.json(
      { success: true, message: "Post created successfully", post },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again" },
      { status: 500 }
    );
  }
}
