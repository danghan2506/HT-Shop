import express from "express";
import connectDB from "./config/db.js";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import userRoute from "./routes/user-routes.js"
import categoryRoute from "./routes/category-routes.js"
import productRoute from "./routes/product-routes.js"
import uploadRoute from "./routes/upload-routes.js"
import orderRoute from "./routes/order-routes.js"
import path from "path";
dotenv.config()
const port = process.env.PORT 
const DATABASE_URI = process.env.DATABASE_URI
connectDB(DATABASE_URI)
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use("/api/users", userRoute)
app.use("/api/category", categoryRoute)
app.use("/api/products", productRoute)
app.use("/api/upload", uploadRoute)
app.use("/api/orders", orderRoute)
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));
app.listen(port, (req, res) => {
    console.log(`Server is running on port: ${port}`)
})