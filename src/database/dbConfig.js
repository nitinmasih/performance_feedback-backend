import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv()
const URL = process.env.MONGO_URL

const connectDB = async () => {
      try {
            const response = await mongoose.connect(URL)
            console.log("Database connected")
      }
      catch (error) {
            console.log("Could connect to database ", error.message)
            process.exit(1);
      }
}

export default connectDB