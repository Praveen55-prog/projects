const express=require('express')
const app=express()
const path=require('path')
const product=require('./routers/productRouter')
const user=require('./routers/userRouter')
const order=require('./routers/orderRouter')
const items=require('./routers/itemsRouter')
const cookieParser=require('cookie-parser')
const errorMiddleware=require('./middleware/error')
const cors=require('cors')





app.use(express.json())
app.use(cookieParser())
app.use('/praveen',product)
app.use('/praveen',user)
app.use('/praveen',order)
app.use('/praveen',items)

if(process.env.Node_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../fontend/build")))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'../fontend/build/index.html'))
    })
    app.get('/', (req, res) => {
        res.send('Server is working!');
    });
    
}

app.use(errorMiddleware)
module.exports=app