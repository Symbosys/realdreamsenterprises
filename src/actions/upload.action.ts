import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || "dv5yymidd",
  api_key: process.env.CLOUD_API_KEY || "891729624222638",
  api_secret: process.env.CLOUD_API_SECRET || "h9RcYUM1S5335c7Gz57sZK3QuNI",
  secure: true,
});

export function extractPublicIdFromUrl(url: string): string | null {
  if (!url || !url.includes("cloudinary.com")) return null;
  try {
    const parts = url.split("/upload/");
    if (parts.length < 2) return null;
    const pathAfterUpload = parts[1];
    const pathNoVersion = pathAfterUpload.replace(/^v\d+\//, "");
    const publicId = pathNoVersion.replace(/\.[^/.]+$/, "");
    return publicId;
  } catch (e) {
    return null;
  }
}

export async function uploadImageToCloudinary(base64OrUrl: string, folder?: string) {
  try {
    const uploadFolder = folder || process.env.CLOUD_FOLDER || "realdreams";
    const result = await cloudinary.uploader.upload(base64OrUrl, {
      folder: uploadFolder,
      resource_type: "auto",
    });

    return {
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error: any) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error(error.message || "Failed to upload image to Cloudinary");
  }
}

export async function deleteImageFromCloudinary(urlOrPublicId: string) {
  try {
    if (!urlOrPublicId) return { success: false };
    const publicId = extractPublicIdFromUrl(urlOrPublicId) || urlOrPublicId;
    if (!publicId || publicId.startsWith("/")) return { success: false };

    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Cloudinary Image Deleted:", publicId, result);
    return { success: true, result };
  } catch (error: any) {
    console.error("Cloudinary Delete Error:", error);
    return { success: false, error: error.message };
  }
}
