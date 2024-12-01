# Prompt Nagar

## Steps I took to create this application

### Project Setup

- **Initializing** next.js new project

  ```bash
  npx create-next-app@latest
  ```

  **_Note:_** I had to **downgrade** this next.js project from **v15 to v14** as next-auth is still not that much compatible with the new v15.

  - for this I just deleted the node modules folder
  - made changes in the package.json to install compatible versions of next and next-auth

  ```json
  {
    "dependencies": {
      "next": "14.2.14",
      "next-auth": "^4.24.10",
      "react": "^18",
      "react-dom": "^18"
    }
  }
  ```

  ```bash
  √ What is your project named? ... prompt_nagar
  √ Would you like to use TypeScript? ... No / Yes                    - No
  √ Would you like to use ESLint? ... No / Yes                        - No
  √ Would you like to use Tailwind CSS? ... No / Yes                  - Yes
  √ Would you like your code inside a `src/` directory? ... No / Yes  - No
  √ Would you like to use App Router? (recommended) ... No / Yes      - Yes
  √ Would you like to use Turbopack for next dev? ... No / Yes        - No
  √ Would you like to customize the import alias (@/* by default)? ... No / Yes - No
  ```

- Installing additional dependencies for **backend**

  - **bcrypt**: to hash _passwords_
  - **mongodb** and **mongoose**: to use mongodb and manage it using mongoose
  - **next-auth**: for _easy authencation_ in next.js

  ```bash
  npm i bcrypt mongodb mongoose next-auth
  ```

- delete existing _app_ folder and create a new one.
- create a new folder components in the main directory
  - for reusable components
- models folder: for Data Models
- styles folder: add globals.css and use basic styling
  - also update tailwing config for the colors we will be using in our project
- utils: for utility functions we will be using throughout the project
- _env_ and _env.sample_ files to store API Keys and secrets

- **setting up _app_ folder**

  - create page.jsx and name the rafce compoenent as Home
  - create layout.jsx & do rafce

    - remove `import React` as in next.js it is not required
    - import styles
    - create and export metaData obj
    - return html element with body tag and some basic code
    - name the function as RootLayout according to naming convention

    ```js
    import "@styles/globals.css";

    export const metaData = {
      title: "prompt nagar",
      description: "discover and share AI prompts",
    };

    const RootLayout = ({ childrem }) => {
      return (
        <html lang="en">
          <body>
            <div className="main">
              {/* this is just going to change the background */}
              <div className="gradient" />
            </div>

            <main className="app">{children}</main>
          </body>
        </html>
      );
    };

    export default RootLayout;
    ```

- encountered an error

  - error: styles not found
  - solution: update js.config to correct path config

    ```js
    "@/*" -> "@*"

    "paths": {
      "@*": ["./*"]
    }
    ```

- started creating Home Page

  - for that in app/page.jsx did some styling for Heading, and description

- initialized empty files for components

  ```bash
  touch Feed.jsx Nav.jsx Form.jsx Profile.jsx PromptCard.jsx Provider.jsx
  ```

- `index.js` to export them directly

  ```js
  import Feed from "./Feed";
  import Form from "./Form";
  import Nav from "./Nav";
  import Profile from "./Profile";
  import PromptCard from "./PromptCard";
  import Provider from "./Provider";

  export { Feed, Form, Nav, Profile, PromptCard, Provider };
  ```

- call Nav in layout.js bcz we'll be reusing this component acrosss our pages. that's exactly why layout is used for

- create post button, signout button, profile image

- for signin using next-auth, we require a provider using getProviders from "next-auth/react"

1. **Imports:**

   - `Link` from `next/link`: Used for creating internal links within the application.
   - `Image` from `next/image`: Used for displaying the logo image.
   - `useState` and `useEffect` from `react`: React hooks for managing state and side effects.
   - Functions from `next-auth/react`: Used for sign-in, sign-out, and retrieving authentication providers.

