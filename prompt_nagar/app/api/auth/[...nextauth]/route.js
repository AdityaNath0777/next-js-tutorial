import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { User } from "@models/user.model";
import { connectToDB } from "@utils/database";

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
      async session({ session }) {
        // to know which user is currently online
        const sessionUser = await User.findOne({
          email: session?.user?.email,
        });
        
        // update the current session's user id
        session.user.id = sessionUser?._id?.toString();

        // console.log("session: ", session)
        // console.log("sessionUser: ", sessionUser)
        return session;
      },

      async signIn({ profile }) {
        // serverless route -> it is lambda function -> opens only when it's called
        // every time it's called it needs to spin up the server and connect to the database

        // thus we don't need to keep running our server constantly

        // console.log(profile);
        // but we do have to establish a connection to the database
        try {
          // sign-in logic
          await connectToDB();

          // check if a user already exists
          const userExists = await User.findOne({
            email: profile?.email,
          });

          // console.log(profile);
          // console.log("image type: ", typeof profile.picture)
          // console.log("email type: ",typeof profile.email)
          // console.log("name type: ",typeof profile.name)

          // if not, create a user
          if(!userExists) {
            await User.create({
              email: profile?.email,
              fullName: `${profile?.given_name} ${profile?.family_name}`,
              username: profile?.name?.replace(" ", "").toLowerCase(),
              avatar: profile?.picture
            });
          }
          // if (!userExists) {
          //   await User.create({
          //     email: profile.email,
          //     username: profile.username.replace(" ", "-").toLowerCase(),
          //     avatar: profile.image,
          //   });
          // }
          return true;
        } catch (error) {
          console.log(`ERROR :: SIGN IN :: ${error}`);
          return false;
        }
      },
    },
  }
);

export { handler as GET, handler as POST };
