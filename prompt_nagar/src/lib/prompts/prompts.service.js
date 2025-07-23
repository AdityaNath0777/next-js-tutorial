import "server-only";

import { Prompt } from "@/models";
import { connectToDB } from "@/utils/database";

export async function getPosts(page = 1, limit = 15) {
  page = Math.max(1, page);
  limit = Math.max(1, limit);

  try {
    await connectToDB();

    const skip = (page - 1) * limit;

    const posts = await Prompt.find({})
      .skip(skip)
      .limit(limit + 1) // try to fetch one more post, if successfull means we have more posts
      // if not we have reached the end
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
