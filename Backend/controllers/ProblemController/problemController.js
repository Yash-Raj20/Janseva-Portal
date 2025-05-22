import Problem from "../../models/Problem.js";
import jwt from "jsonwebtoken";
import { createNotification } from "../NotificationController/notifyController.js";
import Notification from "../../models/Notification.js";
import { io } from "../../index.js";

// Create a problem submission
export const createProblem = async (req, res) => {
  try {
    const { title, description, location, category, urgency, contact } =
      req.body;

    if (
      !title ||
      !description ||
      !location ||
      !category ||
      !urgency ||
      !contact ||
      !req.file
    ) {
      return res
        .status(400)
        .json({ error: "All fields including image are required." });
    }

    if (!req.user || (!req.user._id && !req.user.id)) {
      return res.status(401).json({ error: "Unauthorized: User not found." });
    }

    const userId = req.user._id || req.user.id;

    const imageUrl = req.file.path;

    const problem = new Problem({
      title,
      description,
      location,
      category,
      urgency,
      contact,
      userId,
      image: imageUrl,
    });

    await problem.save();

    return res.status(201).json({
      message: "Problem submitted successfully.",
      problem,
    });
  } catch (err) {
    console.error("❌ Error submitting problem:", err);
    return res.status(500).json({
      error: "Problem submission failed.",
      details: err.message,
    });
  }
};

// Get all problems
export const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find()
      .populate("userId", "name email location phone")
      .sort({ createdAt: -1 });

    res.status(200).json(problems);
  } catch (err) {
    console.error("Error fetching problems:", err.message);
    res.status(500).json({ error: "Failed to fetch problems" });
  }
};

// Update the status of a problem
export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

   console.log("Update status called");
  console.log("Problem ID:", req.params.id);
  console.log("New status:", req.body.status);


  const validStatuses = ["Pending", "Process", "Resolved"];

  if (!status || !validStatuses.includes(status)) {
    return res
      .status(400)
      .json({ message: "Invalid or missing status value." });
  }

  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    problem.status = req.body.status;
    await problem.save();

    // Create notification message based on status
    const messages = {
      Resolved: `✅ Your problem "${problem.title}" has been resolved!`,
      Process: `🔄 Your problem "${problem.title}" is now being processed.`,
      Pending: `🕒 Your problem "${problem.title}" is still pending.`,
    };
    const type = status.toLowerCase();

    await createNotification(problem.userId, messages[status], type);

    if (io) {
      io.emit("problemStatusUpdated", { problemId: problem._id, status });
    }

    return res
      .status(200)
      .json({ message: "Status updated successfully", problem });
  } catch (error) {
    console.error("Error updating problem status:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Upvote a problem
export const upvote = async (req, res) => {
  try {
    const problemId = req.params.id;
    const userId = req.user?._id?.toString() || req.user?.id?.toString();

    if (!userId) {
      return res
        .status(401)
        .json({ message: "You must be logged in to upvote." });
    }

    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // Check if user already upvoted
    const hasUpvoted = problem.upvotes.some(
      (upvoterId) => upvoterId.toString() === userId
    );

    if (hasUpvoted) {
      // Optional: Remove upvote (toggle behavior)
      problem.upvotes = problem.upvotes.filter(
        (upvoterId) => upvoterId.toString() !== userId
      );
      await problem.save();

      return res.status(200).json({
        message: "Upvote removed successfully",
        upvotes: problem.upvotes.length,
      });
    } else {
      // Add upvote
      problem.upvotes.push(userId);
      await problem.save();

      return res.status(200).json({
        message: "Upvoted successfully",
        upvotes: problem.upvotes.length,
      });
    }
  } catch (error) {
    console.error("Error in upvoting:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Top 5 Most Upvoted Issues
export const topVoted = async (req, res) => {
  try {
    const allProblems = await Problem.find().populate("userId", "name").lean(); // Get plain JS objects to sort in-memory

    const topIssues = allProblems
      .sort((a, b) => b.upvotes.length - a.upvotes.length)
      .slice(0, 5); // Take top 5

    res.status(200).json(topIssues);
  } catch (error) {
    console.error("Error fetching top voted issues:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Add a comment to an issue
export const comment = async (req, res) => {
  try {
    const { text } = req.body;
    const issue = await Problem.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    issue.comments.push({
      user: req.user._id,
      text,
    });

    await issue.save();

    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Token verification middleware
// export const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Unauthorized" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // Expecting token payload structure { user: { ... } }
//     req.user = decoded.user || decoded;
//     next();
//   } catch (err) {
//     console.error("Token verification error:", err.message);
//     res.status(401).json({ message: "Invalid token" });
//   }
// };
