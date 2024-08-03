import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    giver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
//     required:true,
    min: 1,
    max: 5, // Assuming a rating scale of 1 to 5
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

export const Feedback = mongoose.model("Feedback", feedbackSchema);
