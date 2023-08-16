import { NextResponse } from "next/server";

const EMAIL_CONFIRMATION_ENDPOINT =
  "http://localhost:3000/api/auth/emailConfirmation";

async function sendEmail(email: string) {
  try {
    const { account } = await import("@/AppwriteServices");
    const { ID } = await import("appwrite");

    await account.createMagicURLSession(
      ID.unique(),
      email,
      EMAIL_CONFIRMATION_ENDPOINT
    );

    return NextResponse.json(
      { success: true, message: "success" },
      { status: 200 }
    );
  } catch (error) {
    const { AppwriteException } = await import("appwrite");

    if (error instanceof AppwriteException) {
      const { code: status, message } = error;
      return NextResponse.json({ success: false, message }, { status });
    }

    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  const { loginSchema } = await import("@/schema/schema");
  const schemaParseResponse = loginSchema.safeParse(body);

  if (!schemaParseResponse.success) {
    const message = schemaParseResponse.error.issues[0].message;
    return NextResponse.json({ success: false, message }, { status: 400 });
  }

  const { email } = schemaParseResponse.data;
  const response = await sendEmail(email);

  return response;
}
