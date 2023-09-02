import { NextResponse } from "next/server";

/**
 * #1. Check if pref.avatar already available
 * #2. If available, delete the old avatar
 * #3. Upload new avatar
 * #4. Update Pref Object with new avatar link
 */

async function deleteOldAvatar(userId: string) {
  const { storage } = await import("@/AppwriteServices");
  const { Bucket_ID } = await import("@/AppwriteServices/IDs");
  await storage.deleteFile(Bucket_ID, userId);
}

async function uploadAvatar(file: File, userId: string) {
  const { Permission, Role } = await import("appwrite");
  const { storage } = await import("@/AppwriteServices");
  const { Bucket_ID } = await import("@/AppwriteServices/IDs");

  await storage.createFile(Bucket_ID, userId, file, [
    Permission.delete(Role.user(userId)),
    Permission.update(Role.user(userId)),
    Permission.read(Role.any()),
  ]);
}

async function updatePref(userId: string) {
  const { Bucket_ID } = await import("@/AppwriteServices/IDs");
  const { AppwriteProject } = await import("@/AppwriteServices/config");
  const LINK = (width: number, height: number) =>
    `https://cloud.appwrite.io/v1/storage/buckets/${Bucket_ID}/files/${userId}/preview?width=${width}&height=${height}&project=${AppwriteProject}`;

  const bigAvatarLink = LINK(200, 200);
  const smallAvatarLink = LINK(50, 50);

  const { account } = await import("@/AppwriteServices");
  await account.updatePrefs({
    avatar: smallAvatarLink,
    avatarBig: bigAvatarLink,
  });
}

export async function POST(request: Request) {
  /*
  const data = await request.formData();

  const file = data.get("file");
  const userId = data.get("userId");
  const prefAvatarLinkAvailable = JSON.parse(
    (data.get("prefAvatarLinkAvailable") as string) ?? "10"
  );

  // check file validity
  const { isImageValid } = await import("@/lib/isImageValid");
  const isImageValidResponse = isImageValid(file as File);
  if (!isImageValidResponse.success) {
    return NextResponse.json(isImageValidResponse, { status: 400 });
  }

  if (typeof userId !== "string") {
    return NextResponse.json(
      { success: false, message: "Invalid User" },
      { status: 400 }
    );
  }

  if (typeof prefAvatarLinkAvailable !== "boolean") {
    return NextResponse.json(
      { success: false, message: "Invalid Request" },
      { status: 400 }
    );
  }

  if (prefAvatarLinkAvailable) {
    await deleteOldAvatar(userId);
  }

  await uploadAvatar(file as File, userId);

  await updatePref(userId);
  */

  return NextResponse.json(
    { success: false, message: "Avatar Upload is still under development" },
    { status: 500 }
  );
}
