import express from "express";
import connectDB from "./config/db.js";
const app = express()
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
dotenv.config()
const port = process.env.PORT 
const DATABASE_URI = process.env.DATABASE_URI
connectDB(DATABASE_URI)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.get('/', (req, res) => {
    res.send("<h1>Hello World</h1>")
})
app.listen(port, (req, res) => {
    console.log(`Server is running on port: ${port}`)
})