import { AppwriteException } from "appwrite";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  let status = 500;
  let response = {
    success: false,
    message: "Internal Server Error",
  };

  try {
    const { account } = await import("@/AppwriteServices");
    await account.deleteSession("current");

    status = 200;
    response.success = true;
    response.message = "Logged out successfully";

    return NextResponse.json(response, { status });
  } catch (error) {
    console.log(error);

    if (error instanceof AppwriteException) {
      status = error.code;
      response.success = false;
      response.message = error.message;

      return NextResponse.json(response, { status });
    }

    return NextResponse.json(response, { status });
  }
}
