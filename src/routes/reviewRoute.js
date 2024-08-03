import express from 'express';
import {
  initiateReview,
  assignEligibleUsers,
  closeReview,
  getReviewStatus, reviewEligibity
} from '../controllers/reviewController.js';

import { giveFeedback } from '../controllers/feedbackController.js';
import checkEligibility from '../middlewares/reviewAuth.js';

import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/initiate/:id', initiateReview);
router.put('/assign', assignEligibleUsers);
router.put('/close/:id', authMiddleware, closeReview);
router.get('/status', getReviewStatus);
router.get('/check-eligibility/:id', authMiddleware, reviewEligibity)
router.post('/reviews/:id/feedback', authMiddleware, checkEligibility, giveFeedback);
export default router;
