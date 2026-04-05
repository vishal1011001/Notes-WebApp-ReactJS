import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  fbContent: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const feedbackModel = mongoose.model('feedback', feedbackSchema);

export { feedbackModel };