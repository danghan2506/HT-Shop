import React, {useState} from 'react'
import Loading from './loader';
import {Link} from 'react-router-dom'
import { useGetTopProductsQuery, useGetRelatedProductsQuery } from '../redux/api/product-api-slice';
import { MessageSquare, Users, Package } from 'lucide-react';
import Ratings from './ratings';
const ProductTabs = ({loadingProductReview,userInfo,submitHandler,rating,setRating,comment,setComment,product}) => {
  const { data, isLoading } = useGetRelatedProductsQuery({
    categoryId: product.category,
    productId: product._id
  });
  const [activeTab, setActiveTab] = useState(1);
  if (isLoading) {
    return <Loading />;
  }
   const tabs = [
    { id: 1, label: 'Write Review', icon: MessageSquare },
    { id: 2, label: 'All Reviews', icon: Users },
    { id: 3, label: 'Related Products', icon: Package },
  ];
  return (
     <div className="w-full max-w-6xl mx-auto">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {/* Write Review Tab */}
        {activeTab === 1 && (
          <div className="max-w-2xl">
            {userInfo ? (
              <form onSubmit={submitHandler} className="space-y-6">
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a rating</option>
                    <option value="1">⭐ Poor</option>
                    <option value="2">⭐⭐ Fair</option>
                    <option value="3">⭐⭐⭐ Good</option>
                    <option value="4">⭐⭐⭐⭐ Very Good</option>
                    <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                    Review
                  </label>
                  <textarea
                    id="comment"
                    rows={4}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience with this product..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loadingProductReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            ) : (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">You need to be signed in to write a review</p>
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        )}

        {/* All Reviews Tab */}
        {activeTab === 2 && (
          <div>
            {product.reviews.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{review.name}</h4>
                        <p className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Ratings value={review.rating} />
                    </div>
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Related Products Tab */}
        {activeTab === 3 && (
          <div>
            {!data ? (
              <Loading />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((relatedProduct) => (
                  <div key={relatedProduct._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-2">{relatedProduct.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{relatedProduct.brand}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">${relatedProduct.price}</span>
                        <Ratings value={relatedProduct.rating} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

}

export default ProductTabs