import { Feed } from "@components";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque voluptas nesciunt fuga repellat iure quas neque dicta. Ea, aspernatur quis.
      </p>

      <Feed />
    </section>
  );
};

export default Home;