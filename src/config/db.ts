import mongoose from "mongoose";
import envConfig from "./config.js";


async function connectDB(uri: string) {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected successfully");
    });
    await mongoose.connect(envConfig.mongoUri as string)

  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);

  }
}
export default connectDB;