import { connectToDB } from "@utils/database"
import { Prompt } from "@models/prompt.model"

export const GET = async (req, res) => {
  try {
    await connectToDB();

    const revalidateTime = parseInt(process.env.REVALIDATE_TIME) || 1;

    const prompts = await Prompt.find({}).populate('creator');

    return new Response(JSON.stringify(prompts), {status: 200,
      headers: {
      'Cache-Control': `public, max-age=${revalidateTime}`
    }}, 
    )
  } catch (error) {
    return new Response("ERROR :: Failed to fetch prompts", {status: 500})
    
  }
}