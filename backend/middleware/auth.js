const jwt = require("jsonwebtoken")
const ErrorHandler = require("../utils/errorHandler")
const User=require('../models/userModel')

exports.isAuthenticatedUser=async(req,res,next)=>{
    const {token}=req.cookies
    
    if(!token){
        console.log("yes no token")
        return next(new ErrorHandler("Please Login first"),404)
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    if(!decoded){
    console.log("yes no decoded")
    return next(new ErrorHandler("id not found"),404)
    }
    req.user=await User.findById(decoded.id)
    next()
}
exports.authorizesroles=(...roles)=>{
    return async(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler("You are not Eligible for This Resource"),401)
        }
        next()
    }
}