const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpg", "image/jpeg"];

export function isImageValid(file: File) {
  const response = {
    success: false,
    message: "",
    file: file as File,
  };

  if (file.size > MAX_FILE_SIZE) {
    response.message = "Max file size is 5MB";
    return response;
  }

  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    response.message = "Image must be a PNG, JPG or JPEG";
    return response;
  }

  response.success = true;

  return response;
}
