import { connectToDB } from "@utils/database";
import { Prompt } from "@models/prompt.model";

export const GET = async (req, res) => {
  const startTime = performance.now();
  console.log("req: ", req.url); // to make this route dynamic
  try {
    await connectToDB();

    // console.log("fetching all the prompts...");
    const prompts = await Prompt.find({}).populate("creator");
    // console.log("fetching complete :: last prompt", prompts[prompts.length - 1].prompt);
    // console.log(prompts);
    // console.log("strings prompts: ", JSON.stringify(prompts));

    const myRes = new Response(JSON.stringify(prompts), {
      status: 200,
      headers: {
        "Cache-Control": `no-cache`,
      },
    });
    // console.log(myRes);
    return myRes;
  } catch (error) {
    return new Response("ERROR :: Failed to fetch prompts", { status: 500 });
  } finally {
    const endTime = performance.now();
    console.log(
      `Time took to complete the execution of fetching profile posts : ${
        endTime - startTime
      } ms`
    );
  }
};
