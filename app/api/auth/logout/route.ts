import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  let status = 500;
  let response = {
    success: false,
    message: "Something went wrong. Please reload the page and try again",
  };

  try {
    const { account, AppwriteProject } = await import("@/AppwriteServices");
    await account.deleteSession("current");

    /* delete the server cookie, once logging out is completed by appwrite */
    const { cookies } = await import("next/headers");

    const sessionNames = [
      `a_session_${AppwriteProject.toLowerCase()}`,
      `a_session_${AppwriteProject.toLowerCase()}_legacy`,
    ];

    const cookieStore = cookies();
    const hash = [
      cookieStore.get(sessionNames[0]),
      cookieStore.get(sessionNames[1]),
    ];

    // delete the cookies
    hash.forEach((cookie) => {
      /*
        check the cookie existence.
        it might be like your friends. (doesn't exist)
      */
      if (cookie) cookieStore.delete(cookie.name);
    });

    status = 200;
    response.success = true;
    response.message = "Logged out successfully";

    return NextResponse.json(response, { status });
  } catch (error) {
    console.log(error);

    return NextResponse.json(response, { status });
  }
}
