import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectToDatabase = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `mongoDB connection successful db host ${connectionInstance.connection.host} db name ${connectionInstance.connection.name}`
    );
  } catch (err) {
    console.error("MongoDB connection error {Bankai}??:", err);
    process.exit(1);
  }
};
