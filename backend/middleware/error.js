module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500
    if (process.env.NODE_ENV=='development'){
        res.status(err.statusCode).json({
            status:false,
            message:err.message,
            stack:err.stack
        })
    }
    if (process.env.NODE_ENV=='production'){
        let message=err.message;
        let error=new Error(message)
        if(err.name=="ValidationError"){
            message=Object.values(err.errors).map(value=>value.message)
            error=new Error(message)
        }

        if(err.name=='CastError'){
            message=`Resource Not found  ${err.path}`
            error=new Error(message)
        }
        res.status(err.statusCode).json({
            status:false,
            message:err.message || 'Internal Server Error'
        
        })
    }
    
}