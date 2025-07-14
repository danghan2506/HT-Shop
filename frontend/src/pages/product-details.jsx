import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../redux/api/product-api-slice';
import Loading from '../components/loader';
import moment from 'moment';
import FavouriteButton from '../components/fav-button';
import { StoreIcon, Clock, Star, ShoppingCartIcon, Box } from 'lucide-react';
import Ratings from '../components/ratings';
import { Button } from '../components/ui/button';
import ProductTabs from '../components/product-tabs';
const ProductDetails = () => {
  const { id: productId } = useParams();
  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('')
  // Handler for add to cart (placeholder)
  const addToCartHandler = () => {
    // TODO: Implement add to cart logic
    toast.success('Added to cart!');
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen text-neutral-500 px-8 py-6">
      <div>
        <Link to='/' className='text-blue-400 hover:underline font-medium mb-6 inline-block'>Go Back</Link>
      </div>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <div className="text-red-500">Error loading product.</div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10 items-start justify-center w-full max-w-6xl mx-auto mt-6">
          <div className="flex-1 flex items-center justify-center relative">
            <img
              src={product.image}
              alt={product.name}
              className="rounded-xl shadow-lg w-full max-w-2xl object-cover aspect-video"
            />
            <div className="absolute top-8 right-8">
              <FavouriteButton product={product} />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-2 max-w-xl">
            <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
            <p className="mb-6 text-gray-300 text-base leading-relaxed">{product.description}</p>
            <p className="text-5xl font-extrabold text-white mb-8">$ {product.price}</p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
              <div className="flex items-center">
                <StoreIcon className="mr-2 text-white" />
                <span className="font-medium">Brand:</span>
                <span className="ml-2">{product.brand}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 text-white" />
                <span className="font-medium">Added:</span>
                <span className="ml-2">{moment(product.createdAt).fromNow()}</span>
              </div>
              <div className="flex items-center">
                <Star className="mr-2 text-white" />
                <span className="font-medium">Reviews:</span>
                <span className="ml-2">{product.reviewCount}</span>
              </div>
              <div className="flex items-center">
                <Star className="mr-2 text-white" />
                <span className="font-medium">Ratings:</span>
                <span className="ml-2">{product.rating || 0}</span>
              </div>
              <div className="flex items-center">
                <ShoppingCartIcon className="mr-2 text-white" />
                <span className="font-medium">Quantity:</span>
                <span className="ml-2">{product.quantity}</span>
              </div>
              <div className="flex items-center">
                <Box className="mr-2 text-white" />
                <span className="font-medium">In Stock:</span>
                <span className="ml-2">{product.stock}</span>
              </div>
            </div>
            <div className='flex justify-between flex-wrap'>
              <Ratings value={product.rating} text={`${product.reviewCount} reviews`} />
            </div>
            {product.stock > 0 && (
              <div>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="p-2 w-[6rem] rounded-lg text-black"
                >
                  {[...Array(product.stock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="btn-container mt-4">
              <Button
                onClick={addToCartHandler}
                disabled={product.stock === 0}
                className="bg-pink-600 text-white py-2 px-4 rounded-lg"
              >
                Add To Cart
              </Button>
            </div>
             <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails