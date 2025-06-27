import express from "express";
import connectDB from "./config/db.js";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import userRoute from "./routes/user-routes.js"
dotenv.config()

const port = process.env.PORT 
const DATABASE_URI = process.env.DATABASE_URI
connectDB(DATABASE_URI)
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use("/api/users", userRoute)
app.listen(port, (req, res) => {
    console.log(`Server is running on port: ${port}`)
})