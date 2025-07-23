import mongoose from "mongoose";
/**
 * Do not get confused;
 *
 * Due to cold start, both variables will get reset but cachedDb keeps track of connection state
 */

let isConnected = false; // if for some reason DB got disconnected this won't get updated
// and will cause problem later

let cachedDB = null; // better to use this to check connection state with the DB

export const connectToDB = async () => {
  // Enforce strict query validation to prevent accidental errors
  mongoose.set("strictQuery", true);
  // Mongoose will throw an error if you try to query a field that doesn't exist in your schema.
  //      * helps prevent accidental errors and ensures data integrity.

  if (cachedDB && cachedDB.connections[0].readyState === 1) {
    console.log(`MongoDB is already connected (cached connection).`);
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
    });

    isConnected = true;
    cachedDB = db;

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(`ERROR :: unable to connect DB :: ${error}`);
  }
};
