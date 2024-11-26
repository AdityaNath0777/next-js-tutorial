# Prompt Nagar

## Steps I took to create this application

### Project Setup

- **Initializing** next.js new project

  ```bash
  npx create-next-app@latest
  ```

  ***Note:*** I had to **downgrade** this next.js project from **v15 to v14** as next-auth is still not that much compatible with the new v15.
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
