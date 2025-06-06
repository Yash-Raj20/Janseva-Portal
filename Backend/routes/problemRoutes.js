// routes/problem.js
import express from "express";
import upload from "../middleware/upload.js";
import {
  createProblem,
  getAllProblems,
  updateStatus,
  upvote,
  comment,
} from "../controllers/ProblemController/problemController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  (req, res, next) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .json({ error: "Your image is more than 10MB" });
        }
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  },
  authMiddleware,
  createProblem
);

router.get("/", getAllProblems);
router.put("/:id/status", adminMiddleware, updateStatus);
router.put("/:id/upvote", authMiddleware, upvote);
router.post("/:id/comment", authMiddleware, comment);

export default router;
