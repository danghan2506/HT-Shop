import asyncHandler from "../middlewares/async-handler.js";
import Order from "../models/order-model.js";
import Product from "../models/product-model.js"
import calculatePrice from "../utils/price-calculate.js";
const createOrder = asyncHandler(async(req, res) => {
    try {
        const {orderItems, shippingAddress, paymentMethod} = req.body
        // Lay thong tin san pham tu db
        const itemsFromDatabase = await Product.find({_id: {$in: orderItems.map((x) => x._id)}})
        const databaseOrderItems = orderItems.map((itemFromClient) => {
            const matchingItemFromDatabase = itemsFromDatabase.find((itemFromDatabase) => itemFromDatabase._id.toString() === itemFromClient)
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
            shippingMethod,
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
