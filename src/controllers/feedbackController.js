import { Feedback } from '../models/feedbackModel.js';

// Controller function to give feedback
export const giveFeedback = async (req, res) => {
  try {
    const { receiver , giver , message } = req.body;
    if (!receiver || !giver|| !message ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

  
    const newFeedback = new Feedback({ receiver ,giver, message });
    console.log(newFeedback)
   
    await newFeedback.save();

 
    res.status(201).json({ message: 'Feedback given successfully', feedback: newFeedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller function to get feedback by employee ID
export const getFeedbackByEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const feedbacks = await Feedback.find({
      $or: [{ giver: id }, { receiver: id }]
    }).populate('giver receiver', 'name email');


    res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
