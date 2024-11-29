const Product=require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const ApiFeatures=require('../utils/apiFeautres')
const catchAsyncError=require('../middleware/catchAsynError')
const sendToken = require('../utils/jwt')
exports.getProducts=async (req,res,next)=>{
    
    const apiFeautres=new ApiFeatures(Product.find(),req.query).search().filter()
    const products=await apiFeautres.query
    if(!products){
    return next(new ErrorHandler("Unable to get Products",404))}

    res.status(200).json({
        status:true,
        count:products.length,
        message:'connected',
        products
    })
}

exports.allproducts=async(req,res,next)=>{
    const products=await Product.find()
    res.status(200).json({
        status:true,
        count:products.length,
        message:'connected',
        products
    })
}

exports.newProducts=  catchAsyncError(async (req,res,next)=>{
    req.body.user=req.user.id
    const product=await Product.create(req.body)
    res.status(200).json({
        status:true,
        message:"Products available",
        product
    })
})
exports.getSingleProduct=async(req,res,next)=>{
    
    let product=await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler("Product not found with this id",404))
    }
    res.status(200).json({
        status:true,
        message:"Products available",
        product
    })
}

exports.updateProduct=async(req,res,next)=>{
    let product=await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler("Product not found with this id",404))
    }
    let products=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true

    })
    res.status(200).json({
        status:true,
        message:"Products available",
        products
    })
}
exports.deleteProduct=async(req,res,next)=>{
    let product=await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler("Product not available for this id",404))
    }
        await Product.deleteOne()
    res.status(200).json({
        message:"product deleted"
    })
}

exports.getadminproducts=catchAsyncError(async(req,res,next)=>{
    const products=await Product.find()

    res.status(200).json({
        status:true,
        message:"All Products",
        products
    })

    
})