import mongoose from "mongoose"
import { DB_NAME } from "../constants.js";

export const connectDB = async() =>{
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log("connection Instance =>",connectionInstance.connection.host)
  } catch (error) {
    console.log("db error",error)
    process.exit(2)
  }
}