import Review from "../models/reviewModel.js";

// Initiate a new review
export const initiateReview = async (req, res) => {
  try {
    const { initiatedBy, eligibleUsers, closeByDate } = req.body; // Extract closeByDate from the request body
    const { id } = req.params; // Get the user ID from the URL parameter

    const newReview = new Review({
      initiatedFor: id, // Use the ID from the URL params
      eligibleUsers,
      closeByDate,
      initiatedBy,
      isOpen: true,
    });

    await newReview.save();

    res.status(201).json({ success: true, data: newReview });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



// Assign eligible users to review
export const assignEligibleUsers = async (req, res) => {
  try {
    const { reviewId, eligibleUsers } = req.body;

    const review = await Review.findByIdAndUpdate(
      reviewId,
      { eligibleUsers, updatedAt: Date.now() },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    res.status(200).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Close a review
export const closeReview = async (req, res) => {
  try {
    const { reviewId } = req.params; // Use reviewId instead of id

    const now = new Date();

    const review = await Review.findById(reviewId); // Find the review by its ID
    if (!review) {
      return res.status(404).send({ message: 'Review not found.' });
    }

    if (!review.isOpen) {
      return res.status(400).send({ message: 'Review is already closed.' });
    }

    review.isOpen = false;
    review.closedAt = now;
    await review.save();

    res.status(200).send({ message: 'Review closed successfully.' });
  } catch (error) {
    res.status(500).send({ message: 'Error closing review.', error: error.message });
  }
};



export const getReviewStatus = async (req, res) => {
  try {
    const reviews = await Review.find({ isOpen: true }); // Fetch all open reviews

    if (reviews.length === 0) {
      return res.status(200).json({ success: true, message: 'No open reviews found', reviewStatus: {} });
    }

    // Create a map of employee IDs to active review status
    const reviewStatus = {};

    reviews.forEach(review => {
      if (!reviewStatus[review.initiatedFor]) {
        reviewStatus[review.initiatedFor] = [];
      }
      reviewStatus[review.initiatedFor].push({
        _id: review._id,
        eligibleUsers: review.eligibleUsers,
        closeByDate: review.closeByDate,
        initiatedBy: review.initiatedBy,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
      });
    });

    res.status(200).json({ success: true, reviewStatus });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const reviewEligibity = async(req, res) =>{
  try {
    const { id } = req.params;
    
    const userId = req.user.id; 

    const review = await Review.findOne({ initiatedFor: id });

    if (review && review.eligibleUsers.includes(userId.toString())) {
      return res.json({ isEligible: true });
    } else {
      return res.json({ isEligible: false });
    }
  } catch (error) {

    res.status(500).json({ message: 'Server error' });
  }
}