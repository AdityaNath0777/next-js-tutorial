import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col ">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} amazing prompts that let your imagination run wild, effectively automate tasks, etc., and share them with the world through Prompt Nagar.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 flex flex-col gap-7 w-full max-w-2xl glassmorphirm"
      >
        <label>
          <span className="font-satoshi font-semibold text-base">
            Write your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            required
            className="form_textarea"
            placeholder="Write your prompt here..."
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {` `}
            <span className="text-sm font-medium">
              (#webdev #python #ai #datascience)
            </span>
          </span>
          <input
            type="text"
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            className="form_input"
            required
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href={"/"} className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-xl text-gray-50"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
