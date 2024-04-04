const notFound = ((req, res , next)=>{

        const error = new Error(`Not Found - ${req.originalUrl}`); 
        error.status = 404;
        next(error); 

}); 



const errorHandler = ((err, req, res, next) => {
    if(res.headerSent){
        return next(err); 
    }
    res.status(err.code || 500).json({message : err.message || "An unkown error occure"}); 
}); 

module.exports = {notFound , errorHandler}; 