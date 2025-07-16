import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../redux/api/product-api-slice';
import Loading from '../components/loader';
import moment from 'moment';
import FavouriteButton from '../components/fav-button';
import { StoreIcon, Clock, Star, ShoppingCart, Box, ArrowLeft, Store, Package, Minus, Plus} from 'lucide-react';
import Ratings from '../components/ratings.jsx'
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
  // Adjust quantity handler
  const adjustQuantity = (action) => {
    setQuantity((prev) => {
      if (action === 'decrease') {
        return prev > 1 ? prev - 1 : prev;
      }
      if (action === 'increase') {
        return prev < product.stock ? prev + 1 : prev;
      }
      return prev;
    });
  };
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }
  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-lg">Error loading product.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-w-1 aspect-h-1 rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-4 right-4">
                <FavouriteButton product={product} />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-gray-600">{product.price} VNĐ</span>
                <div className="flex items-center">
                  <Ratings value={product.rating} text={`${product.reviewCount} reviews`} />
                </div>
              </div>

              {/* Product Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-t border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <Store className="w-5 h-5 text-gray-400" />
                  <div>
                    <span className="text-sm text-gray-500">Brand</span>
                    <p className="font-medium text-gray-900">{product.brand}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <span className="text-sm text-gray-500">Added</span>
                    <p className="font-medium text-gray-900">{moment(product.createdAt).fromNow()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-gray-400" />
                  <div>
                    <span className="text-sm text-gray-500">Rating</span>
                    <p className="font-medium text-yellow">{product.rating || 0}/5</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-gray-400" />
                  <div>
                    <span className="text-sm text-gray-500">Stock</span>
                    <p className="font-medium text-gray-900">
                      {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              {product.stock > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700">Quantity:</span>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => adjustQuantity('decrease')}
                        className="p-2 hover:bg-gray-100 transition-colors"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 font-medium">{quantity}</span>
                      <button
                        onClick={() => adjustQuantity('increase')}
                        className="p-2 hover:bg-gray-100 transition-colors"
                        disabled={quantity >= product.stock}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <Button
                    onClick={addToCartHandler}
                    disabled={product.stock === 0}
                    className="w-full sm:w-auto flex items-center justify-center gap-2"
                    size="lg"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </Button>
                </div>
              )}

              {product.stock === 0 && (
                <div className="text-center py-4">
                  <p className="text-red-600 font-medium">This product is currently out of stock</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-12">
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
  );
}

export default ProductDetails