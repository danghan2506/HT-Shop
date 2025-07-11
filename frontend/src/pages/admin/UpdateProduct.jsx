import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router'
import {useGetProductByIdQuery, useUpdateProductMutation, useDeleteProductMutation, useUploadProductImageMutation } from '../../redux/api/product-api-slice'
import { useGetAllCategoriesQuery } from '../../redux/api/category-api-slice'
import {toast} from "sonner"
const UpdateProduct = () => {
  const params = useParams()
  const navigate = useNavigate();
  const {data: productData} = useGetProductByIdQuery(params._id)
   const [name, setName] = useState(productData?.name || "");
    const [price, setPrice] = useState(productData?.price || "");
    const [description, setDescription] = useState(productData?.description || "");
    const [category, setCategory] = useState(productData?.category || "");
    const [brand, setBrand] = useState(productData?.brand || "");
    const [image, setImage] = useState(productData?.image || "")
    const [stock, setStock] = useState(productData?.stock || "");
    const [quantity, setQuantity] = useState(productData?.quantity || "")
    const [updateProduct] = useUpdateProductMutation()
    const [uploadProductImage] = useUploadProductImageMutation();
    const [deleteProduct] = useDeleteProductMutation()
    const { data: categories = []} = useGetAllCategoriesQuery();
    useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
      setStock(productData.stock);
    }
  }, [productData]);
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Item added successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      setImage(res.image);
    } catch (err) {
      toast.success("Item added successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      console.error(err)
    }
  };
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);
      const data = await updateProduct({ productId: params._id, formData });
      if (data?.error) {
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } else {
        toast.success(`Product successfully updated`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      console.log(err);
      toast.error("Product update failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  }
  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;

      const { data } = await deleteProduct(params._id);
      toast.success(`"${data.name}" is deleted`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      navigate("/admin/allproductslist");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };
  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        {/* <AdminMenu /> */}
        <div className="md:w-3/4 p-3">
          <div className="h-12 text-xl font-bold mb-4">Update Product</div>
          {image && (
            <div className="text-center mb-4">
              <img
                src={image.startsWith('http') ? image : `http://localhost:5000${image}`}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer flex flex-col items-center justify-center">
              <label htmlFor="image-upload" className="cursor-pointer text-black font-medium hover:text-gray-700 mb-2 flex-col items-center.">
                {image ? (image.name || image) : "Click to upload image"}
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
              />
              <p className="text-sm text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
            </div>
            <div className="p-3">
              <div className="flex flex-wrap gap-6 mb-4">
                <div className="flex-1 min-w-[220px]">
                  <label htmlFor="name" className="py-2">Name</label>
                  <input
                    type="text"
                    className="p-4 mb-3 w-full border rounded-lg"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div className="flex-1 min-w-[220px]">
                  <label htmlFor="price" className="py-2">Price</label>
                  <input
                    type="number"
                    className="p-4 mb-3 w-full border rounded-lg"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-6 mb-4">
                <div className="flex-1 min-w-[220px]">
                  <label htmlFor="quantity" className="py-2">Quantity</label>
                  <input
                    type="number"
                    className="p-4 mb-3 w-full border rounded-lg"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                  />
                </div>
                <div className="flex-1 min-w-[220px]">
                  <label htmlFor="brand" className="py-2">Brand</label>
                  <input
                    type="text"
                    className="p-4 mb-3 w-full border rounded-lg"
                    value={brand}
                    onChange={e => setBrand(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-6 mb-4">
                <div className="flex-1 min-w-[220px]">
                  <label htmlFor="stock" className="py-2">Count In Stock</label>
                  <input
                    type="text"
                    className="p-4 mb-3 w-full border rounded-lg"
                    value={stock}
                    onChange={e => setStock(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="py-2">Category</label>
                <select
                  className="p-4 mb-3 w-full border rounded-lg"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                >
                  <option value="">Select category</option>
                  {categories?.listCategory?.map(c => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="py-2">Description</label>
                <textarea
                  className="p-2 mb-3 border rounded-lg w-full"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="flex gap-4">
                <button type="submit" className="py-4 px-10 rounded-md text-md font-light bg-blue-600 text-white hover:bg-blue-700">Update</button>
                <button type="button" onClick={handleDelete} className="py-4 px-10 rounded-md text-md font-light bg-red-600 text-white hover:bg-red-700">Delete</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateProduct