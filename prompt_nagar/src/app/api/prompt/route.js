import { connectToDB } from "@/utils/database";
import { Prompt } from "@/models/prompt.model";
import { getPosts } from "@lib/prompts/prompts.service";

export const GET = async (req, res) => {
  try {
    // Extract query parameters from the URL object within the Request
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1; // Parse to integer, default to 1
    const limit = parseInt(searchParams.get("limit")) || 5; // Parse to integer, default to 5

    console.log("page: %d \t limit: %d", page, limit);

    await connectToDB();

    // const prompts = await Prompt.find({}).populate("creator");
    const prompts = await getPosts(page, limit);

    const myRes = new Response(JSON.stringify(prompts), {
      status: 200,
    });

    return myRes;
  } catch (error) {
    console.error(`Failed to fetch prompts: `, error);
    return Response.json(
      { message: "ERROR :: Failed to fetch prompts" },
      { status: 500 }
    );
  }
};
// export const GET = async (req, res) => {
//   // const startTime = performance.now();
//   console.log("req: ", req.url); // to make this route dynamic
//   try {
//     await connectToDB();

//     const prompts = await Prompt.find({}).populate("creator");

//     const myRes = new Response(JSON.stringify(prompts), {
//       status: 200,
//     });

//     return myRes;
//   } catch (error) {
//     console.error(`Failed to fetch prompts: `, error);
//     return new Response.json(
//       { message: "ERROR :: Failed to fetch prompts" },
//       { status: 500 }
//     );
//   }
//   //  finally {
//   //   // const endTime = performance.now();
//   //   console.log(
//   //     `Time took to complete the execution of fetching profile posts : ${
//   //       endTime - startTime
//   //     } ms`
//   //   );
//   // }
// };
