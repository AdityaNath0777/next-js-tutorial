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
