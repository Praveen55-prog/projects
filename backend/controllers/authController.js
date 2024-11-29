const { trusted } = require('mongoose')
const User=require('../models/userModel')
const ErrorHandler = require('../utils/errorHandler')
const sendToken = require('../utils/jwt')
const catchAsynError = require('../middleware/catchAsynError')

exports.registerUser=catchAsynError(async(req,res,next)=>{ 
    const name=req.body.name
    const email=req.body.email
    const password=req.body.password
    if(!name || !email || !password){
        return next(new ErrorHandler("Please enter Name,Email and Password",401))
    }
    const user=await User.create(req.body)
    
    sendToken(user,200,res)
})
exports.loginUser=catchAsynError( async(req,res,next)=>{
    const {email,password}=req.body
    if(!email || !password){
        return next(new ErrorHandler("Please enter Email and Password",401))
    }
    const user=await User.findOne({email}).select('+password')
    if(!user){
        return next(new ErrorHandler("Inavlid Email or Password",401))
    }
    if(!await user.isValidPassword(password)){
        return next(new ErrorHandler("Inavlid Email or Password",401)) 
    }
    
    sendToken(user,200,res)
})
exports.logout=async(req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    }).status(200).json({
        message:"Successfully logout"
    })
}

exports.getUserProfile=async(req,res,next)=>{
        const user=await User.findById(req.user?.id)
        sendToken(user,200,res)
}

exports.changePassword=async(req,res,next)=>{
    const oldpassword=req.body.oldpassword
    const newpassword=req.body.newpassword
    const user=await User.findById(req.user.id).select(`+password`)
    if(!user.isValidPassword(oldpassword)){
        return next(new ErrorHandler("Please enter correct Password to change to new Password"),401)
    }
    user.password=newpassword
    await user.save()
    sendToken(user,200,res)
}
exports.updateProfile=async(req,res,next)=>{
    const user=await User.findByIdAndUpdate(req.user.id,req.body,{
        new:true,
        runValidators:true
    })
    sendToken(user,200,res)
}
exports.getUser=async(req,res,next)=>{
    const user=await User.findById(req.params.id)
    if (!user){
        return next(new ErrorHandler("No user available for this ID"),404)
    }
    sendToken(user,200,res)
}

exports.addItems=async(req,res,next)=>{
    const {description,price,image,stock,orderedStock}=req.body
    const user=await User.findByIdAndUpdate(req.user.id,
        {$push:{additems:{
            description,price,image,stock,orderedStock
        }}},
        {new:true}

)
    res.status(200).json({
        success:true,
        message:"items added ok",
        user
    })
}
exports.deleteItems=async(req,res,next)=>{
    const {description}=req.body
    try {
        const user=await User.findByIdAndUpdate(req.user.id,
            {$pull:{additems:{
                description:description
            }}},
            {new:true}
    
    )
    res.status(200).json({
        success:true,
        message:"items deleted ok",
        user
    })
    console.log(ok)
        
    } catch (error) {
        res.status(500).send("errorsdl")
        
    }
 
}

exports.updateOrdered=async(req,res,next)=>{
    const user=await User.findByIdAndUpdate(req.user.id,req.body,{
        new:true,
        runValidators:true
    })
    sendToken(user,200,res)
}

exports.addAddress=async(req,res,next)=>{
    const {address,city,phoneNumber,postal,country,state}=req.body
    const user=await User.findByIdAndUpdate(req.user.id,
        {$push:{Shippinginfo:{
            address,city,phoneNumber,postal,country,state
        }}},
        {new:true})

        res.status(200).json({
            success:true,
            message:"Address Added",
            user
        })
}


exports.changeuserrole=catchAsynError(async(req,res,next)=>{
    

    const user=await User.findByIdAndUpdate(req.user.id,req.body,{
        new:true,
        runValidators:true
    })

    sendToken(user,200,res)
})

exports.getalluser=catchAsynError(async(req,res,next)=>{
    const users=await User.find()
    res.status(200).json({
        status:true,
        message:"Total users",
        users
    })
})

