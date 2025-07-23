import { connectToDB } from "@/utils/database";
import { Prompt } from "@/models/prompt.model";

export const GET = async (req, res) => {
  // const startTime = performance.now();
  console.log("req: ", req.url); // to make this route dynamic
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");

    const myRes = new Response(JSON.stringify(prompts), {
      status: 200,
    });

    return myRes;
  } catch (error) {
    console.error(`Failed to fetch prompts: `, error);
    return new Response.json(
      { message: "ERROR :: Failed to fetch prompts" },
      { status: 500 }
    );
  }
  //  finally {
  //   // const endTime = performance.now();
  //   console.log(
  //     `Time took to complete the execution of fetching profile posts : ${
  //       endTime - startTime
  //     } ms`
  //   );
  // }
};
