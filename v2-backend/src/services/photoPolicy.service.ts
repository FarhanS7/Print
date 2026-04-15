import vision from "@google-cloud/vision";
import dotenv from "dotenv";

dotenv.config();

export interface PhotoPolicyResult {
  valid: boolean;
  rejectionReasons: string[];
  warnings: string[];
  score: number; // 0-100
}

/**
 * Service for checking if a photo meets the eligibility policy for try-on.
 * Uses Google Vision API (free tier) to evaluate:
 * - Face detection (at least one face required)
 * - Person detection (full upper body visible)
 * - No extreme poses (lying down, etc.)
 * - Image quality score >= 30
 */
export class PhotoPolicyService {
  private static client: vision.ImageAnnotatorClient;

  /**
   * Initialize the Vision API client
   */
  private static getClient(): vision.ImageAnnotatorClient {
    if (!this.client) {
      const keyFilePath = process.env.GOOGLE_VISION_KEY_PATH;
      if (keyFilePath) {
        this.client = new vision.ImageAnnotatorClient({
          keyFilename: keyFilePath,
        });
      } else {
        this.client = new vision.ImageAnnotatorClient();
      }
    }
    return this.client;
  }

  /**
   * Evaluates the content of a photo for try-on suitability.
   * Uses Google Vision API to detect faces, persons, and assess image quality.
   */
  static async evaluate(fileUrl: string): Promise<PhotoPolicyResult> {
    try {
      const client = this.getClient();
      const rejectionReasons: string[] = [];
      const warnings: string[] = [];
      let score = 100;

      // Call Vision API with multiple features
      const [result] = await client.annotateImage({
        image: { source: { imageUri: fileUrl } },
        features: [
          { type: "FACE_DETECTION" },
          { type: "PERSON_DETECTION" },
          { type: "IMAGE_PROPERTIES" },
          { type: "SAFE_SEARCH_DETECTION" },
          { type: "OBJECT_LOCALIZATION" },
        ],
      });

      // 1. Face Detection Check
      const faces = result.faceAnnotations || [];
      if (faces.length === 0) {
        rejectionReasons.push(
          "No face detected in the image. A clear front-facing photo is required.",
        );
        score -= 30;
      } else if (faces.length > 1) {
        rejectionReasons.push(
          "Multiple faces detected. Please provide a photo with only one person.",
        );
        score -= 25;
      } else {
        const face = faces[0];
        // Check face confidence and visibility
        if ((face.detectionConfidence || 0) < 0.7) {
          warnings.push(
            "Face detection confidence is low. Please use a clearer photo.",
          );
          score -= 15;
        }

        // Check for extreme head poses
        const rollAngle = Math.abs(face.rollAngle || 0);
        const panAngle = Math.abs(face.panAngle || 0);
        const tiltAngle = Math.abs(face.tiltAngle || 0);

        if (rollAngle > 45 || panAngle > 60 || tiltAngle > 60) {
          rejectionReasons.push(
            "Head pose is too extreme. Please face the camera directly.",
          );
          score -= 25;
        }

        // Check face landmarks visibility
        const landmarks = face.landmarks || [];
        if (landmarks.length < 20) {
          warnings.push("Some facial features are not clearly visible.");
          score -= 10;
        }
      }

      // 2. Person Detection Check
      const persons =
        result.localizedObjectAnnotations?.filter(
          (obj: any) => obj.name?.toLowerCase() === "person",
        ) || [];

      if (persons.length === 0) {
        rejectionReasons.push(
          "No person detected. A full upper body photo is required.",
        );
        score -= 30;
      } else if (persons.length > 1) {
        warnings.push("Multiple people detected in the image.");
        score -= 15;
      } else {
        const person = persons[0];
        // Check if person bounding box is sufficiently large (upper body visible)
        const confidence = person.confidence || 0;
        if (confidence < 0.7) {
          warnings.push("Person detection confidence is low.");
          score -= 10;
        }

        // Estimate pose by checking bounding box height-to-width ratio
        const boundingPoly = person.boundingPoly;
        if (boundingPoly && boundingPoly.normalizedVertices) {
          const vertices = boundingPoly.normalizedVertices;
          let minX = 1,
            maxX = 0,
            minY = 1,
            maxY = 0;

          vertices.forEach((v: any) => {
            minX = Math.min(minX, v.x || 0);
            maxX = Math.max(maxX, v.x || 0);
            minY = Math.min(minY, v.y || 0);
            maxY = Math.max(maxY, v.y || 0);
          });

          const height = maxY - minY;
          const width = maxX - minX;
          const aspectRatio = height / width;

          // Very low aspect ratio suggests lying down or horizontal pose
          if (aspectRatio < 1.2) {
            rejectionReasons.push(
              "Person appears to be in a horizontal or lying-down pose. Please stand upright.",
            );
            score -= 30;
          }
        }
      }

      // 3. Safe Search Detection (content moderation)
      const safeSearch = result.safeSearchAnnotation;
      if (safeSearch) {
        const likelihood = safeSearch.adult;
        if (
          likelihood === "VERY_LIKELY" ||
          likelihood === "LIKELY" ||
          safeSearch.violence === "VERY_LIKELY"
        ) {
          rejectionReasons.push(
            "Image contains inappropriate content. Please provide a suitable photo.",
          );
          score -= 40;
        }
      }

      // 4. Image Quality Assessment
      const imageProperties = result.imagePropertiesAnnotation;
      let qualityScore = 70; // Base quality score

      if (imageProperties && imageProperties.dominantColors) {
        // Check color saturation/vibrancy (more dominant colors = better contrast)
        const dominantColorCount =
          imageProperties.dominantColors.colors?.length || 0;
        if (dominantColorCount < 2) {
          warnings.push("Image appears low contrast or monochromatic.");
          qualityScore -= 15;
        }
      }

      // Check image size/resolution
      if (result.imagePropertiesAnnotation) {
        // Estimate resolution quality (we don't have direct resolution from Vision API)
        // This is a proxy based on feature detection
        if (
          faces.length > 0 &&
          (!faces[0].landmarks || faces[0].landmarks.length < 15)
        ) {
          warnings.push(
            "Image resolution may be low. Please use a higher quality photo.",
          );
          qualityScore -= 20;
        }
      }

      score = Math.min(score, qualityScore);
      score = Math.max(score, 0);

      // Determine validity based on rejection reasons and score threshold
      const valid = rejectionReasons.length === 0 && score >= 30;

      return {
        valid,
        rejectionReasons,
        warnings,
        score: Math.round(score),
      };
    } catch (error) {
      console.error("Photo policy evaluation error:", error);

      // If Vision API fails, return a conservative result
      return {
        valid: false,
        rejectionReasons: [
          "Unable to evaluate photo quality. Please try again or contact support.",
        ],
        warnings: [],
        score: 0,
      };
    }
  }

  /**
   * Simple logic to determine if a score is acceptable.
   */
  static isAcceptable(result: PhotoPolicyResult): boolean {
    return result.valid && result.score >= 30;
  }

  /**
   * Batch evaluate multiple photos
   */
  static async evaluateBatch(fileUrls: string[]): Promise<PhotoPolicyResult[]> {
    return Promise.all(fileUrls.map((url) => this.evaluate(url)));
  }
}
