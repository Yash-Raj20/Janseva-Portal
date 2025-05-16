import express from 'express';
import { authenticateUser, isCommunityVerified } from '../middlewares/authMiddleware.js';
import { 
  registerCommunityMember, 
  getAvailableProblem, 
  pickProblem, 
  submitProof 
} from '../controllers/CommunityController/communityController.js';

const router = express.Router();

// Community Registration
router.post('/register', authenticateUser, registerCommunityMember);

// Get Available Issues
router.get('/problem', authenticateUser, isCommunityVerified, getAvailableProblem);

// Pick an Issue
router.post('/pick-problem', authenticateUser, isCommunityVerified, pickProblem);

// Submit Proof
router.post('/submit-proof', authenticateUser, isCommunityVerified, submitProof);

export default router;
