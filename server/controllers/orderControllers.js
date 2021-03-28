import asyncHandler from 'express-async-handler'
import { Order } from '../models/orderModel.js'

// @desc Create new order
// @route GET api/orders
// @access Private
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    paymentResult,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid,
      paidAt,
      paymentResult,
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
})

// @desc Get order by ID
// @route GET api/orders/:id
// @access Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')

  if (order && (req.user.isAdmin || order.user._id.equals(req.user._id))) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc Update order to delivered
// @route GET api/orders/:id/deliver
// @access Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order && (req.user.isAdmin || order.user._id.equals(req.user._id))) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc Get logged in user's orders
// @route GET api/orders/myorders
// @access Private
export const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

// @desc Get all orders
// @route GET api/orders
// @access Private/Admin
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})
