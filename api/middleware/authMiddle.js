const jwt = require('jsonwebtoken'); 
const HttpError = require('../models/errorModel'); 
require('dotenv').config(); 



module.exports.auth = async (req , res , next)=>{
    const Auth = req.headers.Authorization || req.headers.authrization ; 

    if(!Auth && Auth.startsWith("Bearer")){
        const token = Auth.split(' ')[1]; 
        jwt.verify(token , process.env.JWT , (err , decoded)=>{
            if (err){
                return next(new HttpError('Invalid Token.' , 403)); 


                req.user = decoded ; 
                next(); 
            }
        }); 
    }
    else{
        return next(new HttpError('Invalid token or not exist' , 402)); 
    }
}