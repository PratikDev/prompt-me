import { NextResponse } from "next/server";

async function sendEmail(email: string) {
  try {
    const { account } = await import("@/appwrite/appwrite.config");
    const { ID } = await import("appwrite");

    await account.createMagicURLSession(ID.unique(), email);

    return NextResponse.json(
      { success: true, message: "success" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  const { z } = await import("zod");
  const schema = z.object({
    email: z.string().email(),
  });

  const schemaParseResponse = schema.safeParse(body);

  if (!schemaParseResponse.success) {
    return NextResponse.json(
      { success: false, message: "Invalid Request" },
      { status: 400 }
    );
  }

  const { email } = schemaParseResponse.data;
  const response = await sendEmail(email);

  return response;
}
