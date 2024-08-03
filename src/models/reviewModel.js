import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  initiatedFor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eligibleUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  closedAt: { type: Date },
  isOpen: { type: Boolean, default: false },
  closeByDate: { type: Date, required: true },
  initiatedBy:{type:String,required:true}
}, { timestamps: true });

// Function to stop the review manually
reviewSchema.methods.stopReview = function() {
  if (this.isOpen) {
    this.isOpen = false;
    this.closedAt = new Date();
    return this.save();
  } else {
    throw new Error('Review is already closed.');
  }
};

// Middleware to check if the review should be closed automatically
reviewSchema.pre('save', function(next) {
  if (this.isOpen && this.closeByDate <= new Date()) {
    this.isOpen = false;
    this.closedAt = new Date();
  }
  next();
});

export default mongoose.model('Review', reviewSchema);
