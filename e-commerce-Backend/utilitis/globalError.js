export class AppError extends Error{
    constructor(message, statusCode){
        super(message);
        this.message = message;
        this.statusCode = statusCode
        }
}

export function asyncHandler(fn){
    return(req,res,next)=>{
        fn(req,res,next).catch((err)=>{
            next(err)
        })
    }
}

export const globalErrorHandle = (err,req,res,next)=>{
    const statusCode = err.statusCode || 500; // Ensure statusCode always has a value

    if (process.env.MODE == 'dev') { // Or process.env.MODE === 'dev'
        res.status(statusCode).json({err: err.message, stack:err.stack});
    } else {
        res.status(500).json({err: err.message});
    }
};
