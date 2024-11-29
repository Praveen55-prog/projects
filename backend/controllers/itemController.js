const Items=require('../models/itemModel')
const ErrorHandler = require('../utils/errorHandler')



exports.cartitems=async(req,res,next)=>{
    const items=await Items.find()
    res.status(200).json({
        success:true,
        message:"items",
        items
    })
    
}
