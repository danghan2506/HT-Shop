import React from 'react'
import { addToCart, removeFromCart } from '../redux/features/cart/cart-slice'
import {Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { ArrowLeft, Minus, Plus, Trash2} from 'lucide-react'
import { Button } from '../components/ui/button'
const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const {cartItems} = cart
  const addToCartHandler = (product, quantity) => {
    dispatch(addToCart({...product, quantity}))
  }
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
    const updateQuantity = (item, action) => {
    const newQuantity = action === 'increase' 
      ? Math.min(item.quantity + 1, item.stock)
      : Math.max(item.quantity - 1, 1);
    
    addToCartHandler(item, newQuantity);
  };
  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  }
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
  return (
      <div className="min-h-screen bg-white-50">
  <div className="px-4 py-6 md:px-6 lg:px-8">
    <div className="max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link 
          to="/shop" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Continue Shopping
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Shopping Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-12 md:py-16">
          <ShoppingBag className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Link to="/shop">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items - Left side */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0 mx-auto sm:mx-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <Link 
                      to={`/product/${item._id}`} 
                      className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 block"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">{item.brand}</p>
                    <p className="text-xl font-bold text-gray-900 mt-2">{item.price} VNĐ</p>
                  </div>

                  {/* Quantity Controls + Remove */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 mx-auto sm:mx-0">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item, 'decrease')}
                        className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 py-2 font-medium min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item, 'increase')}
                        className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                        disabled={item.quantity >= item.stock}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCartHandler(item._id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Stock warning */}
                {item.stock <= 5 && (
                  <div className="mt-4 text-sm text-orange-600 bg-orange-50 px-3 py-2 rounded-lg text-center sm:text-left">
                    Only {item.stock} left in stock
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Order Summary - Right side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({totalItems})</span>
                  <span>{totalPrice.toFixed(2)} VNĐ</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>{totalPrice.toFixed(2)} VNĐ</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium"
                size="lg"
              >
                Proceed to Checkout
              </Button>

              <div className="mt-4 text-center">
                <Link 
                  to="/shop" 
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
</div>
  );

}

export default Cart