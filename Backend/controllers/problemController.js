import Problem from "../models/Problem.js";
import jwt from "jsonwebtoken";
import Notification from "../models/Notification.js";
import { io } from "../index.js";

export const createProblem = async (req, res) => {
  try {
    const problem = new Problem({
      ...req.body,
      userId: req.user.userId,
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
  try {
    const { id } = req.params; // Get the ID from the URL
    const { status } = req.body; // Get the new status from the request body

    // Find the problem by ID and update the status
    const updatedProblem = await Problem.findByIdAndUpdate(
      id,
      { status }, // Update the status
      { new: true } // Return the updated document
    );

    if (!updatedProblem) {
      return res.status(404).json({ message: "Problem not found" }); // Handle case when problem doesn't exist
    }

    // Check if the userId exists in the updated problem
    if (!updatedProblem.userId) {
      return res
        .status(400)
        .json({ message: "Problem has no associated user" });
    }

    // Create and save a notification for the user
    const notification = new Notification({
      user: updatedProblem.userId,
      message: `Your issue "${updatedProblem.title}" has been updated to "${status}".`,
    });

    // Save the notification
    await notification.save();

    // Emit the notification through socket (if using socket.io)
    io.emit("newNotification", {
      userId: updatedProblem.userId.toString(),
      message: notification.message,
    });

    // Return the updated problem with a success response
    res
      .status(200)
      .json({ message: "Status updated successfully", updatedProblem });
  } catch (error) {
    console.error("Error updating problem status:", error);
    res.status(500).json({ message: "Failed to update problem status" }); // Handle errors
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
      return res.status(401).json({ message: "You must be logged in to upvote." });
    }

    // Prevent duplicate upvotes from the same user
    if (problem.upvotes.includes(req.user._id.toString())) {
      return res.status(400).json({ message: "You already upvoted this problem." });
    }

    // Add user ID to the upvotes array
    problem.upvotes.push(req.user._id);
    await problem.save();

    res.status(200).json({ message: "Upvoted successfully", upvotes: problem.upvotes.length });
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
