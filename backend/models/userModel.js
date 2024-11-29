const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[false,'Please enter your name']
    },
    email:{
        type:String,
        required:[false,'Please enter your Email Id'],
        unique:true,
        validate:[validator.isEmail,'Please enter valid Email']
    },
    password:{
        type:String,
        required:[false,"Please enter your password"],
        select:false
    },
    avatar:{
        type:String,
        required:false
    },
    role:{
        type:String,
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    additems:[
        {
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
            },
            stock:{
                type:Number
            },
            orderedStock:{
                type:Number,
                default:0
            }
        }
    ],
    Shippinginfo:[
        {
            address:{
                type:String
            },
            city:{
                type:String
            },
            phoneNumber:{
                type:Number
            },
            postal:{
                type:Number
            },
            country:{
                type:String
            },
            state:{
                type:String
            }

        }
    ]
})
userSchema.pre('save',async function(next){
    this.password=await bcrypt.hash(this.password,10)
})

userSchema.methods.getJwTToken=function(){
    return jwt.sign({id:this.id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    })
    
    
}
userSchema.methods.isValidPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
module.exports=mongoose.model('user',userSchema)