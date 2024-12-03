import { connectToDB } from "@utils/database";
import { Prompt } from "@models/prompt.model";

export const GET = async (req, res) => {
  try {
    await connectToDB();

    const revalidateTime = parseInt(process.env.REVALIDATE_TIME) || 1;

    console.log("fetching all the prompts...");
    const prompts = await Prompt.find({}).populate("creator");
    console.log("fetching complete :: last prompt", prompts[prompts.length - 1].prompt);
    // console.log(prompts);
    // console.log("strings prompts: ", JSON.stringify(prompts));

    const myRes = new Response(JSON.stringify(prompts), {
      status: 200,
      headers: {
        "Cache-Control": `public, max-age=${revalidateTime}`,
      },
    });
    // console.log(myRes);
    return myRes;
  } catch (error) {
    return new Response("ERROR :: Failed to fetch prompts", { status: 500 });
  }
};
