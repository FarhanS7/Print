import { Client } from "@gradio/client";
import type { TryOnProvider, TryOnProviderInput, TryOnProviderResult } from './tryonProvider.interface.js';
import { TryOnErrorCode, RetryableError } from '../../modules/tryon/tryon.errors.js';

export class HuggingFaceTryOnProvider implements TryOnProvider {
  readonly name = 'huggingface-idm-vton';

  async generate(input: TryOnProviderInput): Promise<TryOnProviderResult> {
    try {
      console.log('[HuggingFaceProvider] Connecting to yisol/IDM-VTON space...');
      const client = await Client.connect("yisol/IDM-VTON");

      console.log('[HuggingFaceProvider] Fetching input images to pass as Blobs...');
      const personImgRes = await fetch(input.frontImageUrl);
      const personImgBlob = await personImgRes.blob();

      const garmentImgRes = await fetch(input.garmentImageUrl);
      const garmentImgBlob = await garmentImgRes.blob();

      console.log('[HuggingFaceProvider] Submitting to Gradio API...');
      
      // The API payload based on yisol/IDM-VTON gradio space
      const result = await client.predict("/tryon", { 
        dict: { background: personImgBlob, layers: [], composite: null }, 
        garm_img: garmentImgBlob, 
        garment_des: "a garment", 
        is_checked: true, 
        is_checked_crop: false, 
        denoise_steps: 30, 
        seed: 42, 
      });

      console.log('[HuggingFaceProvider] Generation complete.', result.data);

      if (!result.data || !Array.isArray(result.data) || result.data.length === 0) {
        throw new RetryableError(TryOnErrorCode.PROVIDER_FAILURE, 'Provider returned an empty result.');
      }

      // The result is usually an array, the first item being the URL of the generated image 
      // or a file object containing a URL property.
      const outputData = result.data[0];
      const outputImageUrl = typeof outputData === 'string' ? outputData : outputData.url;

      if (!outputImageUrl) {
        throw new RetryableError(TryOnErrorCode.PROVIDER_FAILURE, 'Provider did not return an image URL.');
      }

      return {
        outputImageUrl: outputImageUrl,
        modelVersion: 'idm-vton-hf'
      };
    } catch (error: any) {
      console.error('[HuggingFaceProvider] Generation error:', error);
      throw new RetryableError(TryOnErrorCode.PROVIDER_FAILURE, `Provider error: ${error.message}`);
    }
  }
}
