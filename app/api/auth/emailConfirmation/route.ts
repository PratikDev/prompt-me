import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";

const REDIRECT_TO = {
  FAILED: "http://localhost:3000/login",
  SUCCESS: "http://localhost:3000",
};

async function validateLink({
  userId,
  secret,
}: {
  userId: string;
  secret: string;
}) {
  try {
    const { account } = await import("@/appwrite/appwrite.config");
    await account.updateMagicURLSession(userId, secret);

    return NextResponse.redirect(REDIRECT_TO.SUCCESS);
  } catch (error) {
    return NextResponse.redirect(REDIRECT_TO.FAILED);
  }
}

export async function GET(request: NextRequest) {
  const { url } = request;
  const { searchParams } = new NextURL(url);

  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  if (!userId || !secret) {
    return NextResponse.redirect(REDIRECT_TO.FAILED);
  }

  const validationResponse = await validateLink({ userId, secret });

  return validationResponse;
}
