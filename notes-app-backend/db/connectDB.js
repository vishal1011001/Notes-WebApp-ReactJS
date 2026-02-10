import mongoose from 'mongoose';

const connectDB = (DATABASE_URL) => {
  try {
    mongoose.connect(DATABASE_URL);
    console.log("Connected to database...");
  } catch (error) {
    console.error("error connecting to the database: ", error);
  }
};

export default connectDB;