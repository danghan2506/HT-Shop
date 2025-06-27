import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    role: {type: String, default: "user"}
    // timestamps: auto add createdAt and updatedAt
}, {timestamps: true})
const User = mongoose.model("User", userSchema)
export default User