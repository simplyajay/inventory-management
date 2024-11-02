import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const url = process.env.MONGODB_URL;
const initializeDb = async () => {
  return await mongoose
    .connect(url)
    .then(() => {
      console.log("Connection Successful");
      return true;
    })
    .catch(() => {
      return false;
    });
};

export default initializeDb;
