import "@styles/globals.css";

export const metaData = {
  title: "prompt nagar",
  description: "discover and share AI prompts",
};

const RootLayout = ({ children }) => {
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
