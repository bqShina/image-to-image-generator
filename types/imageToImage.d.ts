import {z} from "zod"
export const promptFormSchema = z.object({
    image: z.string().min(1, { message: "Image is required" }),
    prompt: z.string()
});

export type PromptFormData = z.infer<typeof promptFormSchema>;

export type ImageGenerationInput = {
    image: string; // base64 
    prompt: string;
    refine: 'expert_ensemble_refiner' | string;
    scheduler: string;
    lora_scale: number;
    num_outputs: number;
    guidance_scale: number;
    apply_watermark: boolean;
    high_noise_frac: number;
    negative_prompt: string;
    prompt_strength: number;
    num_inference_steps: number;
  };

  export type ImageContextType = {
    generatedImages: string[];
    setGeneratedImages: (images: string[]) => void;
  }