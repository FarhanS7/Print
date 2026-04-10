import cloudinary from "../config/cloudinary.config";

interface MockupOptions {
  mockupPublicId: string;
  artworkPublicId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  scale?: number;
}

/**
 * Generates a dynamic Cloudinary URL that overlays artwork onto a mockup.
 */
export const getMockupUrl = (options: MockupOptions) => {
  const { mockupPublicId, artworkPublicId, x, y, width, height } = options;

  return cloudinary.url(mockupPublicId, {
    transformation: [
      { overlay: artworkPublicId.replace(/\//g, ":") }, // Cloudinary overlay uses colon instead of slash for public IDs
      {
        width: Math.round(width),
        height: Math.round(height),
        crop: "fit",
      },
      {
        flags: "layer_apply",
        gravity: "north_west",
        x: Math.round(x),
        y: Math.round(y),
      },
    ],
    format: "webp",
    quality: "auto",
  });
};

/**
 * Helper to extract Cloudinary public ID from a URL
 */
export const getPublicIdFromUrl = (url: string): string => {
  const parts = url.split("/upload/");
  if (parts.length < 2) return "";
  
  return parts[1]
    .replace(/^v\d+\//, "") // remove version prefix e.g. v1773951553/
    .replace(/\.[^.]+$/, ""); // remove extension
};
