import { Feedback } from '../models/feedbackModel.js';

// Controller function to give feedback
export const giveFeedback = async (req, res) => {
  try {
    const { receiver , giver , message } = req.body;
    if (!receiver || !giver|| !message ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

  
    const newFeedback = new Feedback({ receiver ,giver, message });
   
    await newFeedback.save();

 
    res.status(201).json({ message: 'Feedback given successfully', feedback: newFeedback });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller function to get feedback by employee ID
export const getFeedbackByEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const feedbacks = await Feedback.find({
      $or: [{ giver: id }, { receiver: id }]
    }).populate('giver receiver', 'name email');


    res.status(200).json(feedbacks);
  } catch (error) {
  
    res.status(500).json({ message: 'Server error' });
  }
};


export const getFeedbackByReceiverAndGiver = async (req, res) => {
  try {
    const { receiver, giver } = req.params;
    const feedback = await Feedback.findOne({ receiver, giver });

    if (!feedback) {
      return res.status(201).json({ message: '' });
    }

    res.status(200).json(feedback);
  } catch (error) {

    res.status(500).json({ message: 'Server error' });
  }
};


export const updateFeedback = async (req, res) => {
  try {
    const { feedbackId, message } = req.body;
    const giver = req.user.id;

    if (!feedbackId || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const feedback = await Feedback.findById(feedbackId);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    if (feedback.giver.toString() !== giver.toString()) {
      return res.status(403).json({ message: 'You are not authorized to update this feedback' });
    }

    feedback.message = message;
    await feedback.save();

    res.status(200).json({ message: 'Feedback updated successfully', feedback });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


export const deleteAllFeedbacks = async (req, res) => {
  try {

    await Feedback.deleteMany({});
    res.status(200).json({ message: 'All feedbacks deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


export const deleteFeedbackById = async (req, res) => {
  try {
    const { feedbackId } = req.params;
    console.log(feedbackId)
    const giver = req.user.id; 
    
    const feedback = await Feedback.findById(feedbackId);
    console.log(feedback)
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }


    if (feedback.giver.toString() !== giver.toString()) {
      return res.status(403).json({ message: 'You are not authorized to delete this feedback' });
    }


    await Feedback.findByIdAndDelete(feedbackId);

    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
