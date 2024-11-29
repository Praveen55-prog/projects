const mongoose=require('mongoose')

const additems= mongoose.Schema({
    description:{
        type:String,
        default:''
    },
    price:{
        type:Number,
        default:0
    },
    image:{
        type:String
    }
})

module.exports=new mongoose.model('item',additems)