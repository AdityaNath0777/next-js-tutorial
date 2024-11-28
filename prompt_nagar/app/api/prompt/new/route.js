import { connectToDB } from "@utils/database";
import { Prompt } from "@models/prompt.model";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();

    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log(`Error :: prompt creation api :: ${error}`);
    return new Response("Error :: Failed to create a prompt", { status: 500 });
  }
};
