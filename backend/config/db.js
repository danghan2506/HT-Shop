import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const connectDB = async(DATABASE_URI) => {
    try {
        await mongoose.connect(DATABASE_URI) 
        console.log("Connect to database successfully!")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
export default connectDB