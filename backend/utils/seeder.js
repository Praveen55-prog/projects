const products=require('../data/products.json')
const Product=require('../models/productModel')
const dotenv=require('dotenv')
const connectDatabase=require('../config/database')

dotenv.config({path:'backend/config/config.env'})
connectDatabase()

const seedProduct=async()=>{
    try {
    await Product.deleteMany()
    console.log("product deleted")
    await Product.insertMany(products)
    console.log("Products are inserted")
        
    } catch (error) {
        console.log(error.message)
    }
    

}
seedProduct()