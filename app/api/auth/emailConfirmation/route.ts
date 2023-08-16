import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";
import * as setCookie from "set-cookie-parser";

const REDIRECT_TO = {
  FAILED: `${process.env.SSR_URL}/login`,
  SUCCESS: process.env.SSR_URL,
};

async function validateLink({
  userId,
  secret,
}: {
  userId: string;
  secret: string;
}) {
  try {
    const {
      updateMagicURLSession,
      SSRhostName: SHN,
      AppwriteHostname: AHN,
    } = await import("@/AppwriteServices");

    const response = await updateMagicURLSession({ userId, secret });

    const SSRhostName = SHN === "localhost" ? SHN : `.${SHN}`;

    const AppwriteHostname = AHN === "localhost" ? AHN : `.${AHN}`;

    const cookieString = (response.headers.get("set-cookie") ?? "").replaceAll(
      AppwriteHostname,
      SSRhostName
    );

    const cookiesArray = setCookie.splitCookiesString(cookieString);
    const cookiesParsed = cookiesArray.map((cookie: string) =>
      setCookie.parseString(cookie)
    );

    const { cookies } = await import("next/headers");

    const cookieStore = cookies();

    for (const cookie of cookiesParsed) {
      cookieStore.set(cookie.name, cookie.value, {
        domain: cookie.domain,
        secure: cookie.secure,
        sameSite: cookie.sameSite as any,
        path: cookie.path,
        maxAge: cookie.maxAge,
        httpOnly: cookie.httpOnly,
        expires: cookie.expires,
      });
    }

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
    console.log("No userId or secret found in the URL");
    return NextResponse.redirect(REDIRECT_TO.FAILED);
  }

  const validationResponse = await validateLink({ userId, secret });

  return validationResponse;
}
