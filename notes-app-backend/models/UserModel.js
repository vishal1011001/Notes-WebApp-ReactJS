import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Set an Username']
  }, 
  email: {
    type: String,
    required: [true, 'Add a valid email'],
    unique: true
  }, 
  password: {
    type: String,
    required: [true, 'Set a password']
  }
}, {
  timestamps: true
});

const userModel = mongoose.model('User', userSchema);
export default userModel;