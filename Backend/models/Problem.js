import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    urgency: { type: String, required: true },
    contact: { type: String, required: true },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Resolved"],
    },
    createdAt: { type: Date, default: Date.now },
    // Upvotes now accept both ObjectId (for logged-in users) and String (for guests)
    upvotes: [{ type: String, unique: true }], // Ensure no duplicate upvotes
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: String,
        createdAt: { type: Date, default: Date.now },
      }
    ]
  },
  { timestamps: true }
);

// Add a unique index to ensure no duplicates in the 'upvotes' array
problemSchema.index({ upvotes: 1 }, { unique: true });

export default mongoose.model("Problem", problemSchema);
