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
