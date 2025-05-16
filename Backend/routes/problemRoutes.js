// routes/problem.js
import express from "express";
import upload from "../middleware/upload.js";
import {
  createProblem,
  verifyToken,
  getAllProblems,
  updateStatus,
  upvote,
  topVoted,
  comment,
} from "../controllers/ProblemController/problemController.js";

const router = express.Router();

// Route with image upload
router.post("/create", verifyToken, upload.single("image"), createProblem);

router.get("/", getAllProblems);
router.put("/status/:id", verifyToken, updateStatus);
router.post("/upvote/:id", verifyToken, upvote);
router.get("/top", topVoted);
router.post("/comment/:id", verifyToken, comment);

export default router;