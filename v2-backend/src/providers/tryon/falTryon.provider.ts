import { fal } from "@fal-ai/client";
import { TryOnProvider, TryOnProviderInput, TryOnProviderResult } from './tryonProvider.interface.js';
import { TryOnErrorCode, RetryableError } from '../../modules/tryon/tryon.errors.js';
import dotenv from 'dotenv';
dotenv.config();

export class FalTryOnProvider implements TryOnProvider {
  readonly name = 'fal';

  constructor() {
    fal.config({ credentials: process.env.FAL_KEY || '' });
  }

  /**
   * Generates a try-on image using the FASHN model on fal.ai.
   * Includes strict timeout budgets as per architecture patch 3.
   */
  async generate(input: TryOnProviderInput): Promise<TryOnProviderResult> {
    try {
      // 90s timeout for the entire operation (submit + queue wait + generation)
      // fal client subscribe handles polling automatically
      const result = await fal.subscribe("fal-ai/fashn/tryon/v1.6", {
        input: {
          model_image: input.frontImageUrl,
          garment_image: input.garmentImageUrl,
          // FASHN v1.6 specific parameters can be added here
        },
        logs: true,
        // Hard timeout for subscription
        timeout: 90000 
      });

      if (!result || !result.data || !result.data.images || result.data.images.length === 0) {
        throw new RetryableError(TryOnErrorCode.PROVIDER_FAILURE, 'Provider returned an empty result.');
      }

      return {
        requestId: result.requestId,
        outputImageUrl: result.data.images[0].url,
        modelVersion: 'fashn-v1.6'
      };
    } catch (error: any) {
      console.error('[FalProvider] Generation error:', error);

      if (error.name === 'FalTimeoutError' || error.message?.includes('timeout')) {
        throw new RetryableError(TryOnErrorCode.PROVIDER_TIMEOUT, 'Provider generation timed out.');
      }

      throw new RetryableError(TryOnErrorCode.PROVIDER_FAILURE, `Provider error: ${error.message}`);
    }
  }
}
