import { Prompt } from "@/models/prompt.model";
import { connectToDB } from "@/utils/database";

export async function getPosts(page = 1, limit = 15) {
  page = page < 1 ? 0 : page;
  limit = limit < 1 ? 15 : limit;

  try {
    await connectToDB();

    const posts = await Prompt.find({})
      .skip(page - 1)
      .limit(limit)
      .populate("creator", {
        _id: 1,
        avatar: 1,
        username: 1,
      })
      .lean()
      .exec();

    return JSON.parse(JSON.stringify(posts));
  } catch (err) {
    console.error(`Failed to fetch posts`, err);
    throw new Error(`Failed to fetch posts`);
  }
}
