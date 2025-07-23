import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Emails already exists"],
      required: [true, "Email is required!"],
      trim: true,
      lowercase: true,

      //  indexing makes easier searching
      index: true, // caution

      // indexing should be chosen carefully,
      // might greatly affect the performance
    },

    username: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    avatar: {
      type: String, // img URL (cloud)
    }
  },
  { timestamps: true }
);

// in our typical always ON & always running server (e.g. express)
// export const User = mongoose.model("User", userSchema);

// in next.js: routes are short lived: only created for a moment when they are called
// thus to store the existing models, we will use:
//  mongoose.models.{modelName}

// the models object provided by the mongoose library stores all the registered models
// If a model named "User" already exists in the "models" obj
      // it assigns that existing model to the "User" variable
// This prevents redefining the model and ensures that the existing model is reused.

// If a model named "User", the model function from mongoose is used to create a new model
// then the newly created model is assigned to the User variable
export const User = mongoose.models.User || mongoose.model("User", userSchema);
