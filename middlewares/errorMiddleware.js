const errorResponse=require("../utils/errorResponse.js");

const errorHandler=(err,req,res,next)=>{


    let error={...err};

    error.message=err.message;

    //mongoose cast error
    //invalid mongodb objectid
    if(error.name==='CastError')
    {
        const message='Resource not found';
        error=new errorResponse(message,404);
    }

    //duplicate key error
    //same email already exist
    if(error.code===11000)
    {
        const message="Duplicate field value entered"
        error=new errorResponse(message,400);
    }

    //mongoose validation
    //schema validation error e.g- password too short ,email missing
    if(error.name==='ValidationError')
    {
        const message=Object.values(err.errors).map(     //array milti h isiliye
            val=>val.message
        );

        error=new errorResponse(message,400);
    }

    res.status(error.statusCode || 500).json({success:false ,
    error : error.message || "Server error"});
};

module.exports=errorHandler;

