# Prompt Nagar

## Steps I took to create this application

### Project Setup

* **Initializing** next.js new project
  ```bash
  npx create-next-app@latest
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

* Installing additional dependencies for **backend**
  * **bcrypt**: to hash *passwords*
  * **mongodb** and **mongoose**: to use mongodb and manage it using mongoose
  * **next-auth**: for *easy authencation* in next.js
  ```bash
  npm i bcrypt mongodb mongoose next-auth
  ```

* delete existing *app* folder and create a new one.
* create a new folder components in the main directory
  * for reusable components
* models folder: for Data Models
* styles folder: add globals.css and use basic styling
  * also update tailwing config for the colors we will be using in our project
* utils: for utility functions we will be using throughout the project
* *env* and *env.sample* files to store API Keys and secrets

* **setting up *app* folder**
  * create page.jsx and name the rafce compoenent as Home
  * create layout.jsx & do rafce
    * remove `import React` as in next.js it is not required
    * import styles
    * create and export metaData obj
    * return html element with body tag and some basic code
    * name the function as RootLayout according to naming convention
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

* encountered an error
  * error: styles not found
  * solution: update js.config to correct path config
    ```js
    "@/*" -> "@*"
    
    "paths": {
      "@*": ["./*"]
    } 
    ```
