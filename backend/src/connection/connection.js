import mongoose from "mongoose";
const initializeDb = async (url) => {
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
