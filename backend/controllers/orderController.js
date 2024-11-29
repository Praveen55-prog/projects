const Order=require('../models/orderModel')
const sendToken = require('../utils/jwt')

exports.newOrder=async(req,res,next)=>{
    const{shippingInfo,OrderItems,ItemsPrice,taxPrice,shipingPrice,totalPrice}=req.body
    const order=await Order.create({
        shippingInfo,OrderItems,ItemsPrice,taxPrice,shipingPrice,totalPrice,user:req.user.id
    })
    res.status(200).json({
        message:"ok",
        order
    })
}
exports.getAllOrder=async(req,res,next)=>{
    const orders=await Order.find()
    totalAmount=0
    orders.forEach(order=>{
        totalAmount+=order.totalPrice
    })
    res.status(200).json({
        message:"This is all orders",
        orders,
        totalAmount
    })
}