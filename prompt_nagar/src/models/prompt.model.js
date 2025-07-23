import mongoose, { Schema } from "mongoose";

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

// export const Prompt = model("Prompt", PromptSchema);
export const Prompt =
  mongoose.models.Prompt || mongoose.model("Prompt", PromptSchema);
