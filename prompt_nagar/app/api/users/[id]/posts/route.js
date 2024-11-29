import { connectToDB } from "@utils/database";
import { Prompt } from "@models/prompt.model";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    // console.log(`req: ${JSON.stringify(req)}`); // empty {}
    // console.log(`params: ${JSON.stringify(params)}`); // params: {"id":"1234_id_number"}

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.error(`ERROR :: Unable to fetch the user's posts :: `, error);
    return new Response("Failed to fetch the posts", { status: 501 });
  }
};
