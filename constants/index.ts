export const ASPECT_RATIOS = ["16:9", "4:5", "1:1", "9:16"] as const;

export const REPLICATE_API_ENDPOINT: `${string}/${string}` | `${string}/${string}:${string}` = "stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc";

export type AspectRatio = typeof ASPECT_RATIOS[number];

export type Dimensions = {
  width: number;
  height: number;
};

export const ASPECT_SIZES: Record<AspectRatio, Dimensions> = {
    "16:9": { width: 832, height: 480 },
    "4:5": { width: 768, height: 960 },
    "1:1": { width: 768, height: 768 },
    "9:16": { width: 480, height: 832 },
  };