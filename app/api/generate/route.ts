import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";



const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY,
});

export async function POST(request: NextRequest, response: NextResponse) {
    if (!process.env.REPLICATE_API_KEY) {
        throw new Error(
          'The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.'
        );
      }
    const options = await request.json();
    console.log(options);
    return NextResponse.json({});
}