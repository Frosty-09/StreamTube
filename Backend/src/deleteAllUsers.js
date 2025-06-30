import mongoose from 'mongoose';
import { User } from './models/user.model.js';
import dotenv from 'dotenv';
dotenv.config();

const deleteAllUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await User.deleteMany({});
    console.log('All users deleted successfully');
  } catch (error) {
    console.error('Error deleting users:', error);
  } finally {
    mongoose.disconnect();
  }
};

deleteAllUsers();