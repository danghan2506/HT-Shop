import asyncHandler from "../middlewares/async-handler.js";
import { Product } from "../models/product-model.js";
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, brand, quantity, category } = req.fields;
  try {
    //    Validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
      case !category:
        return res.json({ error: "Category is required" });
    }
    const product = new Product({ ...req.fields });
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      throw new Error("ID not found!");
    } else {
      product.name = req.fields.name || product.name;
      product.description = req.fields.description || product.description;
      product.price = req.fields.price || product.price;
      product.brand = req.fields.brand || product.brand;
      product.quantity = req.fields.quantity || product.quantity;
      product.category = req.fields.category || product.category;
      const updatedProduct = await product.save();
      res.status(200);
      res.json({ updatedProduct });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
const deleteProduct = asyncHandler(async(req, res) => {
    const {productId} = req.params
    try{
        const deleteProduct = await Product.findByIdAndDelete(productId)
        res.json(deleteProduct)
    }
    catch(error){
        console.error(error)
        res.status(500).json({ error: "Server error" });
    }
})
export { createProduct, updateProduct, deleteProduct };
