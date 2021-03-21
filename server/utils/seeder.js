import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { users } from '../data/users.js'
import { products } from '../data/products.js'
import { User } from '../models/userModel.js'
import { Product } from '../models/productModel.js'
import { Order } from '../models/orderModel.js'
import { connectToDatabase } from '../config/database.js'

dotenv.config()

connectToDatabase()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id
    const sampleProducts = products.map(product => ({ ...product, user: adminUser }))

    await Product.insertMany(sampleProducts)

    console.log('Data imported!'.green.underline.bold)
    process.exit()
  } catch (error) {
    console.error(error.red.underline.bold)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data destroyed!'.white.underline.bold.bgRed)
    process.exit()
  } catch (error) {
    console.error(error.red.underline.bold)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
