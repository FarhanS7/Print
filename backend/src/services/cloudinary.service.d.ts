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
export declare const getMockupUrl: (options: MockupOptions) => any;
/**
 * Helper to extract Cloudinary public ID from a URL
 */
export declare const getPublicIdFromUrl: (url: string) => string;
export {};
//# sourceMappingURL=cloudinary.service.d.ts.map