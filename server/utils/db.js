import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connection successfull");
  } catch (error) {
    console.error("connection failed",error);
  }
};

export default dbConnect;
