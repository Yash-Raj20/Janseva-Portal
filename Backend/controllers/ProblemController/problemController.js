import Problem from "../../models/Problem.js";
import jwt from "jsonwebtoken";
import { createNotification } from "../NotificationController/notifyController.js";
import Notification from "../../models/Notification.js";
import { io } from "../../index.js";

export const createProblem = async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : null;

    const problem = new Problem({
      ...req.body,
      userId: req.user.userId,
      image: imageUrl,
    });

    await problem.save();

    res.status(201).json({
      message: "Problem submitted successfully",
      problem,
    });
  } catch (err) {
    console.error("Error submitting problem:", err.message);
    res.status(400).json({ error: "Problem submission failed" });
  }
};

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

export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const problem = await Problem.findById(id); // or .populate("user") if needed
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // ✅ Make sure user exists
    const userId = problem.userId;
    if (!userId) {
      return res
        .status(400)
        .json({ message: "Problem has no associated user" });
    }

    // ✅ Update problem status
    problem.status = status;
    await problem.save();

    // ✅ Send notification
    const problemTitle = problem.title;

    let message = "";
    let type = "";
    if (status === "Resolved") {
      message = `✅ Your problem "${problemTitle}" has been resolved!`;
      type = "resolved";
    } else if (status === "Process") {
      message = `🔄 Your problem "${problemTitle}" is now being processed.`;
      type = "process";
    } else {
      message = `🕒 Your problem "${problemTitle}" is still pending.`;
      type = "pending";
    }

    await createNotification(problem.userId, message, type); //

    res.status(200).json({ message: "Status updated", problem });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const upvote = async (req, res) => {
  try {
    const problemId = req.params.id;
    const problem = await Problem.findById(problemId);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // Check if the user is logged in
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "You must be logged in to upvote." });
    }

    // Prevent duplicate upvotes from the same user
    if (problem.upvotes.includes(req.user._id.toString())) {
      return res
        .status(400)
        .json({ message: "You already upvoted this problem." });
    }

    // Add user ID to the upvotes array
    problem.upvotes.push(req.user._id);
    await problem.save();

    res.status(200).json({
      message: "Upvoted successfully",
      upvotes: problem.upvotes.length,
    });
  } catch (error) {
    console.error("Error in upvoting:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Top 5 Most Upvoted Issues
export const topVoted = async (req, res) => {
  try {
    const topIssues = await Problem.find()
      .sort({ $expr: { $size: "$upvotes" } })
      .limit(5)
      .populate("createdBy", "name");

    res.status(200).json(topIssues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Add a comment to an issue
export const comment = async (req, res) => {
  try {
    const { text } = req.body;
    const issue = await Problem.findById(req.params.id); // Assuming `Problem` model here

    if (!issue) return res.status(404).json({ message: "Issue not found" });

    issue.comments.push({
      user: req.user._id,
      text,
    });

    await issue.save();

    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Token verification middleware
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user info to the request
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
