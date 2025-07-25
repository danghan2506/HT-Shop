import asyncHandler from "../middlewares/async-handler.js";
import {Order} from "../models/order-model.js"
import {Product} from "../models/product-model.js"
import calculatePrice from "../utils/price-calculate.js";
const createOrder = asyncHandler(async(req, res) => {
    try {
        const {orderItems, shippingAddress, paymentMethod} = req.body
        // Lay thong tin san pham tu db
        const itemsFromDatabase = await Product.find({_id: {$in: orderItems.map((x) => x._id)}})
        const databaseOrderItems = orderItems.map((itemFromClient) => {
            const matchingItemFromDatabase = itemsFromDatabase.find((itemFromDatabase) => itemFromDatabase._id.toString() === itemFromClient._id)
            if(!matchingItemFromDatabase){
                res.status(404)
                throw new Error(`Product not found: ${itemFromClient._id}`)
            }
            return {
                ...itemFromClient,
                product: itemFromClient._id,
                price: matchingItemFromDatabase.price,
                _id: undefined
            }
        })
        const {itemsPrice, taxPrice, shippingPrice, totalPrice} = calculatePrice(databaseOrderItems)
        const order = new Order({
            orderItems: databaseOrderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)

    } catch (error) {
        console.error(error)
        res.status(500).json("Server error!")
    }
})
const getAllOrders = asyncHandler(async(req, res) => {
    try {
        const orders = await Order.find({}).populate("user", "id username")
        res.json(orders)
    } catch (error) {
        console.error(error)
        res.status(500).json("Server error!")
    }
})
const getUserOrders = asyncHandler(async(req, res) => {
    try {
        const orders = await Order.find({user: req.user._id})
        if(!orders){
            res.status(404).json("No order found!")
        }
        else{
            res.json(orders)
        }
    } catch (error) {
        console.error(error)
        res.status(500).json("Server error!")
    }
})
const countTotalOrders = asyncHandler(async(req, res) => {
    try {
        const totalOrders = await Order.countDocuments()
        res.json(totalOrders)
    } catch (error) {
        console.error(error)
        res.status(500).json("Server error!")
    }

})
const calculateTotalSales = asyncHandler(async(req, res) => {
    try {
        const orders = await Order.find()
        const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0)
        res.json(totalSales)
    } catch (error) {
        console.error(error)
        res.status(500).json("Server error!")
    }
})
const getOrderById = asyncHandler(async(req, res) => {
    try {
        const {orderId} = req.params
        const orders = await Order.findById(orderId).populate("user", "username email")
        if(!orders){
            res.status(404).json("No order found!")
        }
        else{
            res.json(orders)
        }
    } catch (error) {
        console.error(error)
        res.status(500).json("Server error!")
    }
})
const calcualteTotalSalesByDate = async (req, res) => {
  try {
    const salesByDate = await Order.aggregate([
      {
        $match: {
          isPaid: true,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$paidAt" },
          },
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);
    res.json(salesByDate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const markOrderAsPaid = asyncHandler(async(req, res) => {
    const {orderId} = req.params
    try {
        const order = await Order.findById(orderId)
        if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };
    const updateOrder = await order.save()
    console.log(updateOrder)
    res.status(201).json(updateOrder)
    }
    else{
        res.status(404);
        throw new Error("Order not found");
    }
    } catch (error) {
        console.error(error)
        res.status(500).json("Server error!")
    }
})
const markOrderAsDelivered = asyncHandler(async(req, res) => {
    try {
        const {orderId} = req.params
        const order = await Order.findById(orderId)
        if(!order){
            res.status(404).json("An error occured")
        }
        else{
            order.isDelivered = true
            order.deliveredAt = Date.now()
        }
        const updateOrder = await order.save()
        res.status(201).json(updateOrder)
    } catch (error) {
        console.error(error)
        res.status(500).json("Server error!")
    }
})
export {createOrder, getAllOrders, getUserOrders, countTotalOrders, calculateTotalSales, getOrderById, markOrderAsPaid, markOrderAsDelivered, calcualteTotalSalesByDate}