import { Feed } from "@components";
import { getPosts } from "@lib/prompts/prompts.service";

const Home = async () => {
  let posts;
  let error = false;
  let limit = 5;
  let hasMore = false;
  try {
    posts = await getPosts(1, 5);
    hasMore = posts.length > limit;
    posts = posts.slice(0, 5);
  } catch (error) {
    posts = [];
    error = true;
  }

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        A platform to share your favorite and personalized prompts with everyone
        all over the world.
      </p>
      {error ? (
        <p>Something went wrong while trying to fetch posts, retry later.</p>
      ) : (
        <Feed initialPosts={posts} hasMore={hasMore} />
      )}
    </section>
  );
};

export default Home;
