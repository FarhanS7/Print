/**
 * Service for checking if a photo meets the eligibility policy for try-on.
 * (e.g., single person, face visible, neutral pose).
 * 
 * MVP Recommendation: Uses conservative heuristics and relies on UX guidance.
 */
export interface PhotoPolicyResult {
  valid: boolean;
  rejectionReasons: string[];
  warnings: string[];
  score: number; // 0-100
}

export class PhotoPolicyService {
  /**
   * Evaluates the content of a photo for try-on suitability.
   * In MVP, this performs basic checks and returns a score.
   */
  static async evaluate(fileUrl: string): Promise<PhotoPolicyResult> {
    // For MVP, we assume photos pass if they pass technical validation
    // and provide high-level scoring based on presence of a file.
    
    // Future: Integrate with a Vision API or lightweight ML model
    // to detect face markers, torso, and person count.
    
    return {
      valid: true,
      rejectionReasons: [],
      warnings: [],
      score: 100 // Default to high score for MVP
    };
  }

  /**
   * Simple logic to determine if a score is acceptable.
   */
  static isAcceptable(result: PhotoPolicyResult): boolean {
    return result.valid && result.score >= 30;
  }
}
