import { ASPECT_RATIOS } from "@/constants"
import {z} from "zod"
export const promptFormSchema = z.object({
    image: z.any().refine((file) => file instanceof File && file.size > 0, { message: "Image is required"}),
    prompt: z.string(),
    aspectRatio: z.enum(ASPECT_RATIOS)
});

export type PromptFormData = z.infer<typeof promptFormSchema>;