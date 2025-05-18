import { REPLICATE_API_ENDPOINT } from "@/constants";
import { ImageGenerationInput } from "@/types/imageToImage";
import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY,
    useFileOutput: false
});

export async function POST(request: NextRequest) {
    if (!process.env.REPLICATE_API_KEY) {
        throw new Error(
          'The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.'
        );
      }
    const options = await request.json();

    const input: ImageGenerationInput = {
        "image": options.image,
        "prompt": options.prompt,
        "refine": "expert_ensemble_refiner",
        "scheduler": "KarrasDPM",
        "num_outputs": 1,
        "guidance_scale": 7.5,
        "apply_watermark": false,
        "high_noise_frac": 0.8,
        "negative_prompt": "ugly, deformed, noisy, blurry, distorted, change the appearance of the original product",
        "prompt_strength": 0.9,
        "num_inference_steps": 50
    };

    try {
        const output = await replicate.run(REPLICATE_API_ENDPOINT, { input });
        console.log(output);
        return NextResponse.json({ output });
    } catch (error) {
        console.error("Replicate error:", error);
        return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
    }
    
    
}