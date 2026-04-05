import { feedbackModel } from "../models/extrasModel.js";
const postFeedback = async (req, res, next) => {
  const newFeedback = {
    userId: req.user.id,
    fbContent: req.body.message.trim(),
  };

  if (!newFeedback.fbContent) {
    throw new Error('Please include feedback!');
  }

  await feedbackModel.create(newFeedback);
  res.json({ message: "Feedback sent successfully!"});
}

export { postFeedback };