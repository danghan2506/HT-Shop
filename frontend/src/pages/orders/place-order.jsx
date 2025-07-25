import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Link, useNavigate} from "react-router-dom"
import { useCreateOrderMutation } from '../../redux/api/order-api-slice'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, ShoppingCart } from "lucide-react";
import { toast } from 'sonner';
import { clearCartItems } from '../../redux/features/cart/cart-slice';

const PlaceOrder = () => {
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [createOrder, {isLoading, error}] = useCreateOrderMutation()
    const placeOrderHandler = async (e) => {
      e.preventDefault()
        try {
          const res = await createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
          }).unwrap()
          dispatch(clearCartItems())
          navigate(`/order/${res._id}`)
        } catch (error) {
          console.log(error)
          toast.error(error)
        }
    }
    useEffect(() => {
        if(!cart.shippingAddress.address){
            navigate("/shipping")
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate])
  return (
     <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Place Order</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Cart Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-20">Image</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cart.cartItems.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        </TableCell>
                        <TableCell>
                          <Link 
                            to={`/product/${item.product}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                          >
                            {item.name}
                          </Link>
                        </TableCell>
                        <TableCell className="text-center font-medium">
                          {item.quantity}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ${item.price.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          ${(item.quantity * item.price).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary Section */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items:</span>
                    <span className="font-medium">${cart.itemsPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-medium">${cart.shippingPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax:</span>
                    <span className="font-medium">${cart.taxPrice}</span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span className="text-green-600">${cart.totalPrice}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                </p>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 font-medium">{cart.paymentMethod}</p>
              </CardContent>
            </Card>

            {/* Error Message */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>
                  {error.data?.message || "An error occurred"}
                </AlertDescription>
              </Alert>
            )}

            {/* Place Order Button */}
            <Button
              onClick={placeOrderHandler}
              disabled={cart.cartItems.length === 0 || isLoading}
              className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                "Place Order"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder