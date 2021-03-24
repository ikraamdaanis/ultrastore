import asyncHandler from 'express-async-handler'
import { Product } from '../models/productModel.js'

// @desc Fetch all products
// @route GET api/products
// @access Public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// @desc Fetch single product
// @route GET api/products/:id
// @access Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc Create product
// @route POST api/products
// @access Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    description: 'Sample description',
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc Update product
// @route PUT api/products/:id
// @access Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body
  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name ?? product.name
    product.price = price ?? product.price
    product.description = description ?? product.description
    product.image = image ?? product.image
    product.brand = brand ?? product.brand
    product.category = category ?? product.category
    product.countInStock = countInStock ?? product.countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc Delete product
// @route DELETE api/products/:id
// @access Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})
