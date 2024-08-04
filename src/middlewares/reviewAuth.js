// middleware/checkEligibility.js
import Review from '../models/reviewModel.js';

const checkEligibility = async (req, res, next) => {
  try {
    const { id } = req.params; // Employee ID for whom the review is being added
    const userId = req.user.id; // ID of the user trying to add the review (assuming user ID is stored in req.user)
    const review = await Review.findOne({ initiatedFor: id });
    if (!review || !review.eligibleUsers.includes(userId.toString())) {
    
      return res.status(403).json({ message: 'You are not authorized to add a review for this user.' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export default checkEligibility;
