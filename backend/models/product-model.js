import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema
const reviewSchema = mongoose.Schema({
    name: {type: String, required: true},
    rating: {type: Number, required: true},
    comment: {type: String, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, {timestamps: true})
const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true},
    brand: {type: String, required: true},
    quantity: {type: Number, required: true, default: 0},
    stock: {type: Number, required: true, default: 0},
    price: {type: Number, required: true, default: 0},
    category: {type: ObjectId, ref: "Category", required: true},
    rating: {type: Number, required: true, default: 0},
    reviews: [reviewSchema] , 
    reviewCount: {type: Number, required: true, default: 0},
}, {timestamps: true})
export const Product = mongoose.model("Product", productSchema);

