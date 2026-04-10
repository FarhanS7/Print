/**
 * Input contract for any Try-On generation provider.
 */
export interface TryOnProviderInput {
  frontImageUrl: string;
  sideImageUrl?: string;
  backImageUrl?: string;
  garmentImageUrl: string;
  tryOnType: 'upper';
}

/**
 * Standardized output result from a Try-On provider.
 */
export interface TryOnProviderResult {
  requestId?: string;
  outputImageUrl: string;
  modelVersion?: string;
}

/**
 * Interface definition for Try-On providers.
 * Allows switching between fal.ai, Google, or proprietary models without changing business logic.
 */
export interface TryOnProvider {
  readonly name: string;
  generate(input: TryOnProviderInput): Promise<TryOnProviderResult>;
}
