import { connectToDB } from "@/utils/database";
import { Prompt } from "@/models/prompt.model";

// GET (read)
export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const promptId = params.id;
    const prompt = await Prompt.findById(promptId).populate("creator");

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.error(`ERROR :: Unable to fetch the prompt :: `, error);
    return new Response("Failed to fetch the prompt", { status: 500 });
  }
};

// PATCH (update)
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();

    let existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response("Prompt not found!!", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    console.error(`ERROR :: Failed to update the prompt :: `, error);
    return new Reponse("Failed to update the prompt", { status: 500 });
  }
};

// DELETE (delete)
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndDelete(params.id);
    return new Response("Prompt successfully deleted", { status: 200 });

    // const existingPrompt = await Prompt.findById(params.id);

    // if (!existingPrompt)
    //   return new Response("Prompt does not exists", { status: 404 });

    // // await existingPrompt.remove(); // deprecated

    // // new method
    // const deleteResult = await existingPrompt.deleteOne();

    // if (deleteResult.deletedCount === 1) {
    //   return new Response("Prompt successfully deleted", { status: 200 });
    // } else {
    //   throw new Error("Failed to delete the prompt");
    // }
  } catch (error) {
    console.error(`ERROR :: Unable to delete the prompt :: `, error);
    return new Response("Unable to delete the prompt", { status: 500 });
  }
};
