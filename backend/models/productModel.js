const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter product name"],
        trim:true,
        maxLength:[500,"Product name cannot exceed more than 500"]
    },
    price:{
        type:String,
        default:0
    },
    description:{
        type:String,
        required:[true,"Please enter product description"]
    },
    ratings:{
        type:Number,
        default:0
    },
    
        image:{
            type:String,
            required:true
        },
    
    category:{
        type:String,
        required:[true,"please enter product category"],
        enum:{
            values:[
                "Electronics",
                'Mobile Phones',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message:"Please select correct Category"
        }

    },
    seller:{
        type:String,
        required:[true,'please enter seller name']
    },
    stock:{
        type:Number
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.Types.ObjectId
    }
})

module.exports=mongoose.model('product',productSchema)