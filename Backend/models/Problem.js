import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    urgency: { type: String, required: true },
    contact: { type: String, required: true },
    image: { type: String }, // Optional image field
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Resolved"],
    },
    createdAt: { type: Date, default: Date.now },
    upvotes: [{ type: String, unique: true }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);


export default mongoose.model("Problem", problemSchema);