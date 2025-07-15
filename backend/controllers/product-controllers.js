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
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ error: "Product already exists!" });
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
const deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  try {
    const deleteProduct = await Product.findByIdAndDelete(productId);
    res.json(deleteProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? {name: {$regex: req.query.keyword,$options: "i"}}
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});
const fetchProductById = asyncHandler(async(req, res) => {
  try {
    const {productId} = req.params
    const product = await Product.findById(productId)
    if(!product){
      res.status(404).json("Product not found!")
    }
    res.json(product)
  } catch (error) {
    console.error(error)
    res.status(500).json({error})
  }
})
const fetchAllProducts = asyncHandler(async(req, res) => {
  try {
    // populate("category"): là field name, k phải schema
     const products = await Product.find({}).populate("category").limit(12).sort({createAt: -1})
     res.json(products)
  } catch (error) {
    console.error(error)
    res.status(500).json("Server error!")
  } 
})

const fetchTopProducts = asyncHandler(async(req, res) => {
  try {
    const topProducts = await Product.find({}).sort({rating: -1}).limit(4)
    res.json(topProducts)
  } catch (error) {
     console.error(error)
    res.status(500).json("Server error!")
  }
})
const fetchRelatedProducts = asyncHandler(async (req, res) => {
  const { categoryId, productId } = req.params;
  try {
    // Exclude the current product from the results
    const relatedProducts = await Product.find({
      category: categoryId,
      _id: { $ne: productId },
    })
      .limit(4);
    res.json(relatedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error!");
  }
});
const addProductReviews = asyncHandler(async (req, res) => {
  const {productId} = req.params
  try {
    const {rating, comment} = req.body
    const product = await Product.findById(productId)
    if(product){
      const alreadyReviewed = product.reviews.find((review) => review.user.toString() === req.user._id.toString())
      if(alreadyReviewed){
        res.status(400)
        throw new Error("Product already reviewed")
    }
    const review = {
      name: req.user.username,
      rating: Number(rating),
      comment,
      user:req.user._id,
    }
    product.reviews.push(review)
    product.reviewCount = product.reviews.length
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
    await product.save()
    res.status(201).json({message: "Review added"})  
  }
  else{
    res.status(404)
    throw new Error("Product not found!")
  }
  } catch (error) {
    console.error(error)
    res.status(500).json("Server error!")
  }
})
const fetchNewProducts = asyncHandler(async(req, res) => {
  try {
    const products = await Product.find({}).sort({createdAt: -1}).limit(12)
  res.json(products)
  } catch (error) {
     console.error(error)
    res.status(500).json("Server error!")
  }
})

export { createProduct, updateProduct, deleteProduct, fetchProducts, fetchProductById, fetchAllProducts, fetchTopProducts, addProductReviews, fetchNewProducts, fetchRelatedProducts};
