const app=require('./app')

const dotenv=require('dotenv')
const path=require('path')
const connectDatabase=require('./config/database.js')

dotenv.config({path:path.join(__dirname,'./config/config.env')})
connectDatabase()

const server=app.listen(process.env.PORT,'0.0.0.0',()=>{
    console.log(`Server is connect on this port ${process.env.PORT} in ${process.env.NODE_ENV}`)
})

process.on('unhandledRejection',(err,reason)=>{
    console.log(`Error:${err.message}`)
    console.log(`Shutting down the server due to unhadled rejectionn error`)
    console.log('Unhandled Rejection',reason)
    server.close(()=>{
        process.exit(1)
    })
})


process.on('uncaughtException',(err)=>{
    console.log(`Error:${err.message}`)
    console.log(`Shutting down the server due to uncaught Exception error`)
    server.close(()=>{
        process.exit(1)
    })
})