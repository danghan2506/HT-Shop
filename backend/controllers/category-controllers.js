import asyncHandler from "../middlewares/async-handler.js";
import { Category } from "../models/category-model.js";
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    throw new Error("Please enter category's name");
  }
  const existedCategory = await Category.findOne({ name });
  if (existedCategory) {
    res.status(404).send("Cateogy already existed!");
    return;
  }
  const newCategory = new Category({ name });
  try {
    await newCategory.save();
    res.status(201).json({ newCategory });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid category");
  }
});
const updateCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      res.status(404);
      throw new Error("ID not found!");
    } else {
      category.name = req.body.name || category.name;
      const updateCategory = await category.save();
      res.status(200);
      res.json({ updateCategory });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
const deleteCategory = asyncHandler(async(req, res) => {
    const {categoryId} = req.params
    try {
        const category = await Category.findByIdAndDelete(categoryId)
        if(!category){
            res.status(401)
            throw new Error("Cannot delete this category")
        }
        else{
            res.status(201)
            res.json(category)
        }
    } catch (error) {
        throw new Error("Internal server error")
    }
})
const listCategory = asyncHandler(async(req, res) => {
    try {
        const listCategory = await Category.find()
        if(!listCategory){
            res.status(401)
            res.json("No category found!")
        }
        res.json({listCategory})
    } catch (error) {
        throw new Error("Internal server error")
    }
})
const readCategory = asyncHandler(async(req, res) => {
    const {categoryId} = req.params
    try {
        const category = await Category.findById(categoryId)
        if(!category){
            res.status(404)
            throw new Error("No category found")
        }
        res.json(category)
    } catch (error) {
        throw new Error("Internal server error")
    }
})
export { createCategory, updateCategory, deleteCategory, listCategory , readCategory};
