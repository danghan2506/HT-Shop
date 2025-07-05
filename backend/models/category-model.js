import mongoose, { mongo } from "mongoose";
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    maxLength: 32,
    trim: true,
    unique: true,
  },
});
export const Category = mongoose.model("Category", categorySchema)