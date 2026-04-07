import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MongoDB URI missing. Set MONGO_URI or MONGODB_URI.');
    }

    const conn = await mongoose.connect(mongoUri);
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Do not exit process in serverless environment
  }
};

export default connectDB;
