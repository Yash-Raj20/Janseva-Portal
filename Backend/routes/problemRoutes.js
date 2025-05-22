// routes/problem.js
import express from "express";
import upload from "../middleware/upload.js";
import {
  createProblem,
  getAllProblems,
  updateStatus,
  upvote,
  topVoted,
  comment,
} from "../controllers/ProblemController/problemController.js";
import authMiddleware from "../middleware/authMiddleware.js";

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
router.put("/:id/status", authMiddleware, updateStatus);
router.post("/upvote/:id", authMiddleware, upvote);
router.get("/top", topVoted);
router.post("/comment/:id", authMiddleware, comment);

export default router;
