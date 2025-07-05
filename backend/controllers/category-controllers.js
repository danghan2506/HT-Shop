
import asyncHandler from "../middlewares/async-handler.js";
import { Category } from "../models/category-model.js";
const createCategory = asyncHandler(async(req, res) => {
    const {name} = req.body
    if(!name){
        throw new Error("Please enter category's name")
    }
    const existedCategory = await Category.findOne({name})
    if(existedCategory){
        res.status(404).send("Cateogy already existed!")
        return
    }
    const newCategory = new Category({name})
    try {
        await newCategory.save()
        res.status(201).json({
            _id: newCategory._id,
            name: newCategory.name
        })
    } catch (error) {
        res.status(400)
        throw new Error("Invalid category")
    }

})
export {createCategory}