2. **`Nav` Component:**

   - `isUserLoggedIn` state variable: Initially set to `true` (you'll likely want to fetch the actual login status from `next-auth`).
   - `providers` state variable: Stores the available authentication providers from `next-auth`.
   - `useEffect` hook: Fetches the authentication providers on component mount and sets the `providers` state.

   ```js
   useEffect(() => {
     const setProviders = async () => {
       const response = getProviders();

       setProviders(response);
     };

     setProviders();
   }, []);
   ```

   - JSX code:
     - Renders the navigation bar with different content depending on `isUserLoggedIn`:
       - **Desktop Navigation (hidden on small screens):**
         - Shows the "Create a Post" button, "SignOut" button, and a profile image link (placeholder) if logged in.
         - Shows Sign In buttons for available providers if logged out.
       - **Mobile Navigation (hidden on large screens):**
         - Shows a profile image if logged in (placeholder).
         - Shows Sign In buttons for available providers if logged out.

   ```js
   {
     /* Desktop Navigation */
   }
   <div className="sm:flex hidden">
     {isUserLoggedIn ? (
       <div className="flex gap-3 md:gap-5">
         <Link> Create a Post </Link>

         <button onClick={signOut}> SignOut </button>

         <Link href={"/profile"}>
           <Image onClick={() => {}} />
         </Link>
       </div>
     ) : (
       <>
         {/* if providers are available, it will get the vlaues in the form of array
          * then map over it and displays the available options to sigin e.g. google, apple, fb, etc.
          */}
         {providers &&
           Object.values(providers).map((provider) => (
             <button
               type="button"
               key={provider.name}
               onClick={() => signIn(provider.id)}
               className="black_btn"
             >
               Sign In
             </button>
           ))}
       </>
     )}
   </div>;
   ```

- Next Step: Authentication

  ```js
  "use client";

  import { SessionProvider } from "next-auth/react";

  const Provider = ({ children, session }) => {
    return <SessionProvider session={session}>{children}</SessionProvider>;
  };

  export default Provider;
  ```

now let's create APIs
steps:

1. go to google cloud console: https://console.cloud.google.com
2. create a new project: name it and leave the Location (oragnization) as "No oragnization" for now
3. Select the project
4. Go to APIs & Services

   - OAuth consent screen
   - enter app name, support mail, dev contact info
   - leave app domain for now
   - optional: app logo

5. Save and continue
6. Create Credentials:

   - OAuth Client ID
   - app type: web-app
   - authorized js origin: http://localhost:3000
   - authorized redirect URL: http://localhost:3000
   - app name (optional)

7. Click create
8. Copy the credentials and save them into env variables through .env file

    - Utilize the google client id and secrets in handler of route.js

      ```js
      const handler = NextAuth(
        // pass the options object
        {
          providers: [
            GoogleProvider({
              clientId: process.env.GOOGLE_ID,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            }),
          ],

          async session({ session }) {}
          async signIn({ profile }) {}
        }
      )
      ```

- next.js uses serverless routes
  ```js
  async signIn({ profile }) {
  // serverless route -> it is lambda function -> opens only when it's called
  // every time it's called it needs to spin up the server and connect to the database

            // thus we don't need to keep running our server constantly

            // but we do have to establish a connection to the database

            try {
              // sign-in logic
              await connectToDB();

              // check if a user already exists

              // if not, create a user
              return true;
            } catch (error) {
              console.log(`ERROR :: SIGN IN :: ${error}`);
              return false;
            }
          },
  ```

**connecting to DB**

```js
import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  // Enforce strict query validation to prevent accidental errors
  mongoose.set("strictQuery", true);
  // Mongoose will throw an error if you try to query a field that doesn't exist in your schema.
  //      * helps prevent accidental errors and ensures data integrity.

  if (isConnected) {
    console.log(`MongoDB is already connected`);
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
    });

    isConnected = true;

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(`ERROR :: unable to connect DB :: ${error}`);
  }
};
```

- update session

  ```js
      async session({ session }) {
        // to know which user is currently online
        const sessionUser = await User.findOne({
          email: session.user.email
        })

        // update the current session's user id
        session.user.id = sessionUser._id.toString();

        return session;
      },
  ```

Now restart the server/app

Earlier we declared the `isUserloggedIn` by default to true for mock-up
<br>
Now let's use **_next-auth_** react hook, `useSession`, to fetch the real data from the DB

- here we are using destructuring assignment
  ```js
  const { data: session } = useSession();
  ```
- what it does is that it extracts the "data" property from the returned object
- then assigns it to the varibale named "session"

`useSession()` returns an object which contains data and status

- data: info related to user, such as email, name, image url, etc
- status: an enum which indicated the status of the current session
  - loading: data is being fetched/updated
  - authenticated: user is currently authenticated and a valid session exists.
  - unauthenticated: user is not authenticated or the session has expired.

Now when I tried to refresh the app and tried to signIn using google provider
<br>
an error was encountered: redirect_url mismatch

bcz next-auth requires callback routes which I had to update it on the google cloud console > project > api & services > credentials > web > redirect_url

http:localhost:3000/api/auth/callback/[provider name]

for google
http:localhost:3000/api/auth/callback/google

- again Error!! in image hostname

  - complete error: Error: Invalid src prop (https://lh3.googleusercontent.com/a/Aokjehfjehdfj) on `next/image`, hostname "lh3.googleusercontent.com" is not configured under images in your `next.config.js` See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host

  - `next/image` Un-configured Host
  - Why This Error Occurred
    One of your pages that leverages the next/image component, passed a src value that uses a hostname in the URL that isn't defined in the images.remotePatterns in next.config.js.

- resolution:

  ```js
  const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "lh3.googleusercontent.com",
          port: "",
          pathname: "/*/**",
        },
      ],
    },
  };
  ```

- restart the server, it worked fine

**New Error encountered**

- Unable to connect to DB thus failed to register the user in our DB

- cause of error?
  bcz Next-Auth requires callbacks with our providers

  ```js
  const handler = NextAuth(
    // pass the options object
    {
      providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
      ],

      callbacks: {
        async session({ session }) {},
        async signIn({ profile }) {},
      },
    }
  );
  ```

  - reload the page in new tab if problem persists

* prompt data modelling

  ```js
  import { Schema, models, model } from "mongoose";

  const PromptSchema = new Schema(
    {
      creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      prompt: {
        type: String,
        trim: true,
        require: [true, "prompt is required"],
      },
      tag: {
        type: String,
        require: [true, "tag is required"],
      },
    },
    { timestamps: true }
  );

  export const Prompt = models.Prompt || model("Prompt", PromptSchema);
  ```

* create-prompt api

  ```js
  import { connectToDB } from "@utils/database";
  import { Prompt } from "@models/prompt.model";

  export const POST = async (req, res) => {
    const { userId, prompt, tag } = await req.json();

    try {
      await connectToDB();

      const newPrompt = new Prompt({
        creator: userId,
        prompt,
        tag,
      });

      await newPrompt.save();

      return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
      console.log(`Error :: prompt creation api :: ${error}`);
      return new Response("Error :: Failed to create a prompt", {
        status: 500,
      });
    }
  };
  ```

* create-prompt component

  ```js
  // use client directive page
  "use client";

  import { useState } from "react";
  import { useSession } from "next-auth/react";
  import { useRouter } from "next/navigation";

  import { Form } from "@components";

  const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
      prompt: "",
      tag: "",
    });

    // event handle to create a prompt
    const createPrompt = async (e) => {
      e.preventDefault();

      setSubmitting(true);

      try {
        const response = await fetch("/api/prompt/new", {
          method: "POST",
          body: JSON.stringify({
            prompt: post.prompt,
            tag: post.tag,
            userId: session?.user.id,
          }),
        });

        if (response.ok) {
          // go to home page
          router.push("/");
        }
      } catch (error) {
        console.log(`Error :: prompt creation failed :: ${error}`);
      } finally {
        setSubmitting(false);
      }
    };
    return (
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
    );
  };

  export default CreatePrompt;
  ```

**fetching prompts from the DB**

- `/api/prompt/route.js`

  ```js
  export const GET = async (req, res) => {
    try {
      await connectToDB();

      const prompts = await Prompt.find({}).populate("creator");

      return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
      return new Response("ERROR :: Failed to fetch prompts", { status: 500 });
    }
  };
  ```

- `Feed.jsx` component

  ```js
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch("/api/prompt");

        const data = await response.json();

        setPosts(data);
      } catch (error) {
        console.log(`ERROR :: Unable to fetch posts :: ${error}`);
      }
    };

    fetchPost();
  }, []);
  ```

- mapping posts in `Feed.jsx`
  ```js
  const PromptCardList = ({ data, handleTagClick }) => {
    return (
      <div className="prompt_layout mt-16">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    );
  };
  ```
- `Feed.jsx`

  ```js
  const Feed = () => {
    const [searchText, setSearchText] = useState("");
    const [posts, setPosts] = useState([]);
    const handleSearchChange = (e) => {
      // setSearchText(e.target.value)
    };

    // to get all the posts
    useEffect(() => {
      fetchPost();
    }, []);
    return (
      <section className="feed">
        Feed
        <form className="relative flex-center w-full">
          <input
            type="text"
            placeholder="Search prompt, tag or username"
            required
            value={searchText}
            onChange={handleSearchChange}
            className="search_input peer"
          />
        </form>
        <PromptCardList data={posts} handleTagClick={() => {}} />
      </section>
    );
  };

  export default Feed;
  ```

- Prompt Card

```js
"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

const PromptCard = ({
  key,
  post,
  handleTagClick,
  handleDelete,
  handleEdit,
}) => {
  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);

    // resetting the copied content
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="prompt_card" key={key}>
      <div className="flex justify-between gap-5 items-start">
        <div className="relative flex-1 flex justify-start cursor-pointer gap-3 items-center ">
          <Image
            src={post.creator.avatar}
            alt={`user avatar`}
            width={40}
            height={40}
            className={`rounded-full object-contain`}
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-800">
              @{post.creator.username}
            </h3>
          </div>
          <div className="copy_btn" onClick={() => handleCopy()}>
            <Image
              src={
                copied === post.prompt
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/copy.svg"
              }
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700 ">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
    </div>
  );
};

export default PromptCard;
```

**profile page**

- `/api/users/[id]/posts`

  ```js
  export const GET = async (req, { params }) => {
    try {
      await connectToDB();

      const prompts = await Prompt.find({
        creator: params.id,
      }).populate("creator");

      return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
      console.log(`ERROR :: Unable to fetch the user's posts :: ${error}`);
      return new Response("Failed to fetch the posts", { status: 501 });
    }
  };
  ```

- Profile.jsx component

  ```js
  const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
    return (
      <div className="w-full">
        <h1 className="head_text text-left">
          <span className="blue_gradient">{name}</span> Profile
        </h1>
        <p className="desc text-left">{desc}</p>
        <div className="prompt_layout mt-10">
          {data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
        </div>
      </div>
    );
  };
  ```

- edit and delete button in profile post/prompt card

  ```js                      
  {
    session?.user.id === post.creator._id && pathName === "/profile" && (
      <div className="flex justify-end gap-5 ">
        <button
          className="font-inter border-2 rounded px-3 py-1 border-green-400 text-sm green_gradient cursor_pointer"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          className="font-inter border-2 rounded px-3 py-1 border-orange-400 text-sm orange_gradient cursor_pointer"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    );
  }
  ```

- Get, Edit, Delete - prompt APIs

  - `/api/prompt/[id]`
  - GET (read), PATCH (update), DELETE (delete)

  ```js
  import { connectToDB } from "@utils/database";
  import { Prompt } from "@models/prompt.model";

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
    } catch (error) {
      console.error(`ERROR :: Unable to delete the prompt :: `, error);
      return new Response("Unable to delete the prompt", { status: 500 });
    }
  };
  ```

**handleEdit and handleDelete Post functionality**

Let's navigate the user to a separate page for editing

- handleEdit

  ```js
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  ```

  - inside `/update-prompt/page.jsx`

    - fetch the prompt we want to edit/update

      ```js
      useEffect(() => {
        const fetchPost = async () => {
          const response = await fetch(`/api/prompt/${promptId}`);
          const data = await response.json();
          console.log(data);
          setPost({
            prompt: data.prompt,
            tag: data.tag,
          });
        };

        fetchPost();
      }, [promptId]);
      ```

    - EditPrompt component

      ```js
      const EditPrompt = () => {
        const router = useRouter();
        const promptId = useSearchParams().get("id");
        const [submitting, setSubmitting] = useState(false);
        const [post, setPost] = useState({
          prompt: "",
          tag: "",
        });

        useEffect(() => {
          fetchPost();
        }, [promptId]);

        // event handle to create a prompt
        const editPrompt = async (e) => {
          e.preventDefault();
          setSubmitting(true);

          if (!promptId) return alert("Prompt Not Found!!!");

          try {
            const response = await fetch(`/api/prompt/${promptId}`, {
              method: "PATCH",
              body: JSON.stringify({
                prompt: post.prompt,
                tag: post.tag,
              }),
            });

            if (response.ok) {
              // go to home page
              router.push("/");
            }
          } catch (error) {
            console.log(`Error :: prompt updation failed :: ${error}`);
          } finally {
            setSubmitting(false);
          }
        };
        return (
          <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={editPrompt}
          />
        );
      };
      ```

- handleDelete

  ```js
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          console.log("Prompt deleted successfully!!!");
        }

        const filteredPosts = posts.filter((prev) => prev._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log("Error :: unable to delete the prompt :: ", error);
      }
    }
  };
  ```
