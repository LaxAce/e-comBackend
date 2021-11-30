import mongoose from "mongoose";

const connectDB = (url) => {
  return mongoose.connect(url, console.log("connected to db"));
};

export default connectDB;
