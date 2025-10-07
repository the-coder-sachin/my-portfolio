import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    phone: { type: String, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    messages: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

export default mongoose.model("Subscriber", subscriberSchema);
