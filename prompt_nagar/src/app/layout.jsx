import "@/styles/globals.css";
import { Nav, Provider } from "@/components";

export const metaData = {
  title: "prompt nagar",
  description: "discover and share AI prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            {/* this is just going to change the background */}
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
