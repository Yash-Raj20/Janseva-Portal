import express from "express";
import {
  createProblem,
  getAllProblems,
  updateStatus,
  upvote,
  topVoted,
  comment,
} from "../controllers/problemController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createProblem);
router.get("/", getAllProblems);
router.patch("/:id", authMiddleware, updateStatus); 
router.post("/:id/upvote", authMiddleware, upvote);
router.get("/top-upvote", topVoted);
router.post("/:id/comment", authMiddleware, comment);

export default router;
