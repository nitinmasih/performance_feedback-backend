import express from 'express';
import {
  initiateReview,
  assignEligibleUsers,
  closeReview,
  getReviewStatus, reviewEligibity
} from '../controllers/reviewController.js';

import { giveFeedback ,getFeedbackByEmployee ,updateFeedback ,getFeedbackByReceiverAndGiver, deleteAllFeedbacks, deleteFeedbackById} from '../controllers/feedbackController.js';
import checkEligibility from '../middlewares/reviewAuth.js';

import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/initiate/:id', initiateReview);
router.put('/assign', assignEligibleUsers);
router.put('/close/:reviewId', authMiddleware , closeReview);
router.get('/status', getReviewStatus);
router.get('/check-eligibility/:id', authMiddleware, reviewEligibity)
router.post('/feedback/:id', authMiddleware, checkEligibility, giveFeedback);
router.get("/:id" ,getFeedbackByEmployee)
router.put('/feedback/update', authMiddleware, updateFeedback);
router.get('/feedback/:receiver/:giver', getFeedbackByReceiverAndGiver);
router.delete("/feedback/All" , authMiddleware, deleteAllFeedbacks)
router.delete('/feedback/:feedbackId',authMiddleware, deleteFeedbackById);
export default router;
