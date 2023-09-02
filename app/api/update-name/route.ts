import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username } = await request.json();

  const { usernameSchema } = await import("@/schema/schema");
  const schemaResponse = usernameSchema.safeParse(username);

  if (!schemaResponse.success) {
    const message = schemaResponse.error.issues[0].message;
    return NextResponse.json({ success: false, message }, { status: 400 });
  }

  try {
    // Update the username in the database
    const { account } = await import("@/AppwriteServices");
    await account.updateName(schemaResponse.data);
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true, message: "Username updated successfully" },
    { status: 200 }
  );
}
