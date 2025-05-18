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
        "prompt": options.prompt ? options.prompt : "keep the original product, change background to studio lighting setup",
        "refine": "expert_ensemble_refiner",
        "scheduler": "KarrasDPM",
        "num_outputs": 1,
        "guidance_scale": 6,
        "apply_watermark": false,
        "high_noise_frac": 0.8,
        "negative_prompt": "distorted product, change in shape, wrong color, unrealistic textures",
        "prompt_strength": 0.7,
        "num_inference_steps": 30
    };

    try {
        const output = await replicate.run(REPLICATE_API_ENDPOINT, { input });
        return NextResponse.json({ output });
    } catch (error) {
        console.error("Replicate error:", error);
        return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
    }
    
    
}