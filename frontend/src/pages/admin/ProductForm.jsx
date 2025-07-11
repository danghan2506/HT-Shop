import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/product-api-slice";
import { useGetAllCategoriesQuery } from "../../redux/api/category-api-slice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Package } from "lucide-react";
import { toast } from "sonner";
import AdminMenu from "../../components/admin-menu";
const ProductForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [quantity, setQuantity] = useState("")
  const navigate = useNavigate();
  const [createProduct] = useCreateProductMutation();
  const [uploadProductImage] = useUploadProductImageMutation();
  const { data} = useGetAllCategoriesQuery();
  const categories = data?.listCategory || []
 const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
      console.log(res.image)
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    } };
  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const productData = new FormData()
      productData.append("name", name)
      productData.append("image", image)
      productData.append("description", description)
      productData.append("price", price)
      productData.append("category", category)
      productData.append("brand", brand)
      productData.append("stock", stock)
      productData.append("quantity", quantity)
      const { data } = await createProduct(productData);
      if (data.error) {
        console.log(data.error)
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    }
    catch(error){
      console.error(error);
      toast.error(error?.data?.message || error?.message || "Product create failed. Try Again.");
    }
  }

  return (
      <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12">Create Product</div>
          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />+
              
            </div>
          )}

          <div className="mb-3 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer flex flex-col items-center justify-center">
            <Upload className="w-8 h-8 text-gray-400 mb-3" />
            <div className="flex flex-col items-center w-full">
              <Label
                htmlFor="image-upload"
                className="cursor-pointer text-black font-medium hover:text-gray-700 mb-2 flex-col items-center."
              >
                {image ? (image.name || image) : "Click to upload image"}
              </Label>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
              />
              <p className="text-sm text-gray-500 mt-2">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>

          <div className="p-3">
  <div className="flex flex-wrap gap-6 mb-4">
    <div className="flex-1 min-w-[220px]">
      <Label htmlFor="name" className="py-2">Name</Label>
      <Input
        type="text"
        className="p-4 mb-3 w-full border rounded-lg"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
    <div className="flex-1 min-w-[220px]">
      <Label htmlFor="price" className="py-2">Price</Label>
      <Input
        type="number"
        className="p-4 mb-3 w-full border rounded-lg"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
    </div>
  </div>
  <div className="flex flex-wrap gap-6 mb-4">
    <div className="flex-1 min-w-[220px]">
      <Label htmlFor="quantity" className="py-2">Quantity</Label>
      <Input
        type="number"
        className="p-4 mb-3 w-full border rounded-lg"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
    </div>
    <div className="flex-1 min-w-[220px]">
      <Label htmlFor="brand" className="py-2">Brand</Label>
      <Input
        type="text"
        className="p-4 mb-3 w-full border rounded-lg"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />
    </div>
  </div>
  <div className="flex flex-wrap gap-6 mb-4">
    <div className="flex-1 min-w-[220px]">
      <Label htmlFor="stock" className="py-2">Count In Stock</Label>
      <Input
        type="text"
        className="p-4 mb-3 w-full border rounded-lg"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
    </div>
  </div>
  <div className="mb-4">
    <Label htmlFor="category" className="py-2">Category</Label>
    <select
      placeholder="Choose Category"
      className="p-4 mb-3 w-full border rounded-lg"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value="" disabled selected>Choose Category</option>
      {categories?.map((c) => (
        <option key={c._id} value={c._id}>
          {c.name}
        </option>
      ))}
    </select>
  </div>
  <div className="mb-4">
    <Label htmlFor="description" className="py-2">Description</Label>
    <textarea
      className="p-2 mb-3 border rounded-lg w-full"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    ></textarea>
  </div>
  <button
    onClick={handleSubmit}
    className="py-4 px-10 mt-5 rounded-md text-md font-light bg-slate-700 cursor-pointer flex-col items-center."
  >
    Submit
  </button>
</div>
        </div>
      </div>
    </div>
  )
};
export default ProductForm

