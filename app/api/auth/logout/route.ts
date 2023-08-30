import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  let status = 500;
  let response = {
    success: false,
    message: "Something went wrong. Please reload the page and try again",
  };

  try {
    const { AppwriteServices } = await import("@/AppwriteServices");
    const appwriteServices = new AppwriteServices();

    await appwriteServices.logout();

    status = 200;
    response.success = true;
    response.message = "Logged out successfully";

    return NextResponse.json(response, { status });
  } catch (error) {
    console.log(error);

    return NextResponse.json(response, { status });
  }
}
