import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`db connected`);
  } catch (error) {
    console.log(`error connecting dataBase`);
    console.log(error);
    process.exit(1);
  }
};